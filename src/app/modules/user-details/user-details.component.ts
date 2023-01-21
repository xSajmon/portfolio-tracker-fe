import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {

  user!: User

  constructor(private auth: AuthenticationService){}

  ngOnInit(): void {
    this.user = this.auth.getUserData();
    console.log(this.user);
  }

}
