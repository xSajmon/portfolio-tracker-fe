import { Component, OnInit } from '@angular/core';
import { User } from '../User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  user : User = {
    id: 1,
    name: 'User'
  }
  constructor(){}

  ngOnInit(): void {
  
  }

}
