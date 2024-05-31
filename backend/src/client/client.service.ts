import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ClientService {
	constructor(private readonly prisma: PrismaService) {}

	async findByDocumentNumber(documentNumber: string) {
		return await this.prisma.client.findUnique({
			where: {
				documentNumber,
			},
		});
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

	async findAllPurchases() {
		return this.prisma.purchase.findMany({
			include: {
				installments: true,
				client: true,
				products: {
					include: {
						product: true,
					},
				},
			},
		});
	}

	async findPurchaseInstallments(purchaseId: number) {
		return this.prisma.installment.findMany({
			where: { purchaseId },
		});
	}
}
