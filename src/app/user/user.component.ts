import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { User } from './User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  user!: User

  constructor(private appService: AppService){}

  ngOnInit(): void {
    this.user = this.appService.getUserData();
    console.log(this.user);
  }

}
