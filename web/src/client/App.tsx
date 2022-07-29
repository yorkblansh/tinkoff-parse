import * as React from "react"
import { render } from "react-dom"
import "./styles.scss"
import { Typography, TextField, Button } from "@material-ui/core"
import io from "socket.io-client"
import { useEffect, useState } from "react"
import { Events } from "./events.enum"

const socket = io()

export default function App() {
	const [isConnected, setIsConnected] = useState(socket.connected)

	useEffect(() => {
		socket.on(Events.CONNECT, () => {
			setIsConnected(true)
		})

		socket.on(Events.DISCONNECT, () => {
			setIsConnected(false)
		})

		return () => {
			socket.off(Events.CONNECT)
			socket.off(Events.DISCONNECT)
		}
	}, [])

	return (
		<div className="App">
			{/* <AppBar>
				<toolbar>
					<h1>SIGNIN FORM </h1>
				</toolbar>
			</AppBar> */}

			<Typography variant="h5">
				BASIC WITH MATERIAL UIiiiiiijojojojojo
			</Typography>
			<form>
				<TextField
					style={{ width: "200px", margin: "5px" }}
					type="text"
					label="setgoal"
					variant="outlined"
				/>
				<br />
				<TextField
					style={{ width: "200px", margin: "5px" }}
					type="text"
					label="goal description"
					variant="outlined"
				/>
				<br />
				<TextField
					style={{ width: "200px", margin: "5px" }}
					type="text"
					label="Diversity catagory"
					variant="outlined"
				/>
				<br />
				<TextField
					style={{ width: "200px", margin: "5px" }}
					type="text"
					label="Attribute"
					variant="outlined"
				/>
				<br />
				<TextField
					style={{ width: "200px", margin: "5px" }}
					type="text"
					label="goal stage"
					variant="outlined"
				/>
				<br />
				<TextField
					style={{ width: "200px", margin: "5px" }}
					type="number"
					label="job id"
					variant="outlined"
				/>
				<br />
				<TextField
					style={{ width: "200px", margin: "5px" }}
					type="text"
					label="job region"
					variant="outlined"
				/>
				<br />
				<Button variant="contained" color="primary">
					save
				</Button>
			</form>
		</div>
	)
}

render(<App />, document.getElementById("app"))
