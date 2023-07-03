import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { TopUpNotifyDto } from './dto/top-up.dto';
import { HmacGuard } from './guards/hmac.guard';
import { AppService } from './app.service';
import { DecodeBase64 } from './decorators/decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appGateway: AppGateway,
    private readonly appService: AppService,
  ) {}

  @Post('/notify/top-up')
  @HttpCode(HttpStatus.OK)
  @UseGuards(HmacGuard)
  pushTopUpNotify(@DecodeBase64('data') data: TopUpNotifyDto) {
    return this.appGateway.pushTopUpNotify(data);
  }

  @Post('/hello-world')
  @HttpCode(HttpStatus.OK)
  @UseGuards(HmacGuard)
  helloWorld(@DecodeBase64('data') data: TopUpNotifyDto) {
    console.log(data.tran_id);
    return {
      status: 'success',
      code: 0,
      data: data,
    };
  }

  // @Post('/create-hmac')
  // createHmac(@Body() data: any) {
  //   return this.appService.createHmacHash(data);
  // }

  // @HttpCode(200)
  // @Get('/client')
  // client() {
  //   return this.appGateway.client();
  // }
}
