import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.stratregy';
import EmailService from './services/email.service';
import { AuthController } from './controllers/auth.controller';
import { EmailConfirmationController } from './controllers/emailConfirmation.controller';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: {
                expiresIn: process.env.EXPIRESIN,
            },
        }),
        PaymentModule
    ],
    controllers: [UserController, AuthController, EmailConfirmationController],
    providers: [UserService, AuthService, ConfigService, JwtStrategy, EmailService],
    exports: [TypeOrmModule],
})
export class UserModule { }