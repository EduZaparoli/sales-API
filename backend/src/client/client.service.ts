import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateInstallmentsDto } from "./dto/update-installments.dto";

@Injectable()
export class ClientService {
	constructor(private readonly prisma: PrismaService) {}

	async updateInstallments(purchaseId: number, updateInstallmentsDto: UpdateInstallmentsDto) {
		const { installments } = updateInstallmentsDto;

		const updatePromises = installments.map((installment) => {
			return this.prisma.installment.update({
				where: { id: installment.id },
				data: {
					installmentNumber: installment.installmentNumber,
					installmentValue: installment.installmentValue,
					dueDate: new Date(installment.dueDate),
					paymentDate: installment.paymentDate ? new Date(installment.paymentDate) : null,
				},
			});
		});

		return await Promise.all(updatePromises);
	}

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
