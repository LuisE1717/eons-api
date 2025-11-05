-- AlterTable
ALTER TABLE "public"."usuario" ADD COLUMN     "hasSeenInstructions" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "readDocumentation" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "public"."launch" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "shortType" TEXT NOT NULL,
    "hexResults" TEXT[],
    "steps" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "launch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."message" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "segmentKey" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LanzamientoSistema" (
    "id" SERIAL NOT NULL,
    "secuencia" VARCHAR(255) NOT NULL,
    "resultado_numero" INTEGER NOT NULL,
    "resultado_texto" TEXT NOT NULL,
    "interpretacion" TEXT NOT NULL,
    "sistemaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LanzamientoSistema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ResultadoDialogoAbierto" (
    "id" UUID NOT NULL,
    "usuarioId" VARCHAR(255) NOT NULL,
    "lanzamiento1" VARCHAR(255) NOT NULL,
    "lanzamiento2" VARCHAR(255) NOT NULL,
    "sistemaUsado" VARCHAR(255) NOT NULL,
    "resultados" JSONB NOT NULL,
    "resultadoFinal" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResultadoDialogoAbierto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SistemaLanzamiento" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(255) NOT NULL,
    "nombre" VARCHAR(255),
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SistemaLanzamiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sistemita" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "secuencia" VARCHAR(255) NOT NULL,
    "resultado_texto" TEXT NOT NULL,
    "interpretacion" TEXT NOT NULL,
    "sistemaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sistemita_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LanzamientoSistema_sistemaId_secuencia_key" ON "public"."LanzamientoSistema"("sistemaId", "secuencia");

-- CreateIndex
CREATE UNIQUE INDEX "SistemaLanzamiento_codigo_key" ON "public"."SistemaLanzamiento"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Sistemita_sistemaId_numero_secuencia_key" ON "public"."Sistemita"("sistemaId", "numero", "secuencia");

-- AddForeignKey
ALTER TABLE "public"."launch" ADD CONSTRAINT "launch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LanzamientoSistema" ADD CONSTRAINT "LanzamientoSistema_sistemaId_fkey" FOREIGN KEY ("sistemaId") REFERENCES "public"."SistemaLanzamiento"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ResultadoDialogoAbierto" ADD CONSTRAINT "ResultadoDialogoAbierto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuario"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Sistemita" ADD CONSTRAINT "Sistemita_sistemaId_fkey" FOREIGN KEY ("sistemaId") REFERENCES "public"."SistemaLanzamiento"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
