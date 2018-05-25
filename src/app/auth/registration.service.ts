import {Injectable} from '@angular/core';
import {RestDataSource} from "../models/rest.datasource";
import {RegistrationModel} from "../models/registration.model";
import {CONSTS} from "../models/Consts";

@Injectable()
export class RegistrationService {

  public email: string = 'o_gredi@mail.ru';
  public password: string = '123456';
  public confirmPassword: string = '123456';

  constructor(public restData: RestDataSource) {
  }

  registration() {
    if (this.email &&
      this.password.length >= CONSTS.MIN_PASSWORD_LENGTH &&
      this.confirmPassword.length >= CONSTS.MIN_PASSWORD_LENGTH) {
      const registrationData = new RegistrationModel(this.email, this.password, this.confirmPassword);

      this.restData.registrationRequest(registrationData).subscribe(function (res) {
        console.log(res);
      },
        reason=>{
        console.log(reason);
      });
    }
  }

}
