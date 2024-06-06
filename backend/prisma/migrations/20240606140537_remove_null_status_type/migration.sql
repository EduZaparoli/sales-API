/*
  Warnings:

  - Made the column `status` on table `Installment` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Installment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "purchaseId" INTEGER NOT NULL,
    "installmentNumber" INTEGER NOT NULL,
    "installmentValue" REAL NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "paymentDate" DATETIME,
    "status" TEXT NOT NULL,
    CONSTRAINT "Installment_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Installment" ("dueDate", "id", "installmentNumber", "installmentValue", "paymentDate", "purchaseId", "status") SELECT "dueDate", "id", "installmentNumber", "installmentValue", "paymentDate", "purchaseId", "status" FROM "Installment";
DROP TABLE "Installment";
ALTER TABLE "new_Installment" RENAME TO "Installment";
PRAGMA foreign_key_check("Installment");
PRAGMA foreign_keys=ON;
