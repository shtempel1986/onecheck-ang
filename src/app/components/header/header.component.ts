import {Component} from "@angular/core"
import {AuthCheckService} from "../../auth/auth-check.service";
import {Router} from "@angular/router";
import {CalendarModel} from "../../models/calendar.model";
import {RestDataSource} from "../../models/rest.datasource";
import {ErrorHandlersService} from "../../services/error-handlers.service";

@Component({
  selector: 'header-component',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.sass']
})
export class HeaderComponent {
  public router: Router;

  constructor(private authCheck: AuthCheckService,
              router: Router,
              public calendar: CalendarModel,
              private rest: RestDataSource,
              private log: ErrorHandlersService) {
    this.router = router;
    console.log(this.router);
  }

  logOut() {
    const currentUserId = this.authCheck.getCurrentUser().userId;
    this.rest.sendDeleteRequest('auth', {userId: currentUserId}).subscribe(res => {

        this.authCheck.logOut();
      },
      error => {
        this.log.httpErrorHandler(error);
        console.log(error);
      });
  }
}