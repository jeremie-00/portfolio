/*
  Warnings:

  - You are about to drop the column `sectionId` on the `Section` table. All the data in the column will be lost.
  - Added the required column `sectionId` to the `image` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Section" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "page" INTEGER NOT NULL,
    "order" INTEGER NOT NULL
);
INSERT INTO "new_Section" ("description", "id", "name", "order", "page") SELECT "description", "id", "name", "order", "page" FROM "Section";
DROP TABLE "Section";
ALTER TABLE "new_Section" RENAME TO "Section";
CREATE TABLE "new_image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "position" TEXT DEFAULT 'left',
    "sectionId" TEXT NOT NULL,
    CONSTRAINT "image_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_image" ("alt", "id", "position", "url") SELECT "alt", "id", "position", "url" FROM "image";
DROP TABLE "image";
ALTER TABLE "new_image" RENAME TO "image";
CREATE UNIQUE INDEX "image_sectionId_key" ON "image"("sectionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
