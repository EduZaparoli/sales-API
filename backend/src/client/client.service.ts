import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ClientService {
	constructor(private readonly prisma: PrismaService) {}

	async updateInstallments(purchaseId: number, installmentNumbers: number[], status: string) {
		return this.prisma.installment.updateMany({
			where: {
				purchaseId: purchaseId,
				installmentNumber: {
					in: installmentNumbers,
				},
			},
			data: {
				status: status,
			},
		});
	}

	async findByDocumentNumber(documentNumber: string) {
		const client = await this.prisma.client.findUnique({
			where: {
				documentNumber,
			},
			include: {
				address: true,
			},
		});
		if (!client) {
			throw new HttpException("Client not found", HttpStatus.NOT_FOUND);
		}
		return client;
	}

	async findOne(id: number) {
		return await this.prisma.client.findUnique({
			where: {
				id,
			},
		});
	}

	async findPurchaseById(id: number) {
		return this.prisma.purchase.findUnique({
			where: { id },
			include: { installments: true, client: true },
		});
	}

	async findAllPurchases(documentNumber: string) {
		return this.prisma.purchase.findMany({
			where: {
				client: {
					documentNumber: documentNumber,
				},
			},
			include: {
				products: {
					include: {
						product: true,
					},
				},
			},
		});
	}

	async findInstallmentsByProduct(productId: number) {
		return this.prisma.installment.findMany({
			where: {
				purchase: {
					products: {
						some: {
							productId: productId,
						},
					},
				},
			},
			include: {
				purchase: true,
			},
		});
	}

	async findPurchaseInstallments(purchaseId: number) {
		return this.prisma.installment.findMany({
			where: { purchaseId },
		});
	}
}
