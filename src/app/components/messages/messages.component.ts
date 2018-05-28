import {Component, OnInit} from '@angular/core';
import {MessagesService} from "../../services/messages.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.sass']
})
export class MessagesComponent implements OnInit {

  public progressImage: string;

  constructor(public messagesService: MessagesService) {
  }

  ngOnInit() {
    this.progressImage = '/assets/imgs/Loading-circles-acs-rectangles.gif';
  }

}
