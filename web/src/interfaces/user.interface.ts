export interface UserModel {
	username: string
	email: string
	password: string
	role?: keyof typeof UserRole | undefined
}

export enum UserRole {
	user = "user",
	admin = "admin",
}
