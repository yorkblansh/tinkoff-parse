import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets"
import { ParserService } from "parser/parser.service"
import { Server } from "socket.io"

@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class EventsGateway {
	constructor(private readonly parser: ParserService) {}

	@WebSocketServer()
	server: Server

	// @SubscribeMessage("events")
	// findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
	// 	return from([1, 2, 3]).pipe(
	// 		map((item) => ({ event: "events", data: item }))
	// 	)
	// }

	async sendParsedDataToClient() {}

	@SubscribeMessage("parsing")
	async identity() {
		this.parser.getData()
		// const data=
		// 		return data
	}
}
