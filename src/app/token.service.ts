import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from './Token';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  private url = 'http://localhost:8080/tokens';

  getTokens(): Observable<Token[]>{
    return this.http.get<Token[]>(this.url);
  }

  constructor(private http: HttpClient) { }
}
