-- CreateTable
CREATE TABLE "TextNotation" (
    "id" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "type" TEXT,
    "text" TEXT,
    "textNotation" TEXT,

    CONSTRAINT "TextNotation_pkey" PRIMARY KEY ("id")
);
