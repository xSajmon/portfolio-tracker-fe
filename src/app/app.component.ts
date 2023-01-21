import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';
import { WebSocketService } from './core/services/web-socket.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{


  constructor(private auth: AuthenticationService, private http: HttpClient, private socketService: WebSocketService) {}

  authenticated() {
    return this.auth.authenticated
  }

  logout(){
    this.socketService.socketDisconnect();
    this.auth.logout();
  }

}
