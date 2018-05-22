import {Injectable} from '@angular/core';
import {User} from "../models/User";


@Injectable()
export class AuthCheckService {

  private userLogin: string;
  private sessionToken: string;
  private userId: string;

  constructor() {
    this.userLogin = localStorage.getItem('userLogin');
    this.sessionToken = localStorage.getItem('sessionToken');
    this.userId =  localStorage.getItem('userId');
  }

   isLogin(): boolean | User {
    if (!this.userLogin || !this.sessionToken || !this.userId){
      return false;
    }
    return new User(this.userLogin, this.userId, this.sessionToken);
  }

}
