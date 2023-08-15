import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import VerificationTokenPayload from '../interface/verificationTokenPayload.interface';
import { UserService } from './user.service';

@Injectable()
export default class EmailService {
    private nodemailerTransport: Mail;

    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {
        this.nodemailerTransport = createTransport({
            service: this.configService.get('EMAIL_SERVICE'),
            auth: {
                user: this.configService.get('EMAIL_USER'),
                pass: this.configService.get('EMAIL_PASSWORD'),
            }
        });
    }

    sendMail(options: Mail.Options) {
        return this.nodemailerTransport.sendMail(options);
    }

    sendVerificationLink(email: string) {
        const payload: VerificationTokenPayload = { email };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`
        });

        const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;

        const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

        return this.sendMail({
            to: email,
            subject: 'Email confirmation',
            text,
        })
    }

    public async confirmEmail(email: string) {
        const user = await this.userService.findByEmail(email);
        if (user.isActive) {
            throw new HttpException('Email already confirmed', HttpStatus.BAD_REQUEST);
        }
        await this.userService.markEmailAsConfirmed(email);
    }

    public async decodeConfirmationToken(token: string) {
        try {
            const payload = await this.jwtService.verify(token, {
                secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            });

            if (typeof payload === 'object' && 'email' in payload) {
                return payload.email;
            }
            throw new BadRequestException();
        } catch (error) {
            if (error?.name === 'TokenExpiredError') {
                throw new HttpException('Email confirmation token expired', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Bad confirmation token', HttpStatus.BAD_REQUEST);
        }
    }

    public async resendConfirmationLink(userId: number) {
        const user = await this.userService.findById(userId);
        if (user.isActive) {
            throw new HttpException('Email already confirmed', HttpStatus.BAD_REQUEST);
        }
        await this.sendVerificationLink(user.email);
    }
}