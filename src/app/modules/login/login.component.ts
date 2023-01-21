import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username: string = ''
  password: string = ''

  constructor(private appService: AuthenticationService, private router: Router){}

  ngOnInit(): void {}


  login(){
    this.appService.authenticate(this.username, this.password, () => {
      this.router.navigateByUrl('/')
    })
      
  }
  
}
