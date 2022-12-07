import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from './User';
import { UserComponent } from './user/user.component';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  authenticated = false

  constructor(private http: HttpClient) { }

  
  authenticate(username: string, password: string, callback: Function){

    const headers = new HttpHeaders({
      authorization: 'Basic ' + window.btoa(username + ":" + password)
    });

    this.http.get<User>('http://localhost:8080/users/login', {headers}).subscribe(response => {
      console.log(response)
        if(response['name']){
          this.authenticated = true;
          sessionStorage.setItem('token', 'Basic ' + window.btoa(username + ":" + password));
          return callback && callback()
        } else {
          this.authenticated = false;
        }
  });
  }

  getAuthenticationToken(){
    return sessionStorage.getItem('token');
  }
}
