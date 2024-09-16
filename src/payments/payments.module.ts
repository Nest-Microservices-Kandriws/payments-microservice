import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentStrategyFactory } from './factories/payment-strategy.factory';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentStrategyFactory],
  imports: [NatsModule],
})
export class PaymentsModule { }
