import { HttpException, UnauthorizedException } from "@nestjs/common"
import { SpecHttpStatus } from "../../interfaces/local.http.statuses.enum"

export class UserNotFoundException extends UnauthorizedException {
	constructor(private username: string) {
		super(
			HttpException.createBody({
				statusCode: SpecHttpStatus.USER_NOT_FOUND,
				message: "User Not Found",
				error: `user ${username} not found`,
			})
		)
	}
}
