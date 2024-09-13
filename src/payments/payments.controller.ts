import { Body, Controller, Get, Post, Request as Req, Response as Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto';
import { Request, Response } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post('create-payment-session')
  createPaymentSession(@Body() paymentSessionDto: PaymentSessionDto) {
    return this.paymentsService.createPaymentSession(paymentSessionDto);
  }

  @Get('success')
  success() {
    //throw new Error('Method not implemented.');
  }

  @Get('cancel')
  cancel() {
    //throw new Error('Method not implemented.');
  }

  @Post('webhook')
  async webhook(@Req() req: Request, @Res() res: Response) {
    return this.paymentsService.webhook(req, res);
  }
}
