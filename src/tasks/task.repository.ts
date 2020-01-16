import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private logger = new Logger('TaskRepository');

    async getTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]> {
        const {status, search} = filterDTO;
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', {userId: user.id});

        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%`});
        }        
        try {
            const tasks = await query.getMany();
            return tasks;    
        } catch (error) {
            this.logger.error(`Fail to get tasks for user ${user.username}, Filters: ${JSON.stringify(filterDTO)} `, error.stack);
            throw new InternalServerErrorException();
        }
    }

    async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
        const {title, description} = createTaskDTO;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;

        try {
            await task.save();
        } catch (error) {
            this.logger.error(`Failed to create a task for user ${user.username} Data : ${createTaskDTO}`, error.stask);
            throw new InternalServerErrorException();          
        }
        
        delete task.user;
        return task;
    }
}
