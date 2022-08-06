/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import { sync as symlinkOrCopySync } from "symlink-or-copy"
import chalk from "chalk"

const error_color = chalk.bold.red
const warning_color = chalk.hex("#fbff00").bold
const blue_color = chalk.hex("#00eeff")
const green_color = chalk.hex("#00ff15").bold

const WARN = (text) => console.log(warning_color(text))
const ERROR = (text) => console.log(error_color(text))
const INFO = (text) => console.log(blue_color(text))
const SUCCES = (text) => console.log(green_color(text))

try {
	symlinkOrCopySync("./react_frontend/build", "./dist/src/server/build")
} catch (error) {
	// const isSourcePathError = error.message.includes("lstat")
	// const isDestinationPathError = error.message.includes("symlink")
	// const isOK = error.message.includes("file already exists, symlink")

	// if (isOK) SUCCES("Все билды найдены ☑️ , запуск...")
	// else if (isSourcePathError)
	// 	WARN("🟡 🟨 🟡    Не найден РЕАКТОВСКИЙ БИЛД!    🟡 🟨 🟡 \n"),
	// 		INFO(
	// 			"перейдите в папку react_frontend и выполните: \n 📥️ npm install 👈️ \n ⚒️  npm run build 👈️"
	// 		)
	// else if (isDestinationPathError)
	// 	WARN("Не найден БИЛД БЭКЕНДА!🔴 \n"),
	// 		INFO(
	// 			"находясь в папке blablago-fonds-panel (БЭКЕНД) выполните: \n 📥️ npm install 👈️ \n ⚒️  npm run build 👈️"
	// 		)
	// else ERROR("Неизвестная ошибка!"), console.dir(error)
}
