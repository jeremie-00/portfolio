-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "position" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "page" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "sectionId" TEXT NOT NULL,
    CONSTRAINT "Section_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Section_sectionId_key" ON "Section"("sectionId");
