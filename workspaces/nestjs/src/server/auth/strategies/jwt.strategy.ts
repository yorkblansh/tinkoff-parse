import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { UserModel } from "../../../interfaces/user.interface"
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
		// console.log(payload)
		return {
			username: payload.username,
			email: payload.email,
			role: payload.role,
		} as UserModel
	}
}
