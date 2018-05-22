import {Component} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {RegistrationService} from "./registration.service";


@Component({
  selector:'registration',
  templateUrl:'./registration.html',
  styleUrls:['./registration.sass']
})
export class Registration{
  constructor(public registration: RegistrationService){}
}