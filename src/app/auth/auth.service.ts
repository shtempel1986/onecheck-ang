import {Injectable} from '@angular/core';
import {RestDataSource} from "../models/rest.datasource";
import {User} from "../models/User";
import {AuthData} from "../models/AuthData";

@Injectable()
export class AuthService {

  public email: string = '';
  public password: string = '';

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
