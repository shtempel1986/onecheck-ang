import {Injectable} from '@angular/core';
import {User} from "../models/User";
import {Router} from "@angular/router";


@Injectable()
export class AuthCheckService {

  private email: string;
  private sessionToken: string;
  private userId: string;
  private sessionExpires: Date = new Date();

  constructor(private router: Router) {
  }

  updateFromLocalStorage() {
    this.email = localStorage.getItem('email');
    this.sessionToken = localStorage.getItem('sessionToken');
    this.userId = localStorage.getItem('userId');
    const sessionExpires = localStorage.getItem('sessionExpires');
    if (sessionExpires) {
      this.sessionExpires = new Date(sessionExpires);
    }
  }

  isLogin(): boolean | User {
    this.updateFromLocalStorage();
    const now: number = (new Date()).getTime();
    const expired: boolean = (now - this.sessionExpires.getTime()) > 0;
    if (!this.email || !this.sessionToken || !this.userId || expired) {
      return false;
    }
    return new User(this.email, this.userId, this.sessionToken, this.sessionExpires);
  }

  logOut() {
    this.email = null;
    this.sessionToken = null;
    this.userId = null;
    this.sessionExpires = new Date();
    localStorage.removeItem('email');
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('sessionExpires');
    this.router.navigateByUrl('auth');
  }

  getSessionToken(): string {
    this.updateFromLocalStorage();
    return this.sessionToken;
  }

  getCurrentUser(): User {
    return new User(this.email, this.userId, this.sessionToken, this.sessionExpires);
  }

}
