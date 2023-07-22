import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Role } from 'src/app/constants/role.enum';
import { LoginCredentials } from 'src/app/models/login-credentials.model';
import { LoginResponse } from 'src/app/models/login-response.model';
import { UsersService } from '../../users/services/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi = 'http://localhost:8080/auth';

  constructor(private usersService: UsersService, private http: HttpClient) {}

  public login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.urlApi}/login`, credentials);
  }

  public logout(): Observable<string> {
    return this.http.get<string>(`${this.urlApi}/logout`);
  }

  public isLoggedIn(): Observable<boolean> {
    const token = sessionStorage.getItem('TOKEN');
    return token ? of(true) : of(false);
  }

  public checkUserRoles(roles: string): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      const roleUser = sessionStorage.getItem('ROLE') || '';
      console.log(roleUser);
      if (roles.includes(roleUser)) {
        subscriber.next(true);
      } else {
        subscriber.next(false);
      }
    });
  }

  public getRole(): Observable<string> {
    return new Observable<string>((subscriber) => {
      const roleUser = sessionStorage.getItem('ROLE') || '';
      subscriber.next(roleUser);
    });
  }
}
