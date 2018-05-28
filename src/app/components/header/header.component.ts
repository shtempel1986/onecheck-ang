import {Component} from "@angular/core"
import {AuthCheckService} from "../../auth/auth-check.service";

@Component({
  selector:'header-component',
  templateUrl:'header.component.html',
  styleUrls:['header.component.sass']
})
export class HeaderComponent{

  constructor(private authCheck: AuthCheckService){

  }

  logOut(){
    this.authCheck.logOut();
  }
}