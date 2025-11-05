-- CreateTable
CREATE TABLE "public"."espiritu" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR,
    "descripcion" VARCHAR,
    "foto" VARCHAR,
    "id_usuario" TEXT,
    "descripcion_sistema" VARCHAR,

    CONSTRAINT "espiritu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pregunta" (
    "id" SERIAL NOT NULL,
    "descripcion" VARCHAR,
    "respuesta" VARCHAR,
    "id_usuario" VARCHAR,
    "fecha" DATE,
    "tipo" VARCHAR,
    "favorito" BOOLEAN DEFAULT false,

    CONSTRAINT "pregunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."respuesta" (
    "respuesta" VARCHAR,
    "id" VARCHAR NOT NULL,

    CONSTRAINT "respuesta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."usuario" (
    "email" VARCHAR NOT NULL,
    "password" VARCHAR,
    "id" TEXT NOT NULL,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "type" VARCHAR NOT NULL,
    "esencia" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."moneda" (
    "id" INTEGER NOT NULL,
    "descripcion" VARCHAR,

    CONSTRAINT "moneda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."respuesta_dia" (
    "id" VARCHAR NOT NULL,
    "respuesta" VARCHAR,

    CONSTRAINT "respuesta_dia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."respuesta_especial" (
    "id" VARCHAR NOT NULL,
    "respuesta" VARCHAR,

    CONSTRAINT "respuesta_especial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."esencia" (
    "id" SERIAL NOT NULL,
    "precio" VARCHAR,
    "descripcion" VARCHAR,
    "descuento" INTEGER DEFAULT 0,

    CONSTRAINT "esencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."respuesta_predialogo" (
    "respuesta" VARCHAR,
    "id" VARCHAR NOT NULL,

    CONSTRAINT "respuesta_predialogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."respuesta_general1" (
    "id" VARCHAR NOT NULL,
    "respuesta" VARCHAR,

    CONSTRAINT "respuesta_general1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."respuesta_general2" (
    "id" VARCHAR NOT NULL,
    "respuesta" VARCHAR,

    CONSTRAINT "respuesta_general2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."respuesta_general3" (
    "id" VARCHAR NOT NULL,
    "respuesta" VARCHAR,

    CONSTRAINT "respuesta_general3_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."respuesta_general4" (
    "id" VARCHAR NOT NULL,
    "respuesta" VARCHAR,

    CONSTRAINT "respuesta_general4_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."evaluacion_general" (
    "id" SERIAL NOT NULL,
    "user_id" VARCHAR NOT NULL,
    "respuesta_general1" VARCHAR,
    "respuesta_general2" VARCHAR,
    "respuesta_general3" VARCHAR,
    "respuesta_general4" VARCHAR,

    CONSTRAINT "evaluacion_general_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."transferencia" (
    "id" SERIAL NOT NULL,
    "user_id" VARCHAR,
    "receiver" VARCHAR,
    "amount" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transferencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."compra" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bank_order" VARCHAR,

    CONSTRAINT "compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notificaciones" (
    "id" SERIAL NOT NULL,
    "id_usuario" VARCHAR,
    "descripcion" VARCHAR,
    "estado" BOOLEAN DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombre" VARCHAR,
    "tipo" VARCHAR,

    CONSTRAINT "notificaciones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "public"."usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_unique" ON "public"."evaluacion_general"("user_id");

-- AddForeignKey
ALTER TABLE "public"."espiritu" ADD CONSTRAINT "id_usuario" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pregunta" ADD CONSTRAINT "id_usuario" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."evaluacion_general" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "public"."usuario"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."transferencia" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "public"."usuario"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."notificaciones" ADD CONSTRAINT "notificaciones_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
