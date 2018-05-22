import { Injectable } from '@angular/core';
import {User} from "./models/User";

@Injectable()
export class StateService {

  public currentUser: User;

  constructor() { }

  setCurrentUser(user: User){
    this.currentUser = user;
  }

}
