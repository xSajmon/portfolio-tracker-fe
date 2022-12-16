import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
  }
 
  authenticated() {
    return this.app.authenticated
  }

  logout(){
    this.app.logout();
  }

}
