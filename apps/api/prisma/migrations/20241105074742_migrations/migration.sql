-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "projectevents";

-- CreateTable
CREATE TABLE "projectevents"."Users" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "projectevents"."Events" (
    "event_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "stock" TEXT NOT NULL,
    "image" TEXT,
    "venue" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discounted_price" DOUBLE PRECISION NOT NULL,
    "created_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "projectevents"."Transactions" (
    "transaction_id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "couponId" INTEGER,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "projectevents"."Payments" (
    "payment_id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "payment_type" TEXT NOT NULL,
    "payment_amount" DOUBLE PRECISION NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "projectevents"."Coupons" (
    "coupon_id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "discount_percentage" INTEGER NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER NOT NULL,

    CONSTRAINT "Coupons_pkey" PRIMARY KEY ("coupon_id")
);

-- CreateTable
CREATE TABLE "projectevents"."Bookings" (
    "booking_id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "number_of_tickets" INTEGER NOT NULL,
    "booking_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("booking_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "projectevents"."Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_transaction_id_key" ON "projectevents"."Payments"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "Coupons_code_key" ON "projectevents"."Coupons"("code");

-- AddForeignKey
ALTER TABLE "projectevents"."Events" ADD CONSTRAINT "Events_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "projectevents"."Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectevents"."Transactions" ADD CONSTRAINT "Transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "projectevents"."Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectevents"."Transactions" ADD CONSTRAINT "Transactions_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "projectevents"."Events"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectevents"."Transactions" ADD CONSTRAINT "Transactions_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "projectevents"."Coupons"("coupon_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectevents"."Payments" ADD CONSTRAINT "Payments_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "projectevents"."Transactions"("transaction_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectevents"."Coupons" ADD CONSTRAINT "Coupons_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "projectevents"."Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectevents"."Bookings" ADD CONSTRAINT "Bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "projectevents"."Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectevents"."Bookings" ADD CONSTRAINT "Bookings_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "projectevents"."Events"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;
