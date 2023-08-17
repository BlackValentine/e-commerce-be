import { Module } from "@nestjs/common";
import { PaymentController } from "./controllers/payment.controller";
import { PaymentService } from "./services/payment.service";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [],
    controllers: [PaymentController],
    providers: [PaymentService, ConfigService],
    exports: [PaymentService]
})
export class PaymentModule { }