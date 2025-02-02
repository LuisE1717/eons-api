import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}
  async getMessages(
    type: string,
    language: string,
    hexResults: string[],
  ): Promise<string[]> {
    const messages: string[] = [];

    for (const [index, result] of hexResults.entries()) {
      const allMessage = await this.prisma.message.findMany({
        where: {
          type,
          language,
          segmentKey: String(index + 1),
        },
        orderBy: {
          id: 'asc',
        },
      });

      if (parseInt(result) > allMessage.length) {
        throw new NotFoundException(
          `Message number ${result} out of range for segment ${index + 1}`,
        );
      }

      messages.push(allMessage[parseInt(result) - 1].content);
    }

    return messages;
  }
}
