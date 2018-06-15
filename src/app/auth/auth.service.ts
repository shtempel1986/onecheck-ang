import {Injectable} from '@angular/core';
import {RestDataSource} from "../models/rest.datasource";
import {AuthData} from "../models/AuthData";
import {MessagesService} from "../services/messages.service";
import {CONSTS} from "../models/Consts";
import {CurrentUser} from "../models/User";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  public email: string = 'o_gredi@mail.ru';
  public password: string = '123456';

  constructor(private restData: RestDataSource,
              private messagesService: MessagesService,
              private router: Router) {
  }

  sendAuthData() {
    if (this.email &&
      this.password.length >= CONSTS.MIN_PASSWORD_LENGTH) {

      this.messagesService.startProgress();
      this.restData.authRequest(this.toObject()).subscribe((res) => {
          const currentUser = new CurrentUser(res);
          currentUser.setCurrentUserInStorage();
          this.router.navigateByUrl('seasons');
          this.messagesService.stopProgress();
        },
        reason => {
          const message = typeof reason.error === 'string'? reason.error : 'Ошибка';
          this.messagesService.stopProgress(message);
        });
    }
  }

  private toObject(): AuthData {
    return new AuthData(this.email, this.password);
  }
}
