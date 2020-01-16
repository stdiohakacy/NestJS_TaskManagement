import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateTaskDTO {
    @MinLength(4)
    @MaxLength(20)
    title: string;
    
    @MinLength(4)
    @MaxLength(20)
    description: string;
}
