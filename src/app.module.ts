import { TasksModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot(), TasksModule],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
