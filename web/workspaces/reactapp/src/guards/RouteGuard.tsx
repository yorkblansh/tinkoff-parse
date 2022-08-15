import React from "react"
import { Route } from "react-router-dom"

interface Props {
	choldren: JSX.Element
}

const RouteGuard = ({
	choldren,
	...rest
}: Props & ReturnType<typeof Route>) => {
	function hasJWT() {
		let flag = false

		//check user has JWT token
		localStorage.getItem("token") ? (flag = true) : (flag = false)

		return flag
	}

	return (
		<Route
			{...rest}
			
			// render={(props) =>
			// 	hasJWT() ? (
			// 		<Component {...props} />
			// 	) : (
			// 		<></>
			// 		// <Redirect to={{ pathname: "/login" }} />
			// 	)
			// }
		/>
	)
}
