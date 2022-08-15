import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { INestApplication } from "@nestjs/common"

function swagger(app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle("Tinkoff parser")
		.setDescription("API description")
		.setVersion("0.1.0")
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup("swagger", app, document)
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix("api")
	app.enableCors()

	swagger(app)

	await app.listen(3001)
}
bootstrap()
