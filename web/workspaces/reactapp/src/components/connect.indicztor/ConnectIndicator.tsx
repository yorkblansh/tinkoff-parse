import "./style.scss"

interface Props {
	online: boolean
}

export const ConnectIndicator = ({ online }: Props) => {
	return (
		<div
			className={`connect-indicator__${online ? "online" : "offline"}`}
		></div>
	)
}
