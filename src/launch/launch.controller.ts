import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LaunchService } from './launch.service';
import { AccessGuard } from 'src/auth/auth.guard';
import { JWTUser } from 'src/lib/jwt';

@Controller('launch')
export class LaunchController {
  constructor(private readonly launchService: LaunchService) {}

  @UseGuards(AccessGuard)
  @Post()
  async saveLaunch(@Request() req: { user: JWTUser }, @Body() body: any) {
    const userId = req.user.id;
    const { coinPositions, type, shortType } = body;

    if (!userId || !coinPositions || !type || !shortType) {
      throw new BadRequestException('Missing required fields');
    }

    if (!Array.isArray(coinPositions) || coinPositions.length === 0) {
      throw new BadRequestException('Invalid coin positions');
    }

    return this.launchService.saveLaunch(
      userId,
      coinPositions,
      type,
      shortType,
    );
  }

  // @Get()
  // findAll() {
  //   return this.launchService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.launchService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLaunchDto: UpdateLaunchDto) {
  //   return this.launchService.update(+id, updateLaunchDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.launchService.remove(+id);
  // }
}
