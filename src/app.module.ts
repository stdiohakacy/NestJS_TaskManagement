import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import {typeORMConfig} from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), TasksModule],
})
export class AppModule {}
