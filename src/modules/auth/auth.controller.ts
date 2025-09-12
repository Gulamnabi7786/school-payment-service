// import { Controller } from '@nestjs/common';

// @Controller('auth')
// export class AuthController {}










// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('login')
//   async login(@Body() body: { username: string; password: string }) {
//     // for now, we skip DB validation → just demo
//     const payload = { username: body.username };
//     return {
//       access_token: await this.authService.generateToken(payload),
//     };
//   }
// }









// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   async register(@Body() body: { username: string; password: string }) {
//     return this.authService.register(body.username, body.password);
//   }

//   @Post('login')
//   async login(@Body() body: { username: string; password: string }) {
//     return this.authService.login(body.username, body.password);
//   }
// }













import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }
}