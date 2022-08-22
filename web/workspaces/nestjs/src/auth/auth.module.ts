import { Module } from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { UsersModule } from "users/users.module"
import { AuthService } from "./auth.service"
import { jwtConstants } from "./constants"
import { RolesGuard } from "./guards/roles.guard"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { LocalStrategy } from "./strategies/local.strategy"
import "dotenv/config"
import { env } from "process"

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: process.env.jwtExpire },
		}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
