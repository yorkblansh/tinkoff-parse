import { Either } from "@sweet-monads/either"

import { useNavigate } from "react-router-dom"
import {
	AccessToken,
	loginUser,
	UserNotFoundError,
} from "../../../utils/loginUser"
import "./style.scss"

export const LoginPage = () => {
	const nav = useNavigate()

	function serializeForm(formNode: { elements: any }) {
		const { elements } = formNode
		const data: { [x: string]: string }[] = Array.from(elements)
			.filter((item: any) => !!item.name)
			.map(({ name, value }: any) => ({
				[name]: value,
			}))
		return { ...data[0], ...data[1] }
	}

	async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const queryData = serializeForm(e.target as any)
		const maybeLoggedIn = await loginUser(queryData)

		maybeLoggedIn
			.mapLeft((either) => {
				either
					.mapLeft((networkError) => {
						console.log(networkError)
					})
					.mapRight((userNotFoundError) => {
						console.log(userNotFoundError)
					})
			})
			.mapRight((access_token) => {
				console.log(access_token)
			})
	}

	return (
		<div className="login">
			<form
				onSubmit={handleFormSubmit}
				className="login__form"
				action="http://localhost:3001/api/auth/login"
				method="post"
			>
				<input
					className="login__form__input"
					type="text"
					name="username"
					id="username"
				/>
				<input
					className="login__form__input"
					type="password"
					name="password"
					id="password"
				/>

				<button className="login__form__submit" type="submit">
					Войти
				</button>
			</form>
		</div>
	)
}
