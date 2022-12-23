import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Token } from './transaction/token/Token';
import { Transaction } from './transaction/Transaction';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() {}
  
  host: string = 'http://localhost:8080/test';
  isConnected = false;
  transactions = new BehaviorSubject<Transaction[]>([])
  prices: Token[] = [];
  client : any;
  
  fetchTransactions() {
    if(!this.isConnected){
      const ws = new SockJS(this.host);
      this.client = Stomp.over(ws);
      const that = this;
      this.client.connect({}, () => {
        this.isConnected = true;
        this.client.subscribe('/topic/crypto-price', (message: any) => {
          let data: Token[] = JSON.parse(message.body);
          that.prices = data;
        });

        this.client.subscribe('/topic/transactions', (message: any) => {
          const data: Transaction[] = JSON.parse(message.body);
          data.forEach(element => {
            let currentPrice = that.prices.find(x => x.name == element.token.slice(0, element.token.indexOf(' ')))?.price!;
            element.currentPrice = currentPrice;
            element.profit = parseFloat(((element.amount / element.buyingPrice - element.amount / currentPrice) * currentPrice).toFixed(2));
          })
          that.transactions.next(data);
    });
      });
  }
}

  socketDisconnect(){
    this.client.disconnect();
  }
}
