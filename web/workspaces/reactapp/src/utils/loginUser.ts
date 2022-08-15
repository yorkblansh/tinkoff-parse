import { Either, right, left } from "@sweet-monads/either"
import { HttpExceptionBody } from "../common/interfaces/http.exception.body.interface"
import axios from "axios"

export interface NetWorkError {
	error: string
	status?: number
}

export interface UserNotFoundError {
	error: string
}

export type AccessToken = { access_token: string }

interface _Payload {
	headers: Headers
	status: number
	payload: any
}
type EndType<T> = T extends (x?: any) => Promise<ReturnType<infer E>> ? E : T

const plainFetch = async (
	method: "post" | "get",
	route: string,
	data: any
): Promise<Either<NetWorkError, AccessToken>> => {
	// try {

	return axios
		.request({
			timeout: 5000,
			baseURL: route,
			data,
			method,
			headers: {
				"content-type": "application/json",
			},
		})
		.then((response) => {
			console.log(response)
			return right(response.data)
		})
		.catch((e) =>
			e.code === "ECONNABORTED"
				? left({ error: "the server is not responding" })
				: left({
						error: "some server error",
						status: e.response.data.statusCode,
				  })
		)
	// return fetch(route, {
	// 	method: "post",
	// 	body: JSON.stringify(data),
	// 	headers: { "content-type": "application/json" },
	// })
	// 	.then(async (response) => {
	// 		return right(await response.json())
	// 	})
	// 	.catch((e) => {
	// 		console.log(e)
	// 		// left(e)
	// 		return left({ Net_error: "undef or sever error" })
	// 	})

	// const [payload, headers, status] = await Promise.all([
	// 	response.json(),
	// 	response.headers,
	// 	response.status,
	// ])

	// return right(response)
	// } catch (error) {
	// 	console.log(error)
	// 	return left({ Net_error: "undef or sever error" })
	// }
}

export async function loginUser(
	queryData: any
): Promise<Either<Either<NetWorkError, UserNotFoundError>, AccessToken>> {
	const userLoginUrl = "http://localhost:3001/api/auth/login"
	const response = await plainFetch("post", userLoginUrl, queryData)

	// const data = response.value

	// const exception = data as HttpExceptionBody
	// const exception = data.payload as HttpExceptionBody

	// const isUserException = exception.error !== undefined

	return response.mapLeft((e) => {
		if (e.status) {
			const status = e.status
			if (status === 419) return right({ error: "user not found____" })
			else {
				return right({ error: "some error with user" })
			}
		} else {
			return left(e)
		}
	})
	// return response.mapRight((d) =>
	// 	isUserException ? left({ error: "user not found____" }) : right(d)
	// )
}
