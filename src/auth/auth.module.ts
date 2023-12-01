import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModelModule } from 'src/user-model/user-model.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [UserModelModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
