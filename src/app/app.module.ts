import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http"
import {Autosize} from './direcives/autosize.directive';


import {AppComponent} from './app.component';
import {Registration} from "./auth/regisrtation";
import {HomeComponent} from "./home.component"
import {HeaderComponent} from "./components/header/header.component"
import {SeasonsComponent} from "./pages/seasons/seasons.component";
import {WeeksComponent} from "./pages/weeks/weeks.component"
import {TasksComponent} from "./pages/tasks/tasks.component"
import {TaskComponent} from "./components/task/task.component";

import {CalendarModel} from "./models/calendar.model"

import {routing} from "./app.routing";
import {DaysComponent} from "./pages/days/days.component";
import {AuthCheckService} from "./auth/auth-check.service";
import {AuthComponent} from './components/auth/auth.component';
import {StateService} from "./state.service";
import {FormsModule} from "@angular/forms";
import {AuthService} from "./auth/auth.service";
import {REST_URL, RestDataSource} from "./models/rest.datasource";
import {AuthCanActivateService} from "./auth-can-activate.service";
import {RegistrationService} from "./auth/registration.service";
import {MessagesService} from "./services/messages.service";
import {MessagesComponent} from './components/messages/messages.component';
import {TasksService} from "./pages/tasks/tasks.service";


@NgModule({
  declarations: [
    AppComponent,
    Registration,
    HomeComponent,
    HeaderComponent,
    SeasonsComponent,
    WeeksComponent,
    DaysComponent,
    TasksComponent,
    TaskComponent,
    AuthComponent,
    MessagesComponent,
    Autosize
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [
    AuthCanActivateService,
    CalendarModel,
    AuthCheckService,
    StateService,
    AuthService,
    RestDataSource,
    RegistrationService,
    {provide: REST_URL, useValue: 'http://ogredi-ru.1gb.ru/onecheck/rest_api'},
    MessagesService,
    TasksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
