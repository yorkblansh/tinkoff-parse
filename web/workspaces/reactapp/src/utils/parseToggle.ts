import { Either, left, right } from "@sweet-monads/either"
import { httpFetch, NetWorkError } from "../services/httpFetch"

interface PermissionDenied {
	error: string
}

export async function parseToggle(
	state: "1" | "0"
): Promise<
	Either<Either<NetWorkError, PermissionDenied>, { response: string }>
> {
	const userLoginUrl = `http://localhost:3001/api/${
		state === "1" ? "start" : "stop"
	}Parse`

	const headers = {
		// "content-type": "application/json",
		Authorization: `Bearer ${localStorage.getItem("access_token")}`,
	}
	const response = await httpFetch({
		method: "get",
		route: userLoginUrl,
		headers,
	})

	return response.mapLeft((networkError) => {
		console.log(networkError)
		if (networkError.error_response) {
			const clientResponse = networkError.error_response
			const clientErrorStatus = clientResponse.data.statusCode
			const permissionErrorMessage = clientResponse.data.error
			if (clientErrorStatus === 403)
				return right({ error: permissionErrorMessage })
			else {
				return right({ error: "some error with permission" })
			}
		} else {
			return left(networkError)
		}
	})
}
