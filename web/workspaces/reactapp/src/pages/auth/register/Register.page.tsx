import { ReactNotifications } from "react-notifications-component"
import { useNavigate } from "react-router-dom"
import { socket } from "../../../App"
import {
	showNetworkError,
	showUserNotFoundException,
} from "../../../components/notifications/login.notifications"
import { registerUser } from "../../../utils/registerUser"

import "./style.scss"

export const RegisterPage = () => {
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
		const maybeRegistered = await registerUser(queryData)
		const { username, password } = queryData

		maybeRegistered
			.mapLeft((either) => {
				either
					.mapLeft((networkError) => {
						showNetworkError(networkError.error)
					})
					.mapRight((userNotFoundError) => {
						showUserNotFoundException(userNotFoundError.error)
					})
			})
			.mapRight(({ status }) => {
				const isUserCreated = status === "ok"
				console.log(status)
				if (isUserCreated) nav("/")
			})
	}

	return (
		<div className="register">
			<ReactNotifications />

			<div>
				<div className="register__back-button-wrapper">
					<button
						className="register__back-button-wrapper__item"
						onClick={() => nav("/")}
					>
						Назад
					</button>
				</div>

				<form
					onSubmit={handleFormSubmit}
					className="register__form"
					action="http://localhost:3001/api/auth/register"
					method="post"
				>
					<input
						className="register__form__input"
						type="text"
						name="username"
						id="username"
					/>
					<input
						className="register__form__input"
						type="password"
						name="password"
						id="password"
					/>

					<button
						className="register__form__submit"
						type="submit"
						onClick={() => {
							socket.close()
							socket.open()
						}}
					>
						Зарегистрировать
					</button>
				</form>
			</div>
		</div>
	)
}
