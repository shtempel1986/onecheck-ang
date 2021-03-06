import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {MessagesService} from "./messages.service";
import {AuthCheckService} from "../auth/auth-check.service";
import {ErrorReport} from "../models/ErrorReport";
import {RestDataSource} from "../models/rest.datasource";

@Injectable()
export class ErrorHandlersService {

  constructor(private router: Router,
              private messages: MessagesService,
              private auth: AuthCheckService,
              private restService: RestDataSource) {
  }

  httpErrorHandler(err) {

    switch (err.status) {
      case 403: {
        this.messages.showErrorMessage('Ошибка авторизации');
        this.auth.logOut();
      }
        break;
      case 501: {
        this.messages.showErrorMessage('Ошибка сервера: '+ err.error);
      }
        break;
      case 404: {
        this.messages.showErrorMessage('Объект не найден на сервере: '+ err.error);
      }
        break;
    }
    const errorReport = new ErrorReport( err,this.auth.getCurrentUser().userId);

    this.restService.sendPostRequest(`errors`,errorReport);

  }

}
