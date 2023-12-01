import { Injectable } from '@nestjs/common';
import { CreateUserModelDto } from './dto/create-user-model.dto';
import { UpdateUserModelDto } from './dto/update-user-model.dto';
import { EntityManager, Repository } from 'typeorm';
import { UserModel } from './entities/user-model.entity';
import { InjectRepository } from '@nestjs/typeorm';
//import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserModelService {
  constructor(
    @InjectRepository(UserModel)
    private readonly usersRepository: Repository<UserModel>,
    private readonly entityManager: EntityManager,
    // config: ConfigService,
  ) {
    //console.log(config.get('DATABASE_URL'));
  }

  async create(createUserModelDto: CreateUserModelDto) {
    try {
      const user = new UserModel(createUserModelDto);
      await this.entityManager.save(user);
      return { message: 'new user has been added:', data: user };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    return { message: `This action returns a #${id} userModel`, data: user };
  }

  async findUser(userModelDto: CreateUserModelDto): Promise<UserModel> {
    try {
      //console.log(userModelDto);
      const user = await this.usersRepository.findOneBy({
        email: userModelDto.email,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserModelDto: UpdateUserModelDto) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      user.password = updateUserModelDto.password;
      await this.entityManager.save(user);
      return { message: `This action updates a #${id} userModel`, data: user };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.usersRepository.delete(id);
      return `This action removes a #${id} userModel`;
    } catch (error) {
      throw error;
    }
  }
}
