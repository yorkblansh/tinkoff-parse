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
	symlinkOrCopySync("./src/common", "../reactapp/src/common")
} catch (error) {}
