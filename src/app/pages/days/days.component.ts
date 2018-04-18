import {Component} from "@angular/core"
import {CalendarModel} from "../../models/calendar.model";

@Component({
  selector:'days',
  templateUrl:'days.component.html',
  styleUrls:['days.component.sass']
})
export class DaysComponent{
  private daysList : Array<string>;

  constructor(public calendar:CalendarModel){

  }
}