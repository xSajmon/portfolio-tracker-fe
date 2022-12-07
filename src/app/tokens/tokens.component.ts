import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { Token } from '../Token';


@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {
  tokens: Token[] = [];
  names: string[] = [];

  constructor(private tokenService: TokenService){}
  
  ngOnInit(): void {
    this.getTokens();
    this.getTokenNames();
  }

  public getTokens(): void{
    this.tokenService.getTokens()
      .subscribe(result => this.tokens = result);
  }

  public getTokenNames(): void{
    this.tokenService.getTokenNames()
      .subscribe(result => this.names = result);
  }

 

}
