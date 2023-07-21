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

  public logout(): void {
    sessionStorage.removeItem('TOKEN');  
    sessionStorage.removeItem('ROLE');  
  }

  public isLoggedIn(): Observable<boolean> {
    const token = sessionStorage.getItem('TOKEN');
    return token ? of(true) : of(false);
  }

  public checkUserRoles(roles: Role[]): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      
      const roleUser = JSON.parse(
        sessionStorage.getItem('ROLE') || 'undefined'
      );

      if (roles.includes(roleUser)) {
        subscriber.next(true);
      }

      subscriber.next(false);
    });
  }

  public getRole(): Observable<string> {
    return new Observable<string>((subscriber) => {

      const roleUser = JSON.parse(
        sessionStorage.getItem('ROLE') || ''
      );
      
      subscriber.next(roleUser);
    });
  }


}
