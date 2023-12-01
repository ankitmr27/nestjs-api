import { Injectable } from '@nestjs/common';
import { CreateUserModelDto } from 'src/user-model/dto/create-user-model.dto';
import * as argon from 'argon2';
import { UserModelService } from 'src/user-model/user-model.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private readonly userModelService: UserModelService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signin(dto: CreateUserModelDto) {
    try {
      //find the user
      const user = await this.userModelService.findUser(dto);
      //if user is not found then show error
      if (!user) {
        return { message: 'User not found' };
      }
      const flag = await argon.verify(user.password, dto.password);
      //compare password and with hash password
      if (!flag) {
        return { message: 'invalid password' };
      }
      // if password does not match then show error
      return {
        message: 'signin successful',
        data: dto,
        access_token: await this.signToken(user.id, user.email),
      };
    } catch (error) {
      throw error;
    }
  }

  async signup(dto: CreateUserModelDto) {
    try {
      //generate hash password
      //console.log(dto);
      const hash = await argon.hash(dto.password);
      dto.password = hash.toString();
      //console.log(dto);
      // save the new user
      const user = await this.userModelService.create(dto);
      // return new user data
      //console.log(user);
      return {
        message: 'signup successful',
        data: {
          name: user.data.name,
          email: user.data.email,
        },
        access_token: await this.signToken(user.data.id, user.data.email),
      };
    } catch (error) {
      throw error;
    }
  }

  async signToken(userId: number, email: string): Promise<string> {
    try {
      const payload = {
        sub: userId,
        email,
      };
      return await this.jwt.signAsync(payload, {
        expiresIn: '30m',
        secret: this.config.get('JWT_SECRET_KEY'),
      });
    } catch (error) {
      throw error;
    }
  }
}
