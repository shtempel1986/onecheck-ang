import {Injectable, Inject, InjectionToken} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import { catchError, map, tap } from 'rxjs/operators';
import {CurrentUser, User} from "./User";
import {AuthService} from "../auth/auth.service";
import {AuthData} from "./AuthData";
import {RegistrationModel} from "./registration.model";


let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }),
  params: null
};

export const REST_URL = new InjectionToken('rest_url');

@Injectable()
export class RestDataSource {

  constructor(private http: HttpClient,
              @Inject(REST_URL) private url: string) {

  }

  authRequest(authData: AuthData):Observable<any>{

    return this.http.post(`${this.url}/auth`, authData)

  }

  registrationRequest(registrationData: RegistrationModel):Observable<CurrentUser>{

    return this.http.post<CurrentUser>(`${this.url}/registration`, registrationData);
  }

}
