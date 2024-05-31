import { Controller, Get, Param } from "@nestjs/common";
import { ClientService } from "./client.service";

@Controller("client")
export class ClientController {
	constructor(private readonly clientService: ClientService) {}

	@Get("documentNumber/:documentNumber")
	findByDocumentNumber(@Param("documentNumber") documentNumber: string) {
		return this.clientService.findByDocumentNumber(documentNumber);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.clientService.findOne(+id);
	}

	@Get("purchase/:id")
	async getPurchase(@Param("id") id: string) {
		return this.clientService.findPurchaseById(+id);
	}

	@Get("purchases/all")
	async getAllPurchases() {
		return this.clientService.findAllPurchases();
	}
}
