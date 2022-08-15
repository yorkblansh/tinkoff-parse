import React, { useEffect, useState } from "react"
import logo from "./logo.svg"
import io from "socket.io-client"
// import { Events } from "./common/enums/events.enum"
import axios from "axios"

import "./scss/App/App.scss"
import "./scss/App/header.scss"
import "./scss/App/main.scss"
import { Button } from "./components/buttons/Button"
import { ConnectIndicator } from "./components/connect.indicztor/ConnectIndicator"

enum Events {
	CONNECT = "connect",
	DISCONNECT = "disconnect",
	PARSING = "parsing",
}

function App() {
	const socket = io("http://localhost:3001", {
		reconnection: true,
		reconnectionDelayMax: 3000,
		auth: { access_token: localStorage.getItem("access_token") },
		autoConnect: false,
	})

	const [isOnline, setIsOnline] = useState(socket.connected)

	useEffect(() => {
		socket.connect()

		socket.on(Events.CONNECT, () => {
			setIsOnline(true)
		})

		// socket.on(Events.PARSING, (data) => {
		// 	console.log(data)
		// })

		socket.on(Events.DISCONNECT, () => {
			console.log("DISCONECT")

			setIsOnline(false)
		})

		return () => {
			socket.off(Events.CONNECT)
			socket.off(Events.DISCONNECT)
			// socket.off(Events.PARSING)
		}
	}, [socket])

	console.log(isOnline)
	socket.emit("login", { access_token: localStorage.getItem("access_token") })
	// axios
	// 	.post(
	// 		"http://localhost:3001/api/auth/login",
	// 		{
	// 			username: "uuser",
	// 			password: "password",
	// 		},
	// 		{
	// 			headers: {
	// 				"content-type": "application/json",
	// 			},
	// 		}
	// 	)
	// 	.then((d) => {
	// 		const { access_token } = d.data
	// 		// console.log(d)
	// 		socket.emit("login", { access_token })
	// 	})
	// axios
	// 	.request({
	// 		baseURL: "http://localhost:3001/api/auth/login",
	// 		method: "post",
	// 		data: {
	// 			username: "uuser",
	// 			password: "password",
	// 		},
	// 	})
	// 	.then((d) => {
	// 		console.log(d)
	// 		// socket.emit("login", "ask_for_auth")
	// 	})

	// let delay = 2000

	// let timerId = setTimeout(function request() {
	// 	if (!isOnline) {
	// 		// увеличить интервал для следующего запроса
	// 		// delay *= 2
	// 		clearInterval(timerId)
	// 	}
	// 	console.log("pending parsing...")
	// 	socket.emit(Events.PARSING, { test: "test" })
	// 	timerId = setTimeout(request, delay)
	// }, delay)

	// timerId = setInterval(() => {
	// 	console.log("pending parsing...")
	// 	socket.emit(Events.PARSING, { test: "test" })
	// }, 2000)

	// socket.on(Events.PARSING, (data) => {
	// 	console.log(data)
	// })

	// if (isOnline) {
	// 	console.log("online")
	// 	console.log(timerId)
	// 	if (timerId === undefined) {
	// 		timerId = setInterval(() => {
	// 			console.log("pending parsing...")
	// 			socket.emit(Events.PARSING, { test: "test" })
	// 		}, 2000)
	// 	}
	// } else {
	// 	console.log("OFFline")
	// 	// // timerId ? clearInterval(timerId) : console.log("parsing is not avaliable")
	// 	// // if (timerId !== null) {
	// 	// console.log(timerId)
	// 	clearInterval(timerId)

	// 	// console.log("connection lost, parsing end")

	// 	// // UNsubscribeEvents()
	// 	// // } else {
	// 	// // 	console.log("parsing is not avaliable")
	// 	// // }
	// }

	return (
		<div className="app">
			<header className="header">
				<div className="header__title-wrapper">
					<ConnectIndicator online={isOnline} />
					Tinkoff parser
				</div>

				<div className="header__btn-wrapper">
					<Button title="Войти" />
					<Button title="Регистрация" />
				</div>
			</header>

			<main className="main">main text</main>
		</div>
	)
}

export default App
