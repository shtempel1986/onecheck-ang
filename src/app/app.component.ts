import {Component, OnInit} from '@angular/core';
import {AuthCheckService} from "./auth/auth-check.service";
import {StateService} from "./state.service";
import {User} from "./models/User";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private checkService: AuthCheckService,
    private router: Router,
    private state: StateService,
    private activeRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
  }
}
