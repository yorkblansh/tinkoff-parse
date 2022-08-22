import { HttpModule } from "@nestjs/axios"
import { Module } from "@nestjs/common"
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core"
import { AuthModule } from "auth/auth.module"
import { AuthService } from "auth/auth.service"
import { RolesGuard } from "auth/guards/roles.guard"
import { PrismaService } from "prisma/prisma.service"
import { UsersModule } from "users/users.module"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { EventsModule } from "./events/events.module"
import { PrismaModule } from "./prisma/prisma.module"
import { ParserModule } from "./parser/parser.module"
import { RedisModule } from "redis/redis.module"
import { ErrorsInterceptor } from "auth/interceptors/errors.interceptor"

@Module({
	imports: [
		EventsModule,
		PrismaModule,
		AuthModule,
		UsersModule,
		HttpModule,
		ParserModule,
		RedisModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ErrorsInterceptor,
		},
		RedisModule,
	],
	// exports: [AuthService],
})
export class AppModule {}
