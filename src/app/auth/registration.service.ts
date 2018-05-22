import {Injectable} from '@angular/core';
import {RestDataSource} from "../models/rest.datasource";

@Injectable()
export class RegistrationService {

  public email: string = 'o_gredi@mail.ru';
  public password: string = '123456';
  public confirmPassword: string = '123456';

  constructor(public restData: RestDataSource) {
  }

}
