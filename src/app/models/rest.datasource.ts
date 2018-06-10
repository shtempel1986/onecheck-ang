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

  private updateSessionToken(method: string= 'GET'){
    const sessionToken = this.authCheck.getSessionToken();
    this.paramsWithAuth = {
      headers: new HttpHeaders({
        'Authorization': sessionToken,
        'Content-Type':'application/json',
        'Request-Method':method
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
    this.updateSessionToken();
    return this.http.get<any>(`${this.url}/${url}`, this.paramsWithAuth);
  }

  sendPutRequest(url: string, data): Observable<any>{
    this.updateSessionToken('PUT');
    return this.http.post(`${this.url}/${url}`, data, this.paramsWithAuth);
  }

  sendPatchRequest(url: string, data): Observable<any>{
    this.updateSessionToken('PATCH');
    return this.http.post(`${this.url}/${url}`, data, this.paramsWithAuth);
  }

  sendPostRequest<T>(url: string, data?): Observable<any> {
    this.updateSessionToken('POST');
    return this.http.post<T>(`${this.url}/${url}`, data, this.paramsWithAuth);
  }

  sendDeleteRequest<T>(url: string): Observable<any> {
    this.updateSessionToken('DELETE');
    return this.http.post<T>(`${this.url}/${url}`,null, this.paramsWithAuth);
  }
}
