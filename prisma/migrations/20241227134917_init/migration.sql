/*
  Warnings:

  - Added the required column `subtitle` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Section" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "page" INTEGER NOT NULL,
    "order" INTEGER NOT NULL
);
INSERT INTO "new_Section" ("description", "id", "name", "order", "page") SELECT "description", "id", "name", "order", "page" FROM "Section";
DROP TABLE "Section";
ALTER TABLE "new_Section" RENAME TO "Section";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
