import { Module } from "@nestjs/common"
import { AuthModule } from "auth/auth.module"
import { UsersModule } from "users/users.module"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { EventsModule } from "./events/events.module"
import { PrismaModule } from "./prisma/prisma.module"

@Module({
	imports: [EventsModule, PrismaModule, AuthModule, UsersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
