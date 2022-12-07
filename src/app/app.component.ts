import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { User } from './User';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
  }
  title = 'Portfolio';

  authenticated() {
    return this.app.authenticated
  }

}
