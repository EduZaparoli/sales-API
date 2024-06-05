import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { ClientService } from "./client.service";
import { UpdateInstallmentsDto } from "./dto/update-installments.dto";

@Controller("client")
export class ClientController {
	constructor(private readonly clientService: ClientService) {}

	@Put("updateInstallments/:purchaseId")
	updateInstallments(@Param("purchaseId") purchaseId: number, @Body() updateInstallmentsDto: UpdateInstallmentsDto) {
		return this.clientService.updateInstallments(purchaseId, updateInstallmentsDto);
	}

	@Get("documentNumber/:documentNumber")
	findByDocumentNumber(@Param("documentNumber") documentNumber: string) {
		return this.clientService.findByDocumentNumber(documentNumber);
	}

	@Get(":productId/installments")
	async getInstallmentsByProduct(@Param("productId") productId: string) {
		const id = parseInt(productId, 10);
		if (isNaN(id)) {
			throw new Error("Invalid product ID");
		}
		return this.clientService.findInstallmentsByProduct(id);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.clientService.findOne(+id);
	}

	@Get("purchase/:id")
	async getPurchase(@Param("id") id: string) {
		return this.clientService.findPurchaseById(+id);
	}

	@Get(":documentNumber/purchases/all")
	async getAllPurchases(@Param("documentNumber") documentNumber: string) {
		return this.clientService.findAllPurchases(documentNumber);
	}

	@Get("purchase/:id/installments")
	async getPurchaseInstallments(@Param("id") id: string) {
		return this.clientService.findPurchaseInstallments(+id);
	}
}
