import { HttpService } from "@nestjs/axios"
import { Injectable } from "@nestjs/common"
import * as cheerio from "cheerio"
import * as _ from "lodash"
import { Either, right, left } from "@sweet-monads/either"
import { ParsedData, ParserError } from "common/types/parser.types"

@Injectable()
export class ParserService {
	private readonly urlForParse: string =
		"https://garantex.io/p2p?utf8=%E2%9C%93&payment_method=%D0%A2%D0%B8%D0%BD%D1%8C%D0%BA%D0%BE%D1%84%D1%84&amount=200000&currency=RUB&commit=%D0%9F%D0%BE%D0%B8%D1%81%D0%BA"

	constructor(private readonly httpService: HttpService) {}

	async getData(): Promise<Either<ParserError, ParsedData>> {
		return this.httpService.axiosRef
			.request({
				baseURL: this.urlForParse,
			})
			.then((response) => {
				let arr: string[] = []
				const $ = cheerio.load(response.data)

				function fullArray(i: number) {
					arr[i] = $(this).text()
				}

				$(".sell_table tbody tr td").each(fullArray)

				// arr.join(", ")

				const splittedArray = _.chunk(arr, 5)
				return right(splittedArray)
			})
			.catch(() => {
				return left({ error: "" })
			})
	}
}
