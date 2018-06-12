import {Injectable} from '@angular/core';
import {CONSTS} from "../models/Consts";

@Injectable()
export class MessagesService {

  public showMessageWindow: boolean = false;
  public showMessage: boolean = false;
  public message: string;
  public showProgress: boolean = false;
  public error: boolean = false;

  constructor() {
  }

  startProgress() {
    this.showMessageWindow = true;
    this.showProgress = true;
  }

  stopProgress(message: string | null = null): void {

    if (message) {
      this.message = message;
      this.showMessage = true;
      this.showProgress = false;
      setTimeout(() => {
        this.showProgress = false;
        this.showMessageWindow = false;
        this.showMessage = false;
        this.message = '';
      }, CONSTS.MESSAGES_DELAY);
      return;
    }
    this.showProgress = false;
    this.showMessageWindow = false;
  }

  showErrorMessage(message: string) {
    this.error = true;
    this.message = message;
    this.showMessageWindow = true;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessageWindow = false;
      this.showMessage = false;
      this.error = false;
      this.message = '';
    }, CONSTS.MESSAGES_DELAY);
  }

}
