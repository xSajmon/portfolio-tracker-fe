import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './modules/login/login.component';
import { TransactionTrackerComponent } from './modules/transaction-tracker/transaction-tracker.component';
import { UserDetailsComponent } from './modules/user-details/user-details.component';

const routes: Routes = [
  { path: 'user', component: UserDetailsComponent, canActivate: [AuthGuard]},
  { path: 'transactions', component: TransactionTrackerComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }