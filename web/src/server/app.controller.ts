import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common"
import { AuthService } from "auth/auth.service"
import { JwtAuthGuard } from "auth/guards/jwt-auth.guard"
import { LocalAuthGuard } from "auth/guards/local-auth.guard"
import { ROUTES } from "../interfaces/routes.interface"

@Controller()
export class AppController {
	constructor(private readonly authService: AuthService) {}
	// constructor(private readonly appService: AppService) {}

	// @Get()
	// getHello(): string {
	// 	return this.appService.getHello()
	// }

	@Post(ROUTES.Register)
	async register(@Request() req: any) {
		return this.authService.login(req.user)
	}

	@UseGuards(LocalAuthGuard)
	@Post(ROUTES.Login)
	async login(@Request() req: any) {
		return this.authService.login(req.user)
	}

	@UseGuards(JwtAuthGuard)
	@Get(ROUTES.Board)
	getProfile(@Request() req: any) {
		return req.user
	}
}
