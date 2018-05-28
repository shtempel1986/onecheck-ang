import {Component} from "@angular/core";
import {RegistrationService} from "./registration.service";
import {User} from "../models/User";
import {AuthCheckService} from "./auth-check.service";
import {Router} from "@angular/router";


@Component({
  selector:'registration',
  templateUrl:'./registration.html',
  styleUrls:['./registration.sass']
})
export class Registration{
  constructor(public registration: RegistrationService,
              private checkAuth: AuthCheckService,
              private router: Router){
    const isLogin = this.checkAuth.isLogin();

    if(isLogin instanceof User){
      router.navigateByUrl('seasons');
    }
  }
}