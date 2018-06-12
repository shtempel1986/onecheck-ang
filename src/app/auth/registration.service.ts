import {Injectable} from '@angular/core';
import {RestDataSource} from "../models/rest.datasource";
import {RegistrationModel} from "../models/registration.model";
import {CONSTS} from "../models/Consts";
import {CurrentUser} from "../models/User";
import {Router} from "@angular/router";
import {MessagesService} from "../services/messages.service";

@Injectable()
export class RegistrationService {

  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';

  constructor(public restData: RestDataSource,
              public router: Router,
              private messagesService: MessagesService) {
  }

  registration() {
    if (this.email &&
      this.password.length >= CONSTS.MIN_PASSWORD_LENGTH &&
      this.confirmPassword.length >= CONSTS.MIN_PASSWORD_LENGTH) {

      const registrationData = new RegistrationModel(this.email, this.password, this.confirmPassword);

      this.messagesService.startProgress();

      this.restData.registrationRequest(registrationData).subscribe((res: CurrentUser) => {
          const currentUser = new CurrentUser(res);
          currentUser.setCurrentUserInStorage();
          this.router.navigateByUrl('seasons');
          this.messagesService.stopProgress();
        },
        reason => {
          console.log(reason);
          const message =  typeof reason.error === 'string'?reason.error:reason.error.toString();
          this.messagesService.stopProgress(message);
        });
    }
  }

}
