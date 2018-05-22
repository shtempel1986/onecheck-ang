import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  constructor(public auth: AuthService,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    console.log(this.activeRoute.snapshot);
  }

}
