import {Component} from "@angular/core"
import {CalendarModel} from "../../models/calendar.model";

@Component({
  selector:'weeks',
  templateUrl:'weeks.component.html',
  styleUrls:['weeks.component.sass']
})
export class WeeksComponent{
  public weeksList : Array<string>;

  constructor(public calendar:CalendarModel){

  }
}