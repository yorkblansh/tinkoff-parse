import { HttpModule } from "@nestjs/axios"
import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { jwtConstants } from "auth/constants"
import { JwtStrategy } from "auth/strategies/jwt.strategy"
import { ParserModule } from "parser/parser.module"
import { RedisModule } from "redis/redis.module"
import { EventsGateway } from "./events.gateway"

@Module({
	imports: [
		RedisModule,
		ParserModule,
		HttpModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: process.env.jwtExpire },
		}),
	],
	providers: [EventsGateway, JwtStrategy, RedisModule],
})
export class EventsModule {}
