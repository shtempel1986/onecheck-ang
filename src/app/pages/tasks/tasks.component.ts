import {Component, OnInit} from "@angular/core"
import {CalendarModel} from "../../models/calendar.model";
import {TaskModel} from "../../components/task/task.model";
import {TasksService} from "./tasks.service";

@Component({
  selector: 'tasks',
  templateUrl: 'tasks.component.html',
  styleUrls: ['tasks.component.sass']
})
export class TasksComponent implements OnInit {
  public tasks: TaskModel[] = [];

  constructor(public calendar: CalendarModel,
              private tasksService: TasksService) {
  }

  ngOnInit() {
    this.getTasks();
    this.tasksService.updateTask(task => {
      this.tasks.push(task);
    });
    this.tasksService.deleteTask(taskId=>{
      this.deleteTask(taskId);
    })
  }

  deleteTask(taskId){
    console.log(taskId);
    console.log(this);
    for(let idx in this.tasks){
      if(this.tasks[idx].taskId === taskId){
        console.log(typeof idx);
        this.tasks.splice(parseInt(idx),1);
      }
    }
  }

  getTasks() {
    this.tasksService.getTasks<TaskModel>()
      .subscribe(tasks => {
          let _tasks: TaskModel[] = [];
          for (let task of tasks) {
            _tasks.push(TaskModel.taskModelFromObject(task))
          }
          this.tasks = _tasks;
          if(this.tasks.length === 0){
            this.tasksService.sendAddTaskRequest();
          } else {
            //фокус на последнем элементе
            this.tasks[this.tasks.length-1].focus = true;
          }
        },
        reason => {
          console.log(reason);
        });
  }

}