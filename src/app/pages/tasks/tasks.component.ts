import {Component} from "@angular/core"
import {CalendarModel} from "../../models/calendar.model";

@Component({
  selector: 'tasks',
  templateUrl:'tasks.component.html',
  styleUrls:['tasks.component.sass']
})
export class TasksComponent{
  constructor(public calendar:CalendarModel){

  }
}