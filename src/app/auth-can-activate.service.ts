import {Injectable} from '@angular/core';
import {CanActivate} from "@angular/router";
import {AuthCheckService} from "./auth/auth-check.service";
import {User} from "./models/User";

@Injectable()
export class AuthCanActivateService implements CanActivate {

  constructor(private authCheck: AuthCheckService) {
  }

  canActivate(): boolean {
    const isLogin = this.authCheck.isLogin();
    return !!isLogin
  }

}
