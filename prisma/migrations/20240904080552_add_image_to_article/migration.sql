-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'user';
