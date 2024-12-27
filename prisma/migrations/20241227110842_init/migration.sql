-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "position" TEXT DEFAULT 'left'
);
INSERT INTO "new_image" ("alt", "id", "position", "url") SELECT "alt", "id", "position", "url" FROM "image";
DROP TABLE "image";
ALTER TABLE "new_image" RENAME TO "image";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
