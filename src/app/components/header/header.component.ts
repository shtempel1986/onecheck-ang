import {Component} from "@angular/core"
import {AuthCheckService} from "../../auth/auth-check.service";
import {Router} from "@angular/router";
import {CalendarModel} from "../../models/calendar.model";

@Component({
  selector:'header-component',
  templateUrl:'header.component.html',
  styleUrls:['header.component.sass']
})
export class HeaderComponent{

  constructor(private authCheck: AuthCheckService,
              public router: Router,
              public calendar: CalendarModel){

  }

  logOut(){
    this.authCheck.logOut();
  }
}