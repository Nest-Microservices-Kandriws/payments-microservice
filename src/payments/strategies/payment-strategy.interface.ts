import { Request, Response } from "express";
import { PaymentSessionDto } from "../dto";

export interface PaymentStrategy {
    createPaymentIntent(paymentSessionDto: PaymentSessionDto): Promise<any>;
    success(): void;
    cancel(): void;
    webhook(req: Request, res: Response): any;
}