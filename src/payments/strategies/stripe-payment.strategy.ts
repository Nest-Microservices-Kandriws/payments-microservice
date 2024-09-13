import Stripe from "stripe";
import { PaymentStrategy } from "./payment-strategy.interface";
import { envs } from "src/config";
import { PaymentSessionDto } from "../dto";
import { Request, Response } from "express";

export class StripePaymentStrategy implements PaymentStrategy {

    private readonly stripe = new Stripe(envs.STRIPE_SECRET_KEY, {});
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
            success_url: 'http://localhost:3003/payments/success',
            cancel_url: 'http://localhost:3003/payments/cancel'
        });

        return session;
    }
    success(): void {
        //throw new Error("Method not implemented.");
    }
    cancel(): void {
        //throw new Error("Method not implemented.");
    }
    webhook(req: Request, res: Response): any {
        const signature = req.headers['stripe-signature'];

        const endpointSecretTesting = "whsec_b8b0d7884e0c6b84a0e3a9303144b755bfcebf141304abc1b54e153ec535a7a0";
        const endpointSecret = "whsec_5sobYQst0X7aToAFlg1yvAuCHBF1TvFj";
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
                // TODO:  call to microservice
                console.log({
                    metadata: chargeSucceeded.metadata,
                    orderId: chargeSucceeded.metadata.orderId
                });
                break;
            default:
                console.log(`Unhandled event type ${event.type}.`);
        }

        return res.status(200).json({ received: true, signature });
    }
}
