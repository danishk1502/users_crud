import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './entities/user.entity';
import { addresses } from './entities/address.entity';
import { userSchema } from 'src/helper/schema.validation';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([users, addresses])],
})
export class UsersModule {}
