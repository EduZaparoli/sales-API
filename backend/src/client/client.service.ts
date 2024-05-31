import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ClientService {
	constructor(private readonly prisma: PrismaService) {}

	async findByDocumentNumber(cpf: string) {
		return await this.prisma.client.findUnique({
			where: {
				cpf,
			},
		});
	}

	async findOne(clientId: number) {
		return await this.prisma.client.findUnique({
			where: {
				clientId,
			},
		});
	}
}
