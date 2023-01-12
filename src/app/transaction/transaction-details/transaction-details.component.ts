import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Transaction } from '../Transaction';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css'],
})
export class TransactionDetailsComponent{
  
  @Input() clickedElement?: Transaction
 

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

}
