import {Component} from "@angular/core";
import {CalendarModel} from "./models/calendar.model";

@Component({
  selector:'home-component',
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent{
  constructor(public calendar: CalendarModel){
  }
}