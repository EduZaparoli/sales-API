/*
  Warnings:

  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Client` table. All the data in the column will be lost.
  - The primary key for the `Installment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idInstallment` on the `Installment` table. All the data in the column will be lost.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Order` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `installmentId` to the `Installment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "clientId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "celular" TEXT NOT NULL
);
INSERT INTO "new_Client" ("celular", "cpf", "email", "nome") SELECT "celular", "cpf", "email", "nome" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_cpf_key" ON "Client"("cpf");
CREATE TABLE "new_Installment" (
    "installmentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "valor" REAL NOT NULL,
    "dataVencimento" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "Installment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("orderId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Installment" ("dataVencimento", "numero", "orderId", "status", "valor") SELECT "dataVencimento", "numero", "orderId", "status", "valor" FROM "Installment";
DROP TABLE "Installment";
ALTER TABLE "new_Installment" RENAME TO "Installment";
CREATE TABLE "new_Order" (
    "orderId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "qtd" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("clientId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("clientId", "nome", "qtd", "valor") SELECT "clientId", "nome", "qtd", "valor" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check("Client");
PRAGMA foreign_key_check("Installment");
PRAGMA foreign_key_check("Order");
PRAGMA foreign_keys=ON;
