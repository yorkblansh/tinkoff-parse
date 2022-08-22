import "./style.scss"

interface Props {
	title: string
	onPress?: () => any
	theme?: "red"
}

export const Button = ({ title, onPress, theme }: Props) => {
	return (
		<button onClick={onPress} className={`button${theme ? `__${theme}` : ""}`}>
			{title}
		</button>
	)
}
