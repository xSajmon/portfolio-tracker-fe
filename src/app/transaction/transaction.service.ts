import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { Transaction } from './Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private appService: AppService, private http: HttpClient) { }
  transactionUrl = 'http://localhost:8080/transactions'

  getUserBalance() :Observable<number>{
    const id = this.appService.getUserData().walletId;
    const url = 'http://localhost:8080/wallets/' + id + '/balance';
    return this.http.get<number>(url)
  }

  addTransaction(walletId: number, token: string, amount: number) {
    return this.http.post<any>(this.transactionUrl, {
      walletId: walletId,
      token: token,
      amount: amount
    });
  }

  getTransactions(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.transactionUrl);
  }
}
