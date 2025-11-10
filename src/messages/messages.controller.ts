import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('translate')
  async translateMessages(@Body() body: any) {
    const { type, language, hexResults } = body;

    if (!type || !language || !hexResults) {
      throw new BadRequestException('Missing required fields');
    }

    return this.messagesService.getMessages(type, language, hexResults);
  }
}
