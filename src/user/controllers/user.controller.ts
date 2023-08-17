import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, LoginUserDto } from '../dtos/user.dto';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import EmailService from '../services/email.service';
import { PaymentService } from 'src/payment/services/payment.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
    private readonly paymentService: PaymentService
  ) {}

  @Get('profile')
  @UseGuards(AuthGuard())
  async getProfile(@Req() req: any) {
    return req.user;
  }

  @Post()
  async createNewUser(@Body() user: CreateUserDto) {
    const response = this.userService.createNewUser(user);
    await this.emailService.sendVerificationLink(user.email);
    return response;
  }

  @Post('login')
  login(@Body() { email, password }: LoginUserDto) {
    return this.authService.login({ email, password });
  }
}
