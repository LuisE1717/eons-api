CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "SistemaLanzamiento" (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(255),
    descripcion TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE "LanzamientoSistema" (
    id SERIAL PRIMARY KEY,
    secuencia VARCHAR(255) NOT NULL,
    "resultado_numero" INTEGER NOT NULL,
    "resultado_texto" TEXT NOT NULL,
    interpretacion TEXT NOT NULL,
    "sistemaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE ("sistemaId", secuencia),
    FOREIGN KEY ("sistemaId") REFERENCES "SistemaLanzamiento"(id) ON DELETE CASCADE
);


CREATE TABLE "Sistemita" (
    id SERIAL PRIMARY KEY,
    numero INTEGER NOT NULL,
    secuencia VARCHAR(255) NOT NULL,
    "resultado_texto" TEXT NOT NULL,
    interpretacion TEXT NOT NULL,
    "sistemaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE ("sistemaId", numero, secuencia),
    FOREIGN KEY ("sistemaId") REFERENCES "SistemaLanzamiento"(id) ON DELETE CASCADE
);


CREATE TABLE "ResultadoDialogoAbierto" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "usuarioId" VARCHAR(255) NOT NULL,
    lanzamiento1 VARCHAR(255) NOT NULL,
    lanzamiento2 VARCHAR(255) NOT NULL,
    "sistemaUsado" VARCHAR(255) NOT NULL,
    resultados JSONB NOT NULL,
    "resultadoFinal" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("usuarioId") REFERENCES usuario(id) ON DELETE CASCADE
);