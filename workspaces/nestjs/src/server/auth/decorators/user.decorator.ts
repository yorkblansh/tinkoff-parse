import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { UserModel } from "common/interfaces/user.interface"

export const User = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		return request.user as UserModel
	}
)
