import { parseToggle } from "../../utils/parseToggle"
import { Button } from "../buttons/Button"
import "./styles.scss"

interface Props {
	isParsingEnabled: boolean
}

export const AdminControls = ({ isParsingEnabled }: Props) => {
	const handleToggleEvent = async (state: boolean) => {
		const either = await parseToggle(state ? "1" : "0")

		either
			.mapLeft((e) => {
				e.mapLeft((networkError) => {
					console.log(networkError)
				}).mapRight((permissionDenied) => {
					console.log(permissionDenied)
				})
			})
			.mapRight(({ response }) => {
				console.log(response)
			})
	}

	return (
		<div className="admin-controls">
			<Button
				title="ON"
				onPress={() => {
					handleToggleEvent(true)
				}}
			/>
			<Button
				title="OFF"
				theme="red"
				onPress={() => {
					handleToggleEvent(false)
				}}
			/>

			<div>Парсинг сейчас: {isParsingEnabled ? "включен" : "ВЫключен"}</div>
		</div>
	)
}
