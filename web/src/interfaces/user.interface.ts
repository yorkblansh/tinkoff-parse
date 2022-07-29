export interface User {
	username: string
	email: string
	password: string
	role: UserRole[]
}

enum UserRole {
	user = "user",
	admin = "admin",
}
