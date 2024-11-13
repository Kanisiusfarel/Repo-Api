-- AlterTable
ALTER TABLE "projectevents"."Users" ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "google_id" TEXT,
ADD COLUMN     "refresh_token" TEXT;
