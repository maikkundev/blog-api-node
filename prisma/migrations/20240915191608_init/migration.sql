-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "details" VARCHAR(10000) NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);
