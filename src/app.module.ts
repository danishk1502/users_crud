import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { createTypeOrmProdConfig } from './database/database.config';

config();

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(
      createTypeOrmProdConfig({
        entities: ['dist/**/*.entity{.ts,.js}'],
        type: 'postgres',
      }),
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
