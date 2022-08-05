import { Injectable } from "@nestjs/common"
import { PrismaService } from "prisma/prisma.service"
import { UserModel } from "../../interfaces/user.interface"

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
		const { email, password, username } = user
		const _user = { email, password, username, role: "user" }
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
