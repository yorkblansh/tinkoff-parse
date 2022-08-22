import React, { useEffect, useState } from "react"
import { Button } from "./components/buttons/Button"
import { ConnectIndicator } from "./components/connect.indicztor/ConnectIndicator"
import { useNavigate } from "react-router-dom"

import io from "socket.io-client"

import "./scss/App/App.scss"
import "./scss/App/header.scss"
import "./scss/App/main.scss"
import { agregateParsedData, dataFieldNames } from "./utils/agregateParsedData"
import { AdminControls } from "./components/parsing/ParsingAdminControls"

const defaultData = [
	{
		seller: "",
		payment_method: "",
		price: "",
		amount: "",
	},
]

enum Events {
	CONNECT = "connect",
	DISCONNECT = "disconnect",
	PARSE = "parse",
}

export const socket = io("http://localhost:3001", {
	reconnection: true,
	reconnectionDelayMax: 3000,
	autoConnect: true,
})

function App() {
	const nav = useNavigate()

	const [isOnline, setIsOnline] = useState(socket.connected)
	const [isSubscribedOnParsing, setSubscribeOnParsing] = useState(false)
	const [data, setData] = useState(defaultData)
	const [isParsing, setParsing] = useState<boolean | null>(null)

	const getUser = () => ({
		username: localStorage.getItem("username"),
		isAdmin: localStorage.getItem("isAdmin"),
	})

	const logOut = () => {
		localStorage.removeItem("username")
		nav("/")
	}

	const handleConnectEvent = () => {
		setIsOnline(true)
	}
	const handleDisconnectEvent = () => {
		console.log("DISCONECT")
		setIsOnline(false)
	}

	const handleParsingState = (response: { state: "1" | "0" }) => {
		setParsing(response.state === "1" ? true : false)
	}

	const handleParsedData = (response: { parsedData: string[][] }) => {
		const agredData = agregateParsedData(response.parsedData)
		console.log(response)
		setData(agredData)
	}

	// const subscribeToParsingStuff = (state: boolean) => {
	// 	if (state) {
	// 		socket.on(Events.PARSE, handleParsedData)
	// 		socket.on("parse_state", handleParsingState)
	// 	} else {
	// 		socket.off(Events.PARSE)
	// 		socket.off("parse_state")
	// 	}
	// 	setSubscribeOnParsing(state)
	// }

	const isAuthed = getUser().username !== null
	const isAdmin = getUser().isAdmin === "admin"

	useEffect(() => {
		socket.offAny()
		socket.on(Events.CONNECT, handleConnectEvent)

		if (isAuthed) {
			socket.emit("login", {
				access_token: localStorage.getItem("access_token"),
			})

			if (!isSubscribedOnParsing && isAuthed) {
				socket.on(Events.PARSE, handleParsedData)
				socket.on("parse_state", handleParsingState)
				setSubscribeOnParsing(true)
				// subscribeToParsingStuff(true)
			}
		} else {
			socket.off(Events.PARSE)
			socket.off("parse_state")
			setSubscribeOnParsing(false)
			// subscribeToParsingStuff(false)
			setData(defaultData)
		}

		socket.on(Events.DISCONNECT, handleDisconnectEvent)

		return () => {
			socket.off(Events.CONNECT)
			socket.off(Events.DISCONNECT)
			setData(defaultData)
		}
	}, [isAuthed, isSubscribedOnParsing])

	console.log(isAuthed)
	// if (isAdmin) console.log("user is admin!")

	return (
		<div className="app">
			<header className="header">
				<div className="header__title-wrapper">
					<ConnectIndicator online={isOnline} />
					Tinkoff parser
				</div>

				<div className="header__accoun-area">
					{isAuthed ? (
						<>
							<Button title={getUser().username as string} />
							<Button
								title="выйти"
								onPress={() => {
									logOut()
									socket.offAny()
									socket.offAnyOutgoing()
									socket.close()
									socket.open()
								}}
							/>
						</>
					) : (
						<>
							<Button title="Войти" onPress={() => nav("/auth/login")} />
							<Button
								title="Регистрация"
								onPress={() => nav("/auth/register")}
							/>
						</>
					)}
				</div>
			</header>

			<main className="main">
				{isAuthed && (
					<>
						{isAdmin && isParsing !== null && (
							<AdminControls
								isParsingEnabled={isParsing !== null ? isParsing : false}
							/>
						)}
						{isParsing !== null && !isParsing && (
							<div className="main__parsing-stopped">
								Парсинг остановлен{" "}
								{data !== defaultData
									? " если страница будет перезагружена - данные обнулятся"
									: ""}
							</div>
						)}
					</>
				)}

				<table>
					<caption>Таблица</caption>
					<thead>
						<tr>
							{Object.values(dataFieldNames).map((fieldName) => (
								<th>{fieldName}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{data.map(({ seller, price, payment_method, amount }) => (
							<tr>
								<td>{seller}</td>
								<td>{payment_method}</td>
								<td>{price}</td>
								<td>{amount}</td>
							</tr>
						))}
						{/* <tr>
							<th scope="row">Buzzcocks</th>
							<td>1976</td>
							<td>9</td>
							<td>Ever fallen in love (with someone you shouldn't've)</td>
						</tr> */}
					</tbody>
				</table>
			</main>
		</div>
	)
}

export default App
