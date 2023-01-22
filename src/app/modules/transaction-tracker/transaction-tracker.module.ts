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
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterTransactionPipe } from './pipes/filter-transaction.pipe';




@NgModule({
  declarations: [
    AddTransactionDialogComponent,
    TransactionDetailsComponent,
    TransactionTrackerComponent,
    FilterTransactionPipe
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
  
    BrowserAnimationsModule,
    MatButtonModule,
    SharedModule
  ],
  providers: [FilterTransactionPipe]
})
export class TransactionTrackerModule { }
