import { Either, left, right } from "@sweet-monads/either"
import { httpFetch, NetWorkError } from "../services/httpFetch"

export interface UserAlreadyExistException {
	error: string
}

type RegisterResponse = { status: string }

export async function registerUser(queryData: {
	username: string
	password: string
}): Promise<
	Either<Either<NetWorkError, UserAlreadyExistException>, RegisterResponse>
> {
	const userLoginUrl = "http://localhost:3001/api/auth/register"
	const response = await httpFetch({
		method: "post",
		route: userLoginUrl,
		data: queryData,
	})

	return response.mapLeft((networkError) => {
		if (networkError.error_response) {
			const clientResponse = networkError.error_response
			const clientErrorStatus = clientResponse.data.statusCode
			const userErrorMessage = clientResponse.data.error
			if (clientErrorStatus === 420) return right({ error: userErrorMessage })
			else {
				return right({ error: "some error with user" })
			}
		} else {
			return left(networkError)
		}
	})
}
