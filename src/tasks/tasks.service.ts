import { Injectable } from '@nestjs/common';
import { Task, TasksStatus } from './tasks.model';
import * as uuid from 'uuid/v1';

@Injectable()
export class TasksService {
    private tasks:Task[]=[];

    getAllTasks():Task[]{
        return this.tasks;
    };

    getTaskById(id:string):Task{
        return this.tasks.find(task=> task.id === id);
    };
    createTask(createTaskDto):Task{
        const {title,description}=createTaskDto;
        const task:Task={
            id:uuid(),
            title,
            description,
            status:TasksStatus.OPEN
        }

        this.tasks.push(task);
        return task;
    };
    deleteTask(id:string):void{
        this.tasks = this.tasks.filter(task=> task.id !==id);
    };
    updateTaskStatus(id:string,status:TasksStatus){
        const task=this.getTaskById(id);
        task.status=status;
        return task;
    }
}
