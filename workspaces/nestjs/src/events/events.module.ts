import { Module } from "@nestjs/common"
import { ParserModule } from "parser/parser.module"
import { EventsGateway } from "./events.gateway"

@Module({
	imports: [ParserModule],
	providers: [EventsGateway],
})
export class EventsModule {}
