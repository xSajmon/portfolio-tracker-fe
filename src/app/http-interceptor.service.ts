import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private appService: AppService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = this.appService.getAuthenticationToken()
    console.log(headers);
    if(headers){
      req = req.clone({
        setHeaders: {
          Authorization: headers
        }
      })
    }
    return next.handle(req)
  }
}
