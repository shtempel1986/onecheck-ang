import {Component} from "@angular/core"
import {AuthCheckService} from "../../auth/auth-check.service";
import {Router} from "@angular/router";

@Component({
  selector:'header-component',
  templateUrl:'header.component.html',
  styleUrls:['header.component.sass']
})
export class HeaderComponent{

  constructor(private authCheck: AuthCheckService,
              public router: Router){

  }

  logOut(){
    this.authCheck.logOut();
  }
}