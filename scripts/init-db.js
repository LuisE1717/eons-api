const { execSync } = require('child_process');

console.log('🏗️  Iniciando configuración de la base de datos...');

try {
  console.log('📦 Generando cliente de Prisma...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  console.log('🚀 Aplicando esquema a la base de datos...');
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });

  console.log('✅ Configuración de base de datos completada exitosamente');
} catch (error) {
  console.error('❌ Error en la configuración de la base de datos:', error);
  process.exit(1);
}