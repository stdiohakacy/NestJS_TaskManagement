import { TasksModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(), TasksModule, AuthModule],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
