import {Injectable} from '@angular/core';
import {v} from "@angular/core/src/render3";
import {CONSTS} from "../models/Consts";

@Injectable()
export class MessagesService {

  public showMessageWindow: boolean = false;
  public showMessage: boolean = false;
  public message: string;
  public showProgress: boolean = false;

  constructor() {
  }

  startProgress() {
    this.showMessageWindow = true;
    this.showProgress = true;
  }

  stopProgress(message: string | null = null): void {
    const self = this;
    if(message){
      this.message = message;
      this.showMessage = true;
      this.showProgress = false;
      setTimeout(()=>{
        self.showProgress = false;
        self.showMessageWindow = false;
        self.showMessage = false;
        self.message = '';
      }, CONSTS.MESSAGES_DELAY);
      return;
    }
    this.showProgress = false;
    this.showMessageWindow = false;
  }

}
