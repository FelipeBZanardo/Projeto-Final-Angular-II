import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the user is logging in or signing up
    if (request.url.includes('/auth')) {
      // If it is, don't add the authentication token and let it pass through directly
      return next.handle(request);
    }
    // Get the token from the local storage
    const token = localStorage.getItem('TOKEN');

    // Clone the request and add the authorization header with the token
    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // Send the modified request
    return next.handle(authReq);
  }
}