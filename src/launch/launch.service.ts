import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LaunchService {
  constructor(private prisma: PrismaService) {}
  private transformToHex(coinPositions: boolean[], steps: number): string[] {
    const ranges = this.calculateRanges(steps); // Define los rangos según la longitud
    const hexResults: string[] = [];

    let index = 0;
    for (const range of ranges) {
      const segment = coinPositions.slice(index, index + range); // Extrae el segmento
      const binary = segment.map((value) => (value ? '1' : '0')).join(''); // Convierte a binario
      const hex = parseInt(binary, 2).toString(16); // Convierte a hexadecimal
      hexResults.push(hex);
      index += range;
    }

    return hexResults;
  }

  // Transforma los lanzamientos a decimal
  private transformToDecimal(
    coinPositions: boolean[][],
    steps: number,
  ): string[] {
    const ranges = this.calculateRanges(steps);
    const decimalResults: string[] = [];

    let index = 0;
    for (const range of ranges) {
      const segment = coinPositions.slice(index, index + range);
      const binary = segment
        .flatMap((coin) => coin.map((c) => (c ? '1' : '0')))
        .join('');

      const decimal = parseInt(binary, 2) + 1;
      const maxPossibleValue = Math.pow(2, binary.length);

      decimalResults.push(Math.min(decimal, maxPossibleValue).toString());

      index += range;
    }

    return decimalResults;
  }

  private calculateRanges(steps: number): number[] {
    switch (steps) {
      case 7:
        return [1, 4, 2];
      case 11:
        return [3, 3, 2, 3];
      default:
        throw new BadRequestException('Unsupported steps length');
    }
  }

  // Guarda el lanzamiento en la base de datos
  async saveLaunch(
    userId: string,
    coinPositions: boolean[][],
    type: string,
    shortType: string,
  ) {
    const steps = coinPositions.length;
    // const hexResults = this.transformToHex(coinPositions, steps);
    const decimalResults = this.transformToDecimal(coinPositions, steps);

    return this.prisma.launch.create({
      data: {
        userId,
        type,
        shortType,
        steps,
        hexResults: decimalResults,
      },
    });
  }
}
