import { HttpService } from "@nestjs/axios"
import { Injectable } from "@nestjs/common"

@Injectable()
export class ParserService {
	private readonly urlForParse: string =
		"https://garantex.io/p2p?utf8=%E2%9C%93&payment_method=%D0%A2%D0%B8%D0%BD%D1%8C%D0%BA%D0%BE%D1%84%D1%84&amount=200000&currency=RUB&commit=%D0%9F%D0%BE%D0%B8%D1%81%D0%BA"

	constructor(private readonly httpService: HttpService) {}

	async getData() {
		const response = await this.httpService.axiosRef.request({
			baseURL: this.urlForParse,
		})

		// console.log(response)
	}
}
