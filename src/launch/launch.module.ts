import { Module } from '@nestjs/common';
import { LaunchService } from './launch.service';
import { LaunchController } from './launch.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WebsocketModule } from 'src/websockets/websocket.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  controllers: [LaunchController],
  providers: [LaunchService],
  imports: [PrismaModule, WebsocketModule, NotificationsModule],
})
export class LaunchModule {}
