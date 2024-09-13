import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentStrategyFactory } from './factories/payment-strategy.factory';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentStrategyFactory],
})
export class PaymentsModule { }
