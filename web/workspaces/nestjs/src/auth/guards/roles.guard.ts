import { HttpService } from "@nestjs/axios"
import {
	Injectable,
	CanActivate,
	ExecutionContext,
	HttpException,
	ForbiddenException,
	UnauthorizedException,
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { AuthService } from "auth/auth.service"
import { ROLES_KEY } from "auth/decorators/roles.decorator"
import { is } from "cheerio/lib/api/traversing"
import { UserRole } from "common/interfaces/user.interface"
import { Response } from "express"

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private readonly httpService: HttpService
	) {}

	async canActivate(context: ExecutionContext) {
		const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()]
		)

		if (!requiredRoles) {
			return true
		}

		// const res = context.switchToHttp().getResponse<Response>()
		const httpRequest = context.switchToHttp().getRequest()
		// const wsData = context.switchToWs().getData()

		return await this.httpService.axiosRef
			.get("http://localhost:3001/api/profile", {
				headers: {
					...httpRequest.headers,
					// Authorization: `Bearer ${wsData.access_token}`,
				},
			})
			.then((response) => {
				const { data: profile } = response
				return requiredRoles.some((role) => profile.role === role)
				// const isOK = requiredRoles.some((role) => profile.role === role)
				// THIS IS FOR SPEC EXCEPTION
				// return this.validateRequest(isOK)
			})
			.catch((e) => {
				// console.log("api/profile exception")
				// console.log(e.response.data)
				const errorStatusCode = e.response.data?.statusCode
				if (errorStatusCode && errorStatusCode === 401) {
					throw new UnauthorizedException()
				} else {
					throw new HttpException("User is not admin", 455)
				}
			})
	}

	// private validateRequest(isOK: boolean) {
	// 	if (isOK) {
	// 		return true
	// 	} else {
	// 		// console.log("user__is__not__admin")
	// 		// console.log(`isOK: ${isOK}`)
	// 		throw new HttpException("User is not admin", 455)
	// 	}
	// }
}
