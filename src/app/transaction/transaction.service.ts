import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private appService: AppService, private http: HttpClient) { }

  getUserBalance() :Observable<number>{
    const id = this.appService.getUserData().walletId;
    const url = 'http://localhost:8080/wallets/' + id + '/balance';
    return this.http.get<number>(url)
  }
}
