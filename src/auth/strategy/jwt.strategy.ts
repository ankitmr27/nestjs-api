import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserModelService } from 'src/user-model/user-model.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // name of strategy:jwt for guard to recognize it
  constructor(
    config: ConfigService,
    private userModelService: UserModelService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET_KEY'),
    });
  }
  // after verification, this function's return value is added in req.user section of our request object in order to do something with that information
  async validate(payload: { sub: number; email: string }) {
    //console.log(payload);
    const user = await this.userModelService.findOne(payload.sub);
    delete user.data.password;
    return user; // it has to return some non-null values to validate the guard strategy
  }
}
