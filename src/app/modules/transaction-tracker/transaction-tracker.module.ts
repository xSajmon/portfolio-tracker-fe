import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSliderModule} from '@angular/material/slider';
import { AddTransactionDialogComponent } from './transaction-add-dialog/add-transaction-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatTableModule } from '@angular/material/table'  
import { TransactionTrackerComponent } from './transaction-tracker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';




@NgModule({
  declarations: [
    AddTransactionDialogComponent,
    TransactionDetailsComponent,
    TransactionTrackerComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatButtonModule
  ]
})
export class TransactionTrackerModule { }
