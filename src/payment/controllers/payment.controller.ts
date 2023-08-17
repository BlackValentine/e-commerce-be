import { Controller, Post, Body } from "@nestjs/common";
import { PaymentService } from "../services/payment.service";

@Controller('/api/v1/payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post('/create-payment-intent')
    async createPaymentIntent(@Body() body: any) {
        console.log(body);
        return await this.paymentService.createPaymentIntent(1000);
    }
}