import { HttpService } from "@nestjs/axios"
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { AuthService } from "auth/auth.service"
import { ROLES_KEY } from "auth/decorators/roles.decorator"
import { UserRole } from "common/interfaces/user.interface"

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private readonly httpService: HttpService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()]
		)

		if (!requiredRoles) {
			return true
		}

		const request = context.switchToHttp().getRequest()
		// const roles = await this.authService.validateUserRole(user.username)
		// const db_data = this.prisma.user.findMany({
		// 	where: { username: user.username },
		// })
		// this.authService.validateUserRole()
		const { data: profile } = await this.httpService.axiosRef.get(
			"http://localhost:3000/api/profile",
			{ headers: request.headers }
		)
		console.log(profile)
		// console.log(`test /api/p:    ${profile}`)
		// console.log(request.headers.authorization)
		// return true
		return requiredRoles.some((role) => profile.role === role)
	}
}
