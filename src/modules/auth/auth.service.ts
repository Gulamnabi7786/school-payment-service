// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AuthService {}










// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   constructor(private jwtService: JwtService) {}

//   async generateToken(payload: any) {
//     return this.jwtService.sign(payload);
//   }

//   async verifyToken(token: string) {
//     return this.jwtService.verify(token);
//   }
// }











// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { JwtService } from '@nestjs/jwt';
// import { Model } from 'mongoose';
// import * as bcrypt from 'bcryptjs';
// import { User, UserDocument } from './schemas/user.schema';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectModel(User.name) private userModel: Model<UserDocument>,
//     private jwtService: JwtService,
//   ) {}

//   async register(username: string, password: string) {
//     const hashed = await bcrypt.hash(password, 10);
//     const user = new this.userModel({ username, password: hashed });
//     return user.save();
//   }

//   async login(username: string, password: string) {
//     const user = await this.userModel.findOne({ username }).exec();
//     if (!user) throw new UnauthorizedException('User not found');

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) throw new UnauthorizedException('Invalid credentials');

//     const payload = { sub: user._id, username: user.username };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }











import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const existing = await this.userModel.findOne({ username }).exec();
    if (existing) {
      throw new UnauthorizedException('Username already taken');
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, password: hashed });
    return user.save();
  }

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user._id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
