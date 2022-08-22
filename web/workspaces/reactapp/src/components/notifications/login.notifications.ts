import { Store as NotificationStore } from "react-notifications-component"

export function showNetworkError(message: string) {
	NotificationStore.addNotification({
		title: "Network Error!",
		message,
		type: "danger",
		insert: "top",
		container: "bottom-right",
		animationIn: ["animate__animated", "animate__fadeIn"],
		animationOut: ["animate__animated", "animate__fadeOut"],
		dismiss: {
			duration: 5000,
			onScreen: true,
		},
	})
}

export function showUserNotFoundException(message: string) {
	NotificationStore.addNotification({
		title: "User Not Found",
		message,
		type: "warning",
		insert: "top",
		container: "bottom-right",
		animationIn: ["animate__animated", "animate__fadeIn"],
		animationOut: ["animate__animated", "animate__fadeOut"],
		dismiss: {
			duration: 5000,
			onScreen: true,
		},
	})
}

export function showUserLoggedSucces() {
	NotificationStore.addNotification({
		title: "You Logged in!",
		// message,
		type: "success",
		insert: "top",
		container: "bottom-right",
		animationIn: ["animate__animated", "animate__fadeIn"],
		animationOut: ["animate__animated", "animate__fadeOut"],
		dismiss: {
			duration: 5000,
			onScreen: true,
		},
	})
}
