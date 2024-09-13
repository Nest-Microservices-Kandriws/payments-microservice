import { Inject, Injectable } from '@nestjs/common';
import { PaymentSessionDto } from './dto';
import { PaymentStrategy } from './strategies/payment-strategy.interface';
import { PAYMENT_STRATEGY } from 'src/config/services';
import { Request, Response } from 'express';

@Injectable()
export class PaymentsService {
    constructor(
        @Inject(PAYMENT_STRATEGY) private readonly paymentStrategy: PaymentStrategy,
    ) { }
    async createPaymentSession(paymentSessionDto: PaymentSessionDto) {
        return this.paymentStrategy.createPaymentIntent(paymentSessionDto);
    }

    async webhook(req: Request, res: Response) {
        return this.paymentStrategy.webhook(req, res);
    }
}
