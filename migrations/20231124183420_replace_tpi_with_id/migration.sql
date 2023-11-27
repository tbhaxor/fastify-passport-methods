/*
  Warnings:

  - The primary key for the `social_accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `thirdPartyId` on the `social_accounts` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_social_accounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "provider" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "social_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_social_accounts" ("id", "provider", "userId") SELECT "id", "provider", "userId" FROM "social_accounts";
DROP TABLE "social_accounts";
ALTER TABLE "new_social_accounts" RENAME TO "social_accounts";
CREATE UNIQUE INDEX "social_accounts_id_provider_key" ON "social_accounts"("id", "provider");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
