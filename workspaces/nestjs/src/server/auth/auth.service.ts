import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { UserAlreadyExistException } from "exceptions/user-name-is-taken.exception"
import { UserNotFoundException } from "exceptions/user-not-found.exception"
import { UsersService } from "users/users.service"
import { UserModel } from "../../interfaces/user.interface"

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {}

	async validateUserRole(username: string) {
		const user = await this.usersService.findOne(username)
		return user.role
	}

	async checkIsUserExist(username: string) {
		const user = await this.usersService.findOne(username)
		if (user && user.username === username) {
			// const { password, ...result } = user
			return true
		} else {
			return false
		}
	}

	async validateUser(username: string, password: string) {
		const user = await this.usersService.findOne(username)
		if (user && user.password === password) {
			const { password, ...result } = user
			return result
		}
		return null
	}

	async loginUser(user: any) {
		const payload = {
			username: user.username,
			sub: user.userId,
			role: user.role,
		}

		return {
			access_token: this.jwtService.sign(payload),
		}
	}

	async registerUser(user: UserModel) {
		const { username, password, email } = user

		const isUserExist = await this.checkIsUserExist(username)
		console.log(`isUserNameFree: ${isUserExist}`)

		if (isUserExist) {
			throw new UserAlreadyExistException(username)
		} else {
			const user: UserModel = { username, password, email, role: "user" }
			this.usersService.create(user)
		}
	}
}
