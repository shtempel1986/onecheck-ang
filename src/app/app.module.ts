import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http"


import {AppComponent} from './app.component';
import {Registration} from "./auth/regisrtation";
import {HomeComponent} from "./home.component"
import {HeaderComponent} from "./components/header/header.component"
import {SeasonsComponent} from "./pages/seasons/seasons.component";
import {WeeksComponent} from "./pages/weeks/weeks.component"
import {TasksComponent} from "./pages/tasks/tasks.component"

import {CalendarModel} from "./models/calendar.model"

import {routing} from "./app.routing";
import {DaysComponent} from "./pages/days/days.component";


@NgModule({
  declarations: [
    AppComponent,
    Registration,
    HomeComponent,
    HeaderComponent,
    SeasonsComponent,
    WeeksComponent,
    DaysComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing
  ],
  providers: [
    CalendarModel
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
