-- CreateEnum
CREATE TYPE "public"."paymentmethod" AS ENUM ('VA', 'TRANSFER_BANK');

-- CreateTable
CREATE TABLE "public"."blogs" (
    "blog_id" SERIAL NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "blog" TEXT NOT NULL,
    "images" TEXT,
    "author_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("blog_id")
);

-- CreateTable
CREATE TABLE "public"."hostelry_partner" (
    "hostelry_id" SERIAL NOT NULL,
    "hostelry_name" VARCHAR(100),
    "hostelry_address" VARCHAR(250),
    "hostelry_level" INTEGER,
    "hostelry_location" TEXT NOT NULL,

    CONSTRAINT "hostelry_partner_pkey" PRIMARY KEY ("hostelry_id")
);

-- CreateTable
CREATE TABLE "public"."order_package_tour" (
    "order_tour_package_id" SERIAL NOT NULL,
    "tour_package_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "number_of_guests" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_payment" DECIMAL NOT NULL,
    "payment_status" VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    "payment_method" INTEGER NOT NULL,
    "reference_number" VARCHAR(200) NOT NULL,
    "expired_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "order_package_tour_pkey" PRIMARY KEY ("order_tour_package_id")
);

-- CreateTable
CREATE TABLE "public"."package_tour_product" (
    "package_id" SERIAL NOT NULL,
    "name_package" VARCHAR(100),
    "cost" DECIMAL,
    "description" TEXT,
    "start_date" DATE,
    "end_date" DATE,
    "activities" JSON,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hostelry_partner_id" INTEGER,
    "quota" INTEGER NOT NULL,

    CONSTRAINT "package_tour_product_pkey" PRIMARY KEY ("package_id")
);

-- CreateTable
CREATE TABLE "public"."payment_order_package_transaction" (
    "payment_package_id" SERIAL NOT NULL,
    "order_package_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_status" VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    "reference_number" VARCHAR(50) NOT NULL,
    "trigger_source" VARCHAR(50) NOT NULL,

    CONSTRAINT "payment_order_package_transaction_pkey" PRIMARY KEY ("payment_package_id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "password" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL,
    "email" VARCHAR(200) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."payment_methods" (
    "code" VARCHAR(30) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "type" "public"."paymentmethod" NOT NULL,
    "destination_account" VARCHAR(50) NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "payment_methods_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("payment_methods_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_package_tour_reference_number_key" ON "public"."order_package_tour"("reference_number");

-- CreateIndex
CREATE UNIQUE INDEX "username_unique" ON "public"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "payment_methods_code_key" ON "public"."payment_methods"("code");

-- AddForeignKey
ALTER TABLE "public"."blogs" ADD CONSTRAINT "blogs_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."order_package_tour" ADD CONSTRAINT "order_package_tour_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."order_package_tour" ADD CONSTRAINT "order_package_tour_payment_method_fkey" FOREIGN KEY ("payment_method") REFERENCES "public"."payment_methods"("payment_methods_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."order_package_tour" ADD CONSTRAINT "order_package_tour_tour_package_id_fkey" FOREIGN KEY ("tour_package_id") REFERENCES "public"."package_tour_product"("package_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."package_tour_product" ADD CONSTRAINT "fk_hostelry_partner" FOREIGN KEY ("hostelry_partner_id") REFERENCES "public"."hostelry_partner"("hostelry_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."payment_order_package_transaction" ADD CONSTRAINT "payment_order_package_transaction_order_package_id_fkey" FOREIGN KEY ("order_package_id") REFERENCES "public"."order_package_tour"("order_tour_package_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
