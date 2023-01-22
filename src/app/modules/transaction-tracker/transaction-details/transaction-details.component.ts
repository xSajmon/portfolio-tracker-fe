import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css'],
})
export class TransactionDetailsComponent {

  constructor(private transactionService: TransactionService){}
 
  @Input() clickedElement?: Transaction
  collapsed = true
 

  getPossibleBalance(): string{
    let str = "";
    if(this.clickedElement){
      let balance = this.clickedElement.amount + this.clickedElement.profit;
      let profit = this.calculateProfitPercentage(this.clickedElement.profit, this.clickedElement.amount);
      switch(profit > 0){
        case true:
          str = `${balance.toFixed(2)}$ (+${profit.toFixed(2)}%)`;
          break;
        case false:
          str = `${balance.toFixed(2)}$ (-${profit.toFixed(2)}%)`;
      }
    }
    return str;
  }

  calculateProfitPercentage(profit: number, costPrice: number): number{
    return profit/costPrice * 100;
  }

  completeTransaction(){
      this.transactionService.completeTransaction(this.clickedElement!.id, this.clickedElement!.currentPrice)
        .subscribe((data) => {
          console.log(data)
          this.collapsed = true
        })

      
  }

 

}
