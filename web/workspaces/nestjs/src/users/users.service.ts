import { Injectable } from "@nestjs/common"
import { UserModel } from "common/interfaces/user.interface"
import { random } from "lodash"
import { PrismaService } from "prisma/prisma.service"

@Injectable()
export class UsersService {
	private users: (UserModel | undefined)[]

	constructor(private readonly prisma: PrismaService) {
		// this.users = [
		// 	{
		// 		email: "emailll",
		// 		role: "admin",
		// 		username: "john",
		// 		password: "changeme",
		// 	},
		// 	{
		// 		email: "emailll",
		// 		role: "user",
		// 		username: "chris",
		// 		password: "secret",
		// 	},
		// 	{
		// 		email: "emailll",
		// 		role: "user",
		// 		username: "maria",
		// 		password: "guess",
		// 	},
		// ]
	}

	async create(user: UserModel) {
		console.log(user)
		const { email, password, username } = user
		const _user = {
			email: `${random(1, 300)}@mail.com`,
			password,
			username,
			role: "user",
		}
		try {
			await this.prisma.user.create({ data: _user })
		} catch (error) {
			console.log(error)
		}
	}

	async findOne(username: string) {
		const [user] = await this.prisma.user.findMany({
			where: { username },
		})
		return user as UserModel
		// console.log(user)
		// return this.users.find(
		// 	(user) => user?.username === username
		// ) as unknown as Promise<UserModel | undefined>
	}
}
