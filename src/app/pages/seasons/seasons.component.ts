import {Component} from "@angular/core"
import {CalendarModel} from "../../models/calendar.model";

@Component({
  selector:'seasons',
  templateUrl:'seasons.component.html',
  styleUrls:['seasons.component.sass']
})
export class SeasonsComponent{
  public seasonList : Array<string>;

  constructor(public calendar:CalendarModel){

    this.seasonList = calendar.getSeasonList();
  }
}