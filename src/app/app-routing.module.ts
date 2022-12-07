import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { TokensComponent } from './tokens/tokens.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'tokens', component: TokensComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }