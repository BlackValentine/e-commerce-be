import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";

@Injectable()
export class PaymentService {
    private stripe: Stripe

    constructor(private configService: ConfigService) {
        this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2022-11-15'
        });
    }

    public async createCustomer(name: string, email: string) {
        return this.stripe.customers.create({
            name,
            email
        });
    }

    async createPaymentIntent(total: number) {
        const paymentIntent = await this.stripe.paymentIntents.create({
            currency: this.configService.get('STRIPE_CURRENCY'),
            amount: total,
            automatic_payment_methods: {
                enabled: true
            }
        })
        return {
            clientSecret: paymentIntent.client_secret
        }
    }
}