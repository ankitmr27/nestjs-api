import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'config/typeorm.config';
import { UserModelModule } from './user-model/user-model.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(typeOrmConfig), UserModelModule],
})
export class AppModule {}
