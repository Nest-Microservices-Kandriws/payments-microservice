import Stripe from "stripe";
import { PaymentStrategy } from "./payment-strategy.interface";
import { envs, NAST_SERVICE } from "src/config";
import { PaymentSessionDto } from "../dto";
import { Request, Response } from "express";
import { Inject, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

export class StripePaymentStrategy implements PaymentStrategy {

    private readonly stripe = new Stripe(envs.STRIPE_SECRET_KEY, {});
    private readonly logger = new Logger(StripePaymentStrategy.name);
    constructor(
        private readonly client: ClientProxy // Inyección a través del constructor
    ) { }
    async createPaymentIntent(paymentSessionDto: PaymentSessionDto) {
        const { currency, items, orderId } = paymentSessionDto;

        const lineItems = items.map((item) => {
            return {
                price_data: {
                    currency,
                    product_data: {
                        name: item.name
                    },
                    unit_amount: Math.round(item.price * 100)
                },
                quantity: item.quantity
            }
        });

        const session = await this.stripe.checkout.sessions.create({
            payment_intent_data: {
                metadata: {
                    orderId
                }
            },
            line_items: lineItems,
            mode: 'payment',
            success_url: envs.STRIPE_SUCCESS_URL,
            cancel_url: envs.STRIPE_CANCEL_URL
        });

        return {
            cancelUrl: session.cancel_url,
            successUrl: session.success_url,
            url: session.url
        };
    }
    success(): void {
        //throw new Error("Method not implemented.");
    }
    cancel(): void {
        //throw new Error("Method not implemented.");
    }
    webhook(req: Request, res: Response): any {
        const signature = req.headers['stripe-signature'];

        const endpointSecret = envs.STRIPE_ENDPOINT_SECRET;

        let event: Stripe.Event;

        try {
            event = this.stripe.webhooks.constructEvent(req['rawBody'], signature, endpointSecret);

        } catch (error) {
            res.status(400).send(`Webhook Error: ${error.message}`);
            return;
        }

        switch (event.type) {
            case 'charge.succeeded':
                const chargeSucceeded: Stripe.Charge = event.data.object;
                const payload = {
                    stripePaymentId: chargeSucceeded.id,
                    orderId: chargeSucceeded.metadata.orderId,
                    receiptUrl: chargeSucceeded.receipt_url
                }

                console.log(payload);
                this.client.emit('paymentSucceeded', payload);

                break;
            default:
                console.log(`Unhandled event type ${event.type}.`);
        }

        return res.status(200).json({ received: true, signature });
    }
}
