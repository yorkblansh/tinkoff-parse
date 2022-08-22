import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	ForbiddenException,
	HttpCode,
	HttpStatus,
} from "@nestjs/common"
import { Request, Response } from "express"

@Catch(HttpException)
export class AdminFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()
		const status = exception.getStatus()

		response.status(status).json({
			statusCode: HttpStatus.FORBIDDEN,
			timestamp: new Date().toISOString(),
			path: request.url,
		})
	}
}
