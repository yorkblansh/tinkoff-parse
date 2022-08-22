import _ from "lodash"

// const fieldNames = ["Продавец", "Метод оплаты", "Цена", "Сумма"]

export const dataFieldNames = {
	seller: "Продавец",
	payment_method: "Метод оплаты",
	price: "Цена",
	amount: "Сумма",
}

export const agregateParsedData = (parsedData: string[][]) => {
	console.log(parsedData)
	return parsedData.map((itemArray) => {
		itemArray.pop()

		const arrayOfSplittedFileds = _.zipWith(
			Object.keys(dataFieldNames),
			itemArray,
			(fildName, value) => {
				return { [fildName]: value }
			}
		)

		return _.merge({}, ...arrayOfSplittedFileds) as {
			[each in keyof typeof dataFieldNames]: string
		}
		// return Object.assign({}, ...arrayOfSplittedFileds)
	})
}
