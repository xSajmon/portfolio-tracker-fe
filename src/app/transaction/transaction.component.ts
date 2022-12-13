import { ParseError } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import { TokenService } from './token/token.service';
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
    private tokenService: TokenService) {
      dialogRef.disableClose = true;
    }

  tokenNames: string[] = []
  price?: number;
  walletBalance?: number;
  step?: number;
  amount: number = 0;

  ngOnInit(): void {
    this.getTokenNames();
    this.getWalletBalance();
   
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

  save(){
    console.log("Transaction saved.");
  }
}