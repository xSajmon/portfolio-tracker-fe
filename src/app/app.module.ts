import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorService } from './http-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import { TransactionComponent } from './transaction/transaction.component';
import { AddTransactionDialog } from "./transaction/add-transaction-dialog";
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { TransactionDetailsComponent } from './transaction/transaction-details/transaction-details.component'

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    TransactionComponent,
    AddTransactionDialog,
    TransactionDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
