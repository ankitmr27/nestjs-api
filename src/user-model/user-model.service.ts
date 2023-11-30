import { Injectable } from '@nestjs/common';
import { CreateUserModelDto } from './dto/create-user-model.dto';
import { UpdateUserModelDto } from './dto/update-user-model.dto';
import { EntityManager, Repository } from 'typeorm';
import { UserModel } from './entities/user-model.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserModelService {
  constructor(
    @InjectRepository(UserModel)
    private readonly usersRepository: Repository<UserModel>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUserModelDto: CreateUserModelDto) {
    const user = new UserModel(createUserModelDto);
    await this.entityManager.save(user);
    return { message: 'new user has been added:', data: user };
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    return { message: `This action returns a #${id} userModel`, data: user };
  }

  async update(id: number, updateUserModelDto: UpdateUserModelDto) {
    const user = await this.usersRepository.findOneBy({ id });
    user.password = updateUserModelDto.password;
    await this.entityManager.save(user);
    return { message: `This action updates a #${id} userModel`, data: user };
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
    return `This action removes a #${id} userModel`;
  }
}
