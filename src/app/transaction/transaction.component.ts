import { ParseError } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog'
import { WebSocketService } from '../web-socket.service';
import { AddTransactionDialog } from './add-transaction-dialog';
import { Transaction } from './Transaction';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions!: Transaction[]
  clickedElement?: Transaction

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
      cell: (element: Transaction) => `${this.formatCellNumber(element.currentPrice)}$`
    },
    {
      columnDef: 'profit',
      header: 'Profit/Loss',
      cell: (element: Transaction) => `~${this.formatCellNumber(element.profit)}`  
      
    }
  ];

  displayedColumns = this.tableColumns.map(c=>c.columnDef);

  constructor(public dialog: MatDialog, 
    private transactionService: TransactionService, 
    private socketService: WebSocketService){
  }

  ngOnInit(): void {
    this.socketService.fetchTransactions();
    this.socketService.transactions.subscribe(data => {
      this.transactions = data;
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
    this.dialog.open(AddTransactionDialog);
  }
}

