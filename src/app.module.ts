import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'config/typeorm.config';
import { UserModelModule } from './user-model/user-model.module';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModelModule,
    AuthModule,
  ],
})
export class AppModule {}
