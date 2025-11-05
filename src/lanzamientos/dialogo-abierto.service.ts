// src/lanzamientos/dialogo-abierto.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DialogoAbiertoService {
  constructor(private prisma: PrismaService) {}

  // Determinar el sistema a usar basado en los primeros 2 lanzamientos
  async determinarSistema(lanzamiento1: number, lanzamiento2: number): Promise<{
    sistema: any;
    necesitaSistemita: boolean;
    sistemitaNumero?: number;
  }> {
    const codigoLanzamiento = `${lanzamiento1}${lanzamiento2}`;
    
    // Mapeo según las instrucciones
    const mapeoSistemas = {
      '11': { sistema: 'sistema_principal', necesitaSistemita: false },
      '12': { sistema: 'sistema_principal', necesitaSistemita: true, sistemitaNumero: 1 },
      '13': { sistema: 'sistema_principal', necesitaSistemita: false },
      '14': { sistema: 'sistema_principal', necesitaSistemita: true, sistemitaNumero: 2 },
      '21': { sistema: 'sistema_principal', necesitaSistemita: false },
      '22': { sistema: 'sistema_principal', necesitaSistemita: true, sistemitaNumero: 3 },
      '23': { sistema: 'sistema_principal', necesitaSistemita: false },
      '24': { sistema: 'sistema_principal', necesitaSistemita: true, sistemitaNumero: 4 },
      '31': { sistema: 'sistema_principal', necesitaSistemita: false },
      '32': { sistema: 'sistema_principal', necesitaSistemita: true, sistemitaNumero: 5 },
      '33': { sistema: 'sistema_principal', necesitaSistemita: false },
      '34': { sistema: 'sistema_principal', necesitaSistemita: true, sistemitaNumero: 6 },
      '41': { sistema: 'sistema_principal', necesitaSistemita: false },
      '42': { sistema: 'sistema_principal', necesitaSistemita: true, sistemitaNumero: 7 },
      '43': { sistema: 'sistema_principal', necesitaSistemita: false },
      '44': { sistema: 'sistema_principal', necesitaSistemita: true, sistemitaNumero: 8 },
    };

    return mapeoSistemas[codigoLanzamiento] || { sistema: 'sistema_principal', necesitaSistemita: false };
  }

  // Obtener resultado de 3 lanzamientos
  async obtenerResultado3Lanzamientos(secuencia: string): Promise<{
    resultadoNumero: number;
    resultadoTexto: string;
    interpretacion: string;
  }> {
    // Primero obtener el sistema por su código - CORREGIDO: usar SistemaLanzamiento
    const sistema = await this.prisma.sistemaLanzamiento.findFirst({
      where: { codigo: 'sistema_principal' }
    });

    if (!sistema) {
      // Resultado por defecto si no se encuentra el sistema
      return {
        resultadoNumero: 1,
        resultadoTexto: "El universo se encuentra en un estado de fluir constante. Tus energías se alinean con las fuerzas cósmicas, indicando un período de transformación y crecimiento. Confía en el proceso y mantén tu corazón abierto a las señales que el cosmos te envía.",
        interpretacion: "Este patrón sugiere que estás en sintonía con el flujo universal. Las oportunidades se presentarán de manera natural si mantienes una actitud receptiva y positiva."
      };
    }

    const resultado = await this.prisma.lanzamientoSistema.findFirst({
      where: {
        sistemaId: sistema.id,
        secuencia: secuencia
      }
    });

    if (!resultado) {
      // Resultado por defecto si no se encuentra
      return {
        resultadoNumero: 1,
        resultadoTexto: "El universo se encuentra en un estado de fluir constante. Tus energías se alinean con las fuerzas cósmicas, indicando un período de transformación y crecimiento. Confía en el proceso y mantén tu corazón abierto a las señales que el cosmos te envía.",
        interpretacion: "Este patrón sugiere que estás en sintonía con el flujo universal. Las oportunidades se presentarán de manera natural si mantienes una actitud receptiva y positiva."
      };
    }

    return {
      resultadoNumero: resultado.resultado_numero,
      resultadoTexto: resultado.resultado_texto,
      interpretacion: resultado.interpretacion
    };
  }

  // Obtener resultado de sistemita
  async obtenerSistemita(numero: number, secuencia: string): Promise<{
    resultadoTexto: string;
    interpretacion: string;
  }> {
    // Primero obtener el sistema por su código - CORREGIDO: usar SistemaLanzamiento
    const sistema = await this.prisma.sistemaLanzamiento.findFirst({
      where: { codigo: 'sistema_principal' }
    });

    if (!sistema) {
      // Resultado por defecto
      return {
        resultadoTexto: "El sistemita adicional revela capas profundas de tu conexión cósmica. Información adicional se está desplegando para guiarte en tu camino actual.",
        interpretacion: "Este sistemita complementario enfatiza la necesidad de prestar atención a los detalles y señales sutiles en tu entorno."
      };
    }

    const sistemita = await this.prisma.sistemita.findFirst({
      where: {
        sistemaId: sistema.id,
        numero: numero,
        secuencia: secuencia
      }
    });

    if (!sistemita) {
      // Resultado por defecto
      return {
        resultadoTexto: "El sistemita adicional revela capas profundas de tu conexión cósmica. Información adicional se está desplegando para guiarte en tu camino actual.",
        interpretacion: "Este sistemita complementario enfatiza la necesidad de prestar atención a los detalles y señales sutiles en tu entorno."
      };
    }

    return {
      resultadoTexto: sistemita.resultado_texto,
      interpretacion: sistemita.interpretacion
    };
  }

  // Procesar secuencia completa de lanzamientos
  async procesarSecuenciaCompleta(lanzamientos: number[], userId: string): Promise<any> {
    try {
        console.log('Procesando secuencia completa:', lanzamientos);
        
        if (lanzamientos.length < 5) {
            throw new Error('Se requieren al menos 5 lanzamientos para el modo diálogo abierto');
        }

        // Primeros 2 lanzamientos determinan el sistema
        const primerLanzamiento = lanzamientos[0];
        const segundoLanzamiento = lanzamientos[1];
        
        console.log('Lanzamientos para determinar sistema:', primerLanzamiento, segundoLanzamiento);
        
        const sistemaInfo = await this.determinarSistema(primerLanzamiento, segundoLanzamiento);
        console.log('Sistema determinado:', sistemaInfo);
        
        // CORRECCIÓN: Usar los lanzamientos 2, 3, 4 (índices 1, 2, 3)
        const lanzamientosPrincipales = lanzamientos.slice(1, 4);
        const secuenciaPrincipal = lanzamientosPrincipales.join('');
        
        console.log('Secuencia de 3 lanzamientos principales:', secuenciaPrincipal);
        
        const resultadoPrincipal = await this.obtenerResultado3Lanzamientos(secuenciaPrincipal);
        console.log('Resultado principal:', resultadoPrincipal);
        
        let resultadoFinal = resultadoPrincipal.resultadoTexto;
        let interpretacionFinal = resultadoPrincipal.interpretacion;
        let sistemitaResultado = null;

        // Si necesita sistemita, procesar el lanzamiento adicional (índice 4)
        if (sistemaInfo.necesitaSistemita && lanzamientos.length >= 6) {
            const lanzamientoSistemita = lanzamientos[4]; // Índice 4, no 5
            const secuenciaSistemita = lanzamientoSistemita.toString();

            console.log('Procesando sistemita:', sistemaInfo.sistemitaNumero, secuenciaSistemita);
            
            sistemitaResultado = await this.obtenerSistemita(sistemaInfo.sistemitaNumero, secuenciaSistemita);
            console.log('Resultado del sistemita:', sistemitaResultado);

            resultadoFinal += ` ${sistemitaResultado.resultadoTexto}`;
            interpretacionFinal += ` ${sistemitaResultado.interpretacion}`;
        }

        // Guardar resultado en base de datos
        console.log('Guardando resultado en BD...');
        const resultadoGuardado = await this.prisma.resultadoDialogoAbierto.create({
            data: {
            usuarioId: userId,
            lanzamiento1: `${primerLanzamiento}${segundoLanzamiento}`, // Código del sistema
            lanzamiento2: secuenciaPrincipal, // Secuencia principal
            sistemaUsado: sistemaInfo.sistema,
            resultadoFinal: resultadoFinal,
            resultados: JSON.stringify({
                principal: resultadoPrincipal,
                sistemita: sistemitaResultado,
                interpretacionFinal: interpretacionFinal
            }),
            },
        });

        console.log('Resultado guardado con ID:', resultadoGuardado.id);

      return {
        success: true,
        data: {
          id: resultadoGuardado.id,
          resultadoFinal: resultadoFinal,
          interpretacion: interpretacionFinal,
          sistemaUsado: sistemaInfo.sistema,
          detalles: {
            principal: resultadoPrincipal,
            sistemita: sistemitaResultado,
          },
        },
      };
    } catch (error) {
      console.error('Error en procesarSecuenciaCompleta:', error);
      throw new Error(`Error procesando secuencia: ${error.message}`);
    }
  }

  // Convertir array de coins a número (1-4)
  private convertirCoinsANumero(coins: number[]): number {
    // Asignación según las instrucciones:
    // 1: [1, 1] - Círculo grande blanco y Círculo pequeño blanco
    // 2: [1, 0] - Círculo pequeño blanco y Círculo grande negro
    // 3: [0, 1] - Círculo pequeño negro y Círculo grande blanco
    // 4: [0, 0] - Círculo pequeño negro y Círculo grande negro
    
    if (coins[0] === 1 && coins[1] === 1) return 1;
    if (coins[0] === 1 && coins[1] === 0) return 2;
    if (coins[0] === 0 && coins[1] === 1) return 3;
    if (coins[0] === 0 && coins[1] === 0) return 4;
    
    return 1; // Por defecto
  }
}
