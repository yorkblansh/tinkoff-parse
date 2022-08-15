import React from "react"
import ReactDOM from "react-dom/client"
import "./scss/index.scss"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import { ROUTES } from "./common/interfaces/routes.interface"
import { LoginPage } from "./pages/auth/login/Login.page"

export enum ROUTES {
	Auth = "auth",
	Login = "login",
	Register = "register",
	Profile = "profile",
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path={ROUTES.Auth}>
					<Route path={ROUTES.Login} element={<LoginPage />} />
					<Route path={ROUTES.Register} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
