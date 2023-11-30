import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserModelService } from './user-model.service';
import { CreateUserModelDto } from './dto/create-user-model.dto';
import { UpdateUserModelDto } from './dto/update-user-model.dto';

@Controller('user-model')
export class UserModelController {
  constructor(private readonly userModelService: UserModelService) {}

  @Post()
  async create(@Body() createUserModelDto: CreateUserModelDto) {
    //console.log(createUserModelDto);
    return this.userModelService.create(createUserModelDto);
  }

  @Get()
  async findAll() {
    return this.userModelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userModelService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserModelDto: UpdateUserModelDto,
  ) {
    return this.userModelService.update(+id, updateUserModelDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userModelService.remove(+id);
  }
}
