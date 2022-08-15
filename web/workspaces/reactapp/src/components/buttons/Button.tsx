import "./style.scss"

interface Props {
	title: string
}

export const Button = ({ title }: Props) => {
	return <button className="button">{title}</button>
}
