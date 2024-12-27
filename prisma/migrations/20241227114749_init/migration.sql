-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Section" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "page" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "sectionId" TEXT NOT NULL,
    CONSTRAINT "Section_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "image" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Section" ("description", "id", "name", "order", "page", "sectionId") SELECT "description", "id", "name", "order", "page", "sectionId" FROM "Section";
DROP TABLE "Section";
ALTER TABLE "new_Section" RENAME TO "Section";
CREATE UNIQUE INDEX "Section_sectionId_key" ON "Section"("sectionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
