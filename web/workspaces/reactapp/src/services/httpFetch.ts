import { Either, left, right } from "@sweet-monads/either"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { HttpExceptionBody } from "../common/interfaces/http.exception.body.interface"

export interface NetWorkError {
	error: string
	error_response?: AxiosResponse<HttpExceptionBody, any>
}

interface Props {
	method: "post" | "get"
	route: string
	data?: any
	headers?: AxiosRequestConfig["headers"]
}

export const httpFetch = async ({
	method,
	route,
	data,
	headers,
}: Props): Promise<Either<NetWorkError, any>> => {
	const handleError = (error: any) => {
		const isServerIsNotResponding = error.code === "ECONNABORTED"

		const serverError = { error: "the server is not responding" }
		const higherLevelError = {
			error: "some server error",
			error_response: error.response,
		}

		return isServerIsNotResponding ? left(serverError) : left(higherLevelError)
	}

	const handleResponse = (response: AxiosResponse<any, any>) =>
		right(response.data)

	return axios
		.request({
			timeout: 5000,
			baseURL: route,
			data,
			method,
			headers: {
				"content-type": "application/json",
				...headers,
			},
		})
		.then(handleResponse)
		.catch(handleError)
}
