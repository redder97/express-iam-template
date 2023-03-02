-- AlterTable
ALTER TABLE "User" ADD COLUMN     "providerId" TEXT,
ALTER COLUMN "username" DROP NOT NULL;
