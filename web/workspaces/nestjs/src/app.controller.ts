import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Post,
	UseFilters,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common"
import { AuthService } from "auth/auth.service"
import { AdminCheck } from "auth/decorators/roles.decorator"
import { User } from "auth/decorators/user.decorator"
import { AdminFilter } from "auth/filters/admin-controls.filter"
import { JwtAuthGuard } from "auth/guards/jwt-auth.guard"
import { LocalAuthGuard } from "auth/guards/local-auth.guard"
import { ErrorsInterceptor } from "auth/interceptors/errors.interceptor"
import { ROUTES } from "common/interfaces/routes.interface"
import { UserModel, UserRole } from "common/interfaces/user.interface"
import {
	RedisClientType,
	RedisFunctions,
	RedisModules,
	RedisScripts,
} from "redis"

@Controller()
export class AppController {
	constructor(
		private readonly authService: AuthService,
		@Inject("REDIS_CLIENT") private readonly redis: RedisClientType
	) {
		this.redis.set("parsing_state", 0)
	}

	@Get()
	getHello(): string {
		return "welcome to api"
	}

	@Post("auth/register")
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() user: UserModel) {
		return this.authService.registerUser(user)
	}

	@Post("auth/login")
	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalAuthGuard)
	async login(@User() user: UserModel) {
		return this.authService.loginUser(user)
	}

	@Get("startParse")
	@UseGuards(JwtAuthGuard)
	@AdminCheck(UserRole.admin)
	startParse() {
		this.redis.set("parsing_state", 1)
		return "parse started"
	}

	@Get("stopParse")
	@UseGuards(JwtAuthGuard)
	@AdminCheck(UserRole.admin)
	stopParse() {
		this.redis.set("parsing_state", 0)
		return "parse stopped"
	}

	@Get(ROUTES.Profile)
	@UseGuards(JwtAuthGuard)
	// @UseFilters(AdminFilter)
	getProfile(@User() user: UserModel) {
		return user
	}
}
