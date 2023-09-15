import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { userSchema } from 'src/helper/schema.validation';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { object } from 'yup';
import { userDto } from './dto/user.dto';
import { userCreateValidator } from 'src/helper/createValidationPipeline';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Body(new userCreateValidator()) createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: userDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch('login')
  signIn(@Body() userCredentials: CreateUserDto) {
    return this.usersService.login(userCredentials);
  }

  @Patch('reset_password/:id')
  resetPassword(@Body() userPasswordDetails: userDto, @Param('id') id: string) {
    return this.usersService.resetPassword(userPasswordDetails, id);
  }
}
