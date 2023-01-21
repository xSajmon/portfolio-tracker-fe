import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Token } from '../../modules/transaction-tracker/models/token.model';
import { Transaction } from '../../modules/transaction-tracker/models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() {}
  
  host: string = 'http://localhost:8080/test';
  isConnected = false;
  transactionList: Transaction[] = [];
  transactions = new BehaviorSubject<Transaction[]>([])
  prices: Token[] = [];
  client : any;
  
  fetchTransactions() {
    if(!this.isConnected){
      const ws = new SockJS(this.host);
      this.client = Stomp.over(ws);
      this.client.connect({}, () => {
        this.isConnected = true;

        this.client.subscribe('/topic/transactions', (message: any) => {
          const data: Transaction[] = JSON.parse(message.body);
          this.transactionList = data;
          this.updatePrices();
        });
        this.client.subscribe('/topic/crypto-price', (message: any) => {
          this.prices = JSON.parse(message.body);
          this.updatePrices();
        });
      });
     
  }
}

updatePrices(): void{
  this.transactionList.map(transaction => {
    let currentPrice = this.getCurrentTokenPrice(this.prices, transaction);
    transaction.currentPrice = currentPrice;
    transaction.profit =  this.calculateProfit(transaction.amount, transaction.buyingPrice, currentPrice);
    return transaction;
  })
  this.transactions.next(this.transactionList);
}

convertTransactionTokenName(transaction: Transaction): string{
  return transaction.token.slice(0, transaction.token.indexOf('('));
}

getCurrentTokenPrice(tokens: Token[], transaction: Transaction): number{
  return tokens.find(token => token.name == this.convertTransactionTokenName(transaction))?.price!;
}

calculateProfit(amount: number, buyingPrice: number, currentPrice: number): number{
  return parseFloat(((amount/buyingPrice - amount/currentPrice) * currentPrice).toFixed(2));
}


socketDisconnect(){
  this.client.disconnect();
}
}
