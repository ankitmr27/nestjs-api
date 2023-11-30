import { Module } from '@nestjs/common';
import { UserModelService } from './user-model.service';
import { UserModelController } from './user-model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entities/user-model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UserModelController],
  providers: [UserModelService],
})
export class UserModelModule {}
