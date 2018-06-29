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
  public router: Router;
  constructor(private authCheck: AuthCheckService,
              router: Router,
              public calendar: CalendarModel){
      this.router = router;
  }

  logOut(){
    this.authCheck.logOut();
  }
}