import { StripePaymentStrategy } from '../strategies/stripe-payment.strategy';
import { PaymentStrategy } from '../strategies/payment-strategy.interface';
import { envs } from 'src/config';
import { NotImplementedException } from '@nestjs/common';
import { NAST_SERVICE, PAYMENT_STRATEGY } from 'src/config/services';
import { ClientProxy } from '@nestjs/microservices';

export const PaymentStrategyFactory = {
    provide: PAYMENT_STRATEGY,
    useFactory: (client: ClientProxy): PaymentStrategy => {
        const provider = envs.PAYMENT_PROVIDER;

        switch (provider) {
            case 'stripe':
                return new StripePaymentStrategy(client);
            case 'paypal':
                throw new NotImplementedException('Paypal is still not implemented');
            case 'payu':
                throw new NotImplementedException('Payu is still not implemented');
            default:
                throw new Error(`Provider ${provider} is not supported`);
        }
    },
    inject: [NAST_SERVICE],
};
