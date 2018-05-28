import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {AuthCheckService} from "../../auth/auth-check.service";
import {User} from "../../models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  constructor(public auth: AuthService,
              private checkAuth: AuthCheckService,
              private router: Router) {
    const isLogin = this.checkAuth.isLogin();

    if(isLogin instanceof User){
      router.navigateByUrl('seasons');
    }

  }

  ngOnInit() {
  }

}
