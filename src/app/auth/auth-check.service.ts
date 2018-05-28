import {Injectable} from '@angular/core';
import {User} from "../models/User";


@Injectable()
export class AuthCheckService {

  private userLogin: string;
  private sessionToken: string;
  private userId: string;
  private sessionExpires: Date = new Date();

  constructor() {
    this.userLogin = localStorage.getItem('email');
    this.sessionToken = localStorage.getItem('sessionToken');
    this.userId = localStorage.getItem('userId');
    const sessionExpires = localStorage.getItem('sessionExpires');
    if(sessionExpires){
      this.sessionExpires = new Date(sessionExpires);
    }
  }

  isLogin(): boolean | User {
    if (!this.userLogin || !this.sessionToken || !this.userId) {
      return false;
    }
    return new User(this.userLogin, this.userId, this.sessionToken, this.sessionExpires);
  }
}
