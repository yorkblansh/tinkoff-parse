import { UseGuards } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets"
import { Roles } from "auth/decorators/roles.decorator"
import { JwtAuthGuard } from "auth/guards/jwt-auth.guard"
import { wsAuthGuard } from "auth/guards/ws-auth.guard"
import { Events } from "common/enums/events.enum"
import { UserRole } from "common/interfaces/user.interface"
import { ParserService } from "parser/parser.service"
import { Server } from "socket.io"
import { Socket } from "socket.io-client"

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
		private readonly jwtService: JwtService
	) {}

	@WebSocketServer()
	server: Server

	// @SubscribeMessage("events")
	// findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
	// 	return from([1, 2, 3]).pipe(
	// 		map((item) => ({ event: "events", data: item }))
	// 	)
	// }
	// async sendParsedDataToClient() {}

	@UseGuards(wsAuthGuard)
	@SubscribeMessage("login")
	async login(@MessageBody() data: any) {
		// console.log(data)
		// this.jwtService.decode()
	}

	@SubscribeMessage("parsing")
	async identity(@MessageBody() data: {}, @ConnectedSocket() client: Socket) {
		const timeStamp = new Date().getSeconds().toString()
		console.log([data, timeStamp])
		const returnData = { ...data, fromServer: "yes", timeStamp }
		// client.emit(Events.PARSING, returnData)
		// setInterval(function () {
		// 	client.emit(Events.PARSING, returnData)
		// }, 2000)
		// this.parser.getData()
		// const data=
		// 		return data
	}
}
