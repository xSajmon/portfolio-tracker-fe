import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username: string = ''
  password: string = ''

  constructor(private appService: AppService, private router: Router){}

  ngOnInit(): void {}


  login(){
    this.appService.authenticate(this.username, this.password, () => {
      this.router.navigateByUrl('/')
    })
      
  }
  
}
