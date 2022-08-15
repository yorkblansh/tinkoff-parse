import { HttpException, UnauthorizedException } from "@nestjs/common"
import { SpecHttpStatus } from "common/enums/local.http.statuses.enum"
import { HttpExceptionBody } from "common/interfaces/http.exception.body.interface"

const ExceptionBody = (username: string): HttpExceptionBody => ({
	statusCode: SpecHttpStatus.USER_NOT_FOUND,
	message: "User Not Found",
	error: `user ${username} not found`,
})

export class UserNotFoundException extends UnauthorizedException {
	constructor(private username: string) {
		super(HttpException.createBody(ExceptionBody(username)), "User Not Found")
	}
}
