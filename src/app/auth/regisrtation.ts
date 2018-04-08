import {Component} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http'


@Component({
  selector:'registration',
  templateUrl:'./registration.html',
  styleUrls:['./registration.sass']
})
export class Registration{
  constructor(public http:HttpClient){
    let headers = new HttpHeaders();
    headers.append('Content-Type','text/plain');
    this.http.post('http://onecheck:81/php/registration.php',
      {params:{email:'o_gredi@mail.ru',password:'123456'}})
      .subscribe(res=>{
        console.log(res);
      })
  }
}