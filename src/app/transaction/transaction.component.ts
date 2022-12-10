import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog'

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
export class AddTransactionDialog {
  constructor(public dialogRef: MatDialogRef<AddTransactionDialog>) {}

  save(){
    console.log("Transaction saved.");
  }
}