import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/payment')
  payment(@Body() req: any) {
    // console.log(req);
    return this.appService.payment(req);
  }

  @Post('/callback')
  paymentCallback(@Body() req: any) {
    // console.log(1);
    
    return this.appService.paymentCallback(req);
  }

  @Post('/check-status-transaction')
  check(@Body() req: any) {
    return this.appService.check(req);
  }
}
