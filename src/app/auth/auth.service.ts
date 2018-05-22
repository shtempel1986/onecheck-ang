import {Injectable} from '@angular/core';
import {RestDataSource} from "../models/rest.datasource";
import {User} from "../models/User";
import {AuthData} from "./AuthData";

@Injectable()
export class AuthService {

  public email: string = '45';
  public password: string = '456';

  constructor(private restData: RestDataSource) {
  }

  sendAuthData() {
    this.restData.authRequest(this.toObject()).subscribe(function (res) {
      console.log(res);
    });
  }

  private toObject(): AuthData {
    return new AuthData(this.email, this.password);
  }
}
