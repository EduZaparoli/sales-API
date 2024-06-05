export class UpdateInstallmentsDto {
	installments: {
		id: number;
		installmentNumber: number;
		installmentValue: number;
		dueDate: string;
		paymentDate?: string;
	}[];
}
