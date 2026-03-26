import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    public readonly logger: Logger,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return user;
    } catch (error) {
      // Log the error
      this.logger.error(`Error creating user: ${error.message}`);

      // Rethrow the error
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      // Log the error
      this.logger.error(`Error finding all users: ${error.message}`);

      // Rethrow the error
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne({ id: +id } as FindOneUserDto);
    } catch (error) {
      // Log the error
      this.logger.error(`Error finding user with ID ${id}: ${error.message}`);

      // Rethrow the error
      throw error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.update(+id, updateUserDto);
    } catch (error) {
      // Log the error
      this.logger.error(`Error updating user with ID ${id}: ${error.message}`);

      // Rethrow the error
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.userService.remove(+id);
    } catch (error) {
      // Log the error
      this.logger.error(`Error removing user with ID ${id}: ${error.message}`);

      // Rethrow the error
      throw error;
    }
  }
}
