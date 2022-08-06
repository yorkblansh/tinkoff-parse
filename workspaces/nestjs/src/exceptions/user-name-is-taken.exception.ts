import { BadRequestException, HttpException } from "@nestjs/common"
import { SpecHttpStatus } from "common/enums/local.http.statuses.enum"

export class UserAlreadyExistException extends BadRequestException {
	constructor(private username: string) {
		super(
			HttpException.createBody({
				statusCode: SpecHttpStatus.USER_ALREADY_EXIST,
				message: "User Already Exist",
				error: `user with username: ${username} is already exist`,
			})
		)
	}
}
