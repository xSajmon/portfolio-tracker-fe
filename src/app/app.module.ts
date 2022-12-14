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
import { AddTransactionDialog, TransactionComponent } from './transaction/transaction.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    TransactionComponent,
    AddTransactionDialog
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
    MatInputModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
