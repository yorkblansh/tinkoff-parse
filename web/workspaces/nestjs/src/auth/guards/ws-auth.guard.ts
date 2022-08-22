import { HttpService } from "@nestjs/axios"
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Observable } from "rxjs"

@Injectable()
export class wsAuthGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private readonly httpService: HttpService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const wsData = context.switchToWs().getData()
		const maybeAccessToken = wsData.access_token
		// const maybeAccessToken = wsData.handshake.auth.access_token as string
		console.log(maybeAccessToken)

		const response = await this.httpService.axiosRef.get(
			"http://localhost:3001/api/profile",
			{
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${maybeAccessToken}`,
				},
			}
		)

		const isUserExist = response.status === 200
		// const { status, statusText } = response
		// console.log(response.status)
		// console.log(response.data)

		return isUserExist
	}
}
