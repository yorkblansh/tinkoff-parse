import { Inject, UseGuards } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import {
	ConnectedSocket,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets"
import { wsAuthGuard } from "auth/guards/ws-auth.guard"
import { ParsedData, ParserError } from "common/types/parser.types"
import { ParserService } from "parser/parser.service"
import {
	RedisClientType,
	RedisFunctions,
	RedisModules,
	RedisScripts,
} from "redis"
import { Server } from "socket.io"

@WebSocketGateway({
	cors: {
		origin: "*",
		// maxAge: 5000,
		// preflightContinue: false,
	},

	// connectTimeout: 10000,
	// destroyUpgradeTimeout: 12000,
	// pingTimeout: 2000,
	// upgradeTimeout: 1000,
})
export class EventsGateway {
	constructor(
		private readonly parser: ParserService,
		private readonly jwtService: JwtService,
		@Inject("REDIS_CLIENT") private readonly redis: RedisClientType
	) {
		this.emitParsed()
	}

	@WebSocketServer()
	server: Server

	async emitParsed() {
		const either = await this.parser.getData()

		const handleParserError = (parserError: ParserError) => {
			console.log(parserError.error)
		}

		const handleSendingToClient = async (parsedData: ParsedData) => {
			const parsing_state = (await this.redis.get("parsing_state")) as "0" | "1"

			if (parsing_state === "1") {
				this.server.to("parsing_room").emit("parse", {
					parsedData,
					...{ timstamp: new Date().getMilliseconds() },
				})
			}

			this.server.to("parsing_room").emit("parse_state", {
				state: parsing_state,
			})
		}

		setInterval(() => {
			either.mapRight(handleSendingToClient).mapLeft(handleParserError)
		}, 500)
	}

	@UseGuards(wsAuthGuard)
	@SubscribeMessage("login")
	async login() {
		this.server.socketsLeave("parsing_room")
		this.server.socketsJoin("parsing_room")
	}
}
