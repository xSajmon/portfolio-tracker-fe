import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpInterceptorService } from './core/interceptor/http-interceptor.service';
import { TransactionTrackerModule } from './modules/transaction-tracker/transaction-tracker.module';
import { LoginModule } from './modules/login/login.module';
import { UserDetailsModule } from './modules/user-details/user-details.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TransactionTrackerModule,
    LoginModule,
    UserDetailsModule,
    SharedModule
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
