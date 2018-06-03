import {Injectable, Inject, InjectionToken} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {CurrentUser} from "./User";
import {AuthData} from "./AuthData";
import {RegistrationModel} from "./registration.model";
import {AuthCheckService} from "../auth/auth-check.service";

export const REST_URL = new InjectionToken('rest_url');

@Injectable()
export class RestDataSource {

  private paramsWithAuth;

  constructor(private http: HttpClient,
              @Inject(REST_URL) private url: string,
              private authCheck: AuthCheckService) {

    const sessionToken = this.authCheck.getSessionToken();

    this.paramsWithAuth = {
      headers: new HttpHeaders({'Authorization': sessionToken})
    };
  }

  private updateSessionToken(){
    const sessionToken = this.authCheck.getSessionToken();
    this.paramsWithAuth = {
      headers: new HttpHeaders({
        'Authorization': sessionToken,
        'Content-Type':'application/json'
      })
    };
  }

  authRequest(authData: AuthData):Observable<any>{
    return this.http.post(`${this.url}/auth`, authData);
  }

  registrationRequest(registrationData: RegistrationModel):Observable<CurrentUser>{
    return this.http.post<CurrentUser>(`${this.url}/registration`, registrationData);
  }

  getData<T>(url: string): Observable<any>{
    let encodedUrl = encodeURI(url);
    this.updateSessionToken();
    return this.http.get<any>(`${this.url}/${encodedUrl}`, this.paramsWithAuth);
  }

  sendPutRequest(url: string, data): Observable<any>{
    let encodedUrl = encodeURI(url);
    this.updateSessionToken();
    return this.http.put(`${this.url}/${encodedUrl}`, data, this.paramsWithAuth);
  }

  sendPostRequest<T>(url: string, data?): Observable<any> {
    let encodedUrl = encodeURI(url);
    this.updateSessionToken();
    return this.http.post<T>(`${this.url}/${encodedUrl}`, data, this.paramsWithAuth);
  }

  sendDeleteRequest<T>(url: string): Observable<any> {
    let encodedUrl = encodeURI(url);
    this.updateSessionToken();
    return this.http.delete<T>(`${this.url}/${encodedUrl}`, this.paramsWithAuth);
  }
}
