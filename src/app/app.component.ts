import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppService } from './app.service';
import { WebSocketService } from './web-socket.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{


  constructor(private app: AppService, private http: HttpClient, private socketService: WebSocketService) {}

  authenticated() {
    return this.app.authenticated
  }

  logout(){
    this.socketService.socketDisconnect();
    this.app.logout();
  }

}
