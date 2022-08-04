import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
} from "@nestjs/common"
import { AuthService } from "auth/auth.service"
import { Roles } from "auth/decorators/roles.decorator"
import { User } from "auth/decorators/user.decorator"
import { JwtAuthGuard } from "auth/guards/jwt-auth.guard"
import { LocalAuthGuard } from "auth/guards/local-auth.guard"
import { ROUTES } from "../interfaces/routes.interface"
import { UserModel, UserRole } from "../interfaces/user.interface"

@Controller()
export class AppController {
	constructor(private readonly authService: AuthService) {}

	@Get()
	getHello(): string {
		return "welcome to api"
	}

	@Post(ROUTES.Register)
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() user: UserModel) {
		return this.authService.registerUser(user)
	}

	@Post(ROUTES.Login)
	@UseGuards(LocalAuthGuard)
	async login(@User() user: UserModel) {
		return this.authService.loginUser(user)
	}

	@Get("startParse")
	@UseGuards(JwtAuthGuard)
	@Roles(UserRole.admin)
	startParse(): string {
		return "ac"
	}

	@Get("stopParse")
	@UseGuards(JwtAuthGuard)
	@Roles(UserRole.admin)
	stopParse(): string {
		return "ac"
	}

	@Get(ROUTES.Profile)
	@UseGuards(JwtAuthGuard)
	getProfile(@User() user: UserModel) {
		return user
	}
}
