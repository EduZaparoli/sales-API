import { Controller, Get, Param } from "@nestjs/common";
import { ClientService } from "./client.service";

@Controller("client")
export class ClientController {
	constructor(private readonly clientService: ClientService) {}

	@Get("cpf/:cpf")
	findByDocumentNumber(@Param("cpf") cpf: string) {
		return this.clientService.findByDocumentNumber(cpf);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.clientService.findOne(+id);
	}
}
