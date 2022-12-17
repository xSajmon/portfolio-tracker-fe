import { HttpErrorResponse } from '@angular/common/http';
import { ParseError } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs'
import { AppService } from '../app.service';
import { Token } from './token/Token';
import { TokenService } from './token/token.service';
import { Transaction } from './Transaction';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions: Transaction[] = [];
  prices: Token[] = [];
  tableColumns = [
    {
      columnDef: 'token',
      header: 'Token',
      cell: (element: Transaction) => `${element.token}`
    },
    {
      columnDef: 'amount',
      header: 'Amount',
      cell: (element: Transaction) => `${element.amount}$`
    },
    {
      columnDef: 'date',
      header: 'Date',
      cell: (element: Transaction) => `${element.date}`
    },
    {
      columnDef: 'buying',
      header: 'Buying price',
      cell: (element: Transaction) => `${element.buyingPrice}$`
    },
    {
      columnDef: 'current',
      header: 'Current price',
      cell: (element: Transaction) => `${element.currentPrice}$`
    },
    {
      columnDef: 'profit',
      header: 'Profit/Loss',
      cell: (element: Transaction) => `~${element.profit}$`
    }
  ];

  displayedColumns = this.tableColumns.map(c=>c.columnDef);

  constructor(public dialog: MatDialog, private transactionService: TransactionService){
    this.fetchPrices();
    this.fetchTransactions();
  }

  public transactionClient : any;
  public priceClient: any;

  fetchTransactions() {
    const serverUrl = 'http://localhost:8080/test';
    const ws = new SockJS(serverUrl);
    this.transactionClient = Stomp.over(ws);
    const that = this;
    this.transactionClient.connect({}, function(frame: any) {
      that.transactionClient.subscribe('/topic/transactions', (message: any) => {
        const data: Transaction[] = JSON.parse(message.body);

        data.forEach(element => {
          let currentPrice = that.prices.find(x => x.name == element.token.slice(0, element.token.indexOf(' ')))?.price!;
          element.currentPrice = currentPrice;
          element.profit = parseFloat(((element.amount / element.buyingPrice - element.amount / currentPrice) * currentPrice).toFixed(2));
        })
        that.transactions = data;
  });
  });
}

  fetchPrices() {
    const serverUrl = 'http://localhost:8080/test';
    const ws = new SockJS(serverUrl);
    this.priceClient = Stomp.over(ws);
    const that = this;
    this.priceClient.connect({}, function(frame: any) {
      that.priceClient.subscribe('/topic/crypto-price', (message: any) => {
        let data: Token[] = JSON.parse(message.body);
        that.prices = data;
      });
  });
  }

  ngOnInit(): void {
    // this.getTransactions();
    
  }



  getTransactions(){
    this.transactionService.getTransactions().subscribe({
      next: data => {
        this.transactions = data;
      }
    })
  }

  openDialog() {
    this.dialog.open(AddTransactionDialog);
  }


}

@Component({
  selector: 'add-transaction-dialog',
  templateUrl: 'add-transaction-dialog.html',
})
export class AddTransactionDialog implements OnInit{

  constructor(public dialogRef: MatDialogRef<AddTransactionDialog>, 
    private transactionService: TransactionService,
    private appService: AppService,
    private tokenService: TokenService) {
      dialogRef.disableClose = true;
    }

  tokenNames: string[] = []
  price?: number;
  walletBalance?: number;
  step?: number;
  amount: number = 0;
  walletId?: number;
  token = new FormControl<string>('');
  amountErrorMessage: string = ''


  ngOnInit(): void {
    this.getTokenNames();
    this.getWalletBalance();
    this.getWalletId();
  }

  public formatLabel(value: number): string{
    return value/this.walletBalance!*100 + '%';
}

  public getWalletBalance(): void{
    this.transactionService.getUserBalance().subscribe(data => {
      this.walletBalance = data;
      this.step = data/4;
    })
  }

  public getTokenNames(): void{
    this.tokenService.getTokenNames()
      .subscribe(result => this.tokenNames = result);
  }

  public getTokenPrice(name: string): void{
    this.tokenService.getTokenPrice(name)
    .subscribe(result => this.price = result.price);
  }

  public changeName(event: any){
      this.getTokenPrice(event);
  }

  public getWalletId(){
    this.walletId = this.appService.getUserData().walletId;
  }

  save(walletId: number, token: string, amount: number){
    this.transactionService.addTransaction(walletId, token, amount).subscribe({
      next: data => {
        console.log(data);
    },
    error: error => {
      console.log(error);
      this.handleError(error);
    }
  });
  }

  handleError(error: HttpErrorResponse){
    if(error.error['token']){
      console.log(error.error['token']);
      this.token.setErrors({tokenError: error.error['token']});
    }
    if(error.error['amount']){
      this.amountErrorMessage = error.error['amount'];
    }
  }
}