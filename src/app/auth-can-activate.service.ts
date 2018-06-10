import {Injectable} from '@angular/core';
import {CanActivate} from "@angular/router";
import {AuthCheckService} from "./auth/auth-check.service";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import {WeeklyTasksService} from "./services/weekly-tasks.service";

@Injectable()
export class AuthCanActivateService implements CanActivate {

  constructor(private authCheck: AuthCheckService,
              private router: Router,
              private weeklyTasksService: WeeklyTasksService) {
  }

  canActivate(): Observable<boolean>|Promise<boolean>|boolean {
    const isLogin = this.authCheck.isLogin();
    if(!isLogin){
      this.router.navigateByUrl('/auth');
    } else {
      this.weeklyTasksService.updateWeeklyTasks(this.authCheck.getCurrentUser().userId);
    }
    return !!isLogin
  }

}
