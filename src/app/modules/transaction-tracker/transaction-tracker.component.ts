import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { WebSocketService } from '../../core/services/web-socket.service';
import { AddTransactionDialogComponent } from './transaction-add-dialog/add-transaction-dialog.component';
import { Transaction } from './models/transaction.model';
import { TransactionService } from './services/transaction.service';
import { filter } from "rxjs/operators";
import { FilterTransactionPipe } from './pipes/filter-transaction.pipe';

@Component({
  selector: 'app-transaction-tracker',
  templateUrl: './transaction-tracker.component.html',
  styleUrls: ['./transaction-tracker.component.css']
})
export class TransactionTrackerComponent implements OnInit {

  transactions!: Transaction[]
  transactionsCompleted!: Transaction[]
  clickedElement?: Transaction

  tableColumnsActive = [
    {columnDef: 'token', header: 'Token', cell: (element: Transaction) => `${element.token}`},
    {columnDef: 'amount', header: 'Amount', cell: (element: Transaction) => `${element.amount}$`},
    {columnDef: 'date', header: 'Date', cell: (element: Transaction) => `${element.startDate}`},
    {columnDef: 'buying', header: 'Buying price', cell: (element: Transaction) => `${element.buyingPrice}$`},
    {columnDef: 'current', header: 'Current price', cell: (element: Transaction) => `${this.formatCellNumber(element.currentPrice)}$`},
    {columnDef: 'profit', header: 'Profit/Loss', cell: (element: Transaction) => `~${this.formatCellNumber(element.profit)}`}
  ];

  tableColumnsCompleted = [
    {columnDef: 'token', header: 'Token', cell: (element: Transaction) => `${element.token}`},
    {columnDef: 'amount', header: 'Amount', cell: (element: Transaction) => `${element.amount}$`},
    {columnDef: 'startDate', header: 'Start date', cell: (element: Transaction) => `${element.startDate}`},
    {columnDef: 'endDate', header: 'End date', cell: (element: Transaction) => `${element.endDate}`},
    {columnDef: 'buying', header: 'Buying price', cell: (element: Transaction) => `${element.buyingPrice}$`},
    {columnDef: 'selling', header: 'Selling price', cell: (element: Transaction) => `${element.sellingPrice}$`},
    {columnDef: 'profit', header: 'Profit/Loss', cell: (element: Transaction) => `~${this.socketService.calculateProfit(element.amount, element.buyingPrice, element.sellingPrice)}`}
  ];

  displayedColumns = this.tableColumnsActive.map(c=>c.columnDef);

  constructor(public dialog: MatDialog, 
    private transactionService: TransactionService, 
    private socketService: WebSocketService,
    private transactionPipe: FilterTransactionPipe){
  }

  ngOnInit(): void {
    this.socketService.fetchTransactions();
    this.socketService.transactions.subscribe(data => {
      this.transactions = this.transactionPipe.transform(data, "ACTIVE");
      this.transactionsCompleted = this.transactionPipe.transform(data, "COMPLETED");
   })
  }

  formatCellNumber(num: number): string{
    if (isNaN(num) || num === undefined){
      return ""
    }
    return num.toString();
  }

  getTransactions(){
    this.transactionService.getTransactions().subscribe({
      next: data => {
        this.transactions = data;
      }
    })
  }

  openDialog() {
    this.dialog.open(AddTransactionDialogComponent);
  }

  onClickedTransaction(transaction: Transaction){
    this.clickedElement = transaction
  }
}

