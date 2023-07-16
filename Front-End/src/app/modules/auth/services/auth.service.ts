import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from '../../users/services/users.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginCredentials } from 'src/app/models/login-credentials.model';
import { LoginResponse } from 'src/app/models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlApi = "http://localhost:8080/auth";

  constructor(private usersService: UsersService, private http: HttpClient) {
  }

  public login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.urlApi}/login`, credentials);
  }

  public logout(): void {
    //localStorage.removeItem('TOKEN');
  }
}
