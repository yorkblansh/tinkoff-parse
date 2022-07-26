import { AppService } from "./app.service"
import { Controller, Get, HttpCode } from "@nestjs/common"

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@HttpCode(204)
	getHello(): string {
		return this.appService.getHello()
	}

	@Get("/static")
	findOne(): string {
		return "staticccc"
	}
}
