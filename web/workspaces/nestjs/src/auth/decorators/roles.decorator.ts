import { SetMetadata } from "@nestjs/common"
import { ApiUnauthorizedResponse } from "@nestjs/swagger"
import { UserRole } from "common/interfaces/user.interface"

// const role = "admin"

export const ROLES_KEY = "roles"
export const AdminCheck = (...role: UserRole[]) => SetMetadata(ROLES_KEY, role)
