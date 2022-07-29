export interface User {
	username: string
	email: string
	password: string
	role: UserRole
}

type UserRole = "client" | "admin"
