import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserModelService } from './user-model.service';
import { CreateUserModelDto } from './dto/create-user-model.dto';
import { UpdateUserModelDto } from './dto/update-user-model.dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('user-model')
export class UserModelController {
  constructor(private readonly userModelService: UserModelService) {}

  //creating new user
  @Post()
  async create(@Body() createUserModelDto: CreateUserModelDto) {
    //console.log(createUserModelDto);
    return await this.userModelService.create(createUserModelDto);
  }

  @Get()
  async findAll() {
    return await this.userModelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userModelService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserModelDto: UpdateUserModelDto,
  ) {
    return await this.userModelService.update(+id, updateUserModelDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userModelService.remove(+id);
  }
}
