import { AppService } from "./app.service"
import { Controller, Get, HttpCode } from "@nestjs/common"

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@HttpCode(204)
	getHello() {
		return this.appService.getHello()
	}

	@Get("/startParse")
	startParse(): string {
		return "staticccc"
	}

	@Get("/startParse")
	stopParse(): string {
		return "staticccc"
	}
}
