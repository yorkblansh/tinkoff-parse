/* eslint-disable no-restricted-globals */
import { ReactNotifications } from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
import { Store } from "react-notifications-component"

import { useNavigate } from "react-router-dom"
import {
	AccessToken,
	loginUser,
	UserNotFoundError,
} from "../../../utils/loginUser"
import "./style.scss"
import {
	showNetworkError,
	showUserLoggedSucces,
	showUserNotFoundException,
} from "../../../components/notifications/login.notifications"
import { socket } from "../../../App"

export const LoginPage = () => {
	const nav = useNavigate()

	function serializeForm(formNode: { elements: any }) {
		const { elements } = formNode
		const data: { [x: string]: string }[] = Array.from(elements)
			.filter((item: any) => !!item.name)
			.map(({ name, value }: any) => ({
				[name]: value,
			}))
		return { ...data[0], ...data[1] } as {
			username: string
			password: string
		}
	}

	async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const queryData = serializeForm(e.target as any)
		const maybeLoggedIn = await loginUser(queryData)
		const { username, password } = queryData
		// console.log(queryData)

		maybeLoggedIn
			.mapLeft((either) => {
				either
					.mapLeft((networkError) => {
						showNetworkError(networkError.error)
					})
					.mapRight((userNotFoundError) => {
						showUserNotFoundException(userNotFoundError.error)
					})
			})
			.mapRight(({ access_token, role }) => {
				showUserLoggedSucces()
				localStorage.setItem("access_token", access_token)
				localStorage.setItem("username", username)
				localStorage.setItem("isAdmin", role)
				// localStorage.setItem("password", password)
				console.log(localStorage.getItem("access_token"))
				nav("/")
				// location.reload()
			})
	}

	return (
		<div className="login">
			<ReactNotifications />

			<div>
				<div className="login__back-button-wrapper">
					<button
						className="login__back-button-wrapper__item"
						onClick={() => nav("/")}
					>
						Назад
					</button>
				</div>

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

					<button
						className="login__form__submit"
						type="submit"
						onClick={() => {
							socket.close()
							socket.open()
						}}
					>
						Войти
					</button>
				</form>
			</div>
		</div>
	)
}
