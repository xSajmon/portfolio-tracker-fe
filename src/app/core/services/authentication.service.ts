import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../modules/user-details/models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  authenticated = false

  constructor(private http: HttpClient) { }

  
  authenticate(username: string, password: string, callback: Function){

    const headers = new HttpHeaders({
      authorization: 'Basic ' + window.btoa(username + ":" + password)
    });

    this.http.get<User>('http://localhost:8080/users/login', {headers}).subscribe(response => {
      console.log(response)
        if(response){
          this.authenticated = true;
          sessionStorage.setItem('token', 'Basic ' + window.btoa(username + ":" + password));
          sessionStorage.setItem('user', JSON.stringify(response));;
      
          return callback && callback()
        } else {
          this.authenticated = false;
        }
  });
  }

  getAuthenticationToken(){
    return sessionStorage.getItem('token');
  }

  getUserData(): User{
    return JSON.parse(sessionStorage.getItem('user')!);
  }

  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.authenticated = false;
  }
}
