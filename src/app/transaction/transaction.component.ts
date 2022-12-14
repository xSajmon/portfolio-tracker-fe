import { HttpErrorResponse } from '@angular/common/http';
import { ParseError } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import { AppService } from '../app.service';
import { TokenService } from './token/token.service';
import { Transaction } from './Transaction';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  constructor(public dialog: MatDialog){}

  ngOnInit(): void {}

  
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