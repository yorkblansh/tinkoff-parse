import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { AuthService } from "auth/auth.service"
import { UserModel } from "common/interfaces/user.interface"
import { ExtractJwt, Strategy } from "passport-jwt"
import { jwtConstants } from "../constants"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret,
		})
	}

	async validate(payload: any) {
		// const user = await this.authService.validateUserRole(payload.username)
		// console.log(payload)
		if (payload) console.log("payload is exist")
		console.log(payload)
		return {
			username: payload.username,
			email: payload.email,
			role: payload.role,
		} as UserModel
	}
}
