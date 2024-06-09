import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Put } from "@nestjs/common";
import { ClientService } from "./client.service";

@Controller("client")
export class ClientController {
	constructor(private readonly clientService: ClientService) {}

	@Put("updateInstallments/:purchaseId")
	async updateInstallments(
		@Param("purchaseId", ParseIntPipe) purchaseId: number,
		@Body() body: { installmentNumbers: number[]; status: string },
	) {
		const { installmentNumbers, status } = body;
		return this.clientService.updateInstallments(purchaseId, installmentNumbers, status);
	}

	@Get("documentNumber/:documentNumber")
	async findByDocumentNumber(@Param("documentNumber") documentNumber: string) {
		try {
			return await this.clientService.findByDocumentNumber(documentNumber);
		} catch (error) {
			if (error.status === HttpStatus.NOT_FOUND) {
				throw new HttpException("Client not found", HttpStatus.NOT_FOUND);
			}
			throw error;
		}
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
