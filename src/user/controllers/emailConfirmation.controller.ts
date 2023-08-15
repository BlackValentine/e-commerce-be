import {
    Controller,
    ClassSerializerInterceptor,
    UseInterceptors,
    Post,
    Body,
    Req,
} from '@nestjs/common';
import ConfirmEmailDto from '../dtos/confirmEmail.dto';
import EmailService from '../services/email.service';

@Controller('email-confirmation')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailConfirmationController {
    constructor(
        private readonly emailService: EmailService
    ) { }

    @Post('confirm')
    async confirm(@Body() confirmationData: ConfirmEmailDto) {
        const email = await this.emailService.decodeConfirmationToken(confirmationData.token);
        await this.emailService.confirmEmail(email);
    }

    @Post('resend-confirmation-link')
    async resendConfirmationLink(@Req() request: any) {
        await this.emailService.resendConfirmationLink(request.user.id);
    }
}