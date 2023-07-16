import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from '../../users/services/users.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginCredentials } from 'src/app/models/login-credentials.model';
import { LoginResponse } from 'src/app/models/login-response.model';
import { UserDto } from 'src/app/models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private usersService: UsersService) {}

  // todo revisar! alterei para não quebrar
  public login(credentials: Partial<User>): Observable<UserDto> | string {
    const userLogin: Partial<User> = {
      username: credentials.username,
      password: credentials.password,
    };

    const user = this.usersService.findByUsername(credentials.username!);

    if (!user) {
      return 'Username não encontrado!';
    }

    // todo corrigir!
    // if (user?.password !== credentials.password) {
    //   return 'Senha incorreta!';
    // }

    localStorage.setItem('USER', JSON.stringify(user));
    return user;
  }

  public logout(): void {
    //localStorage.removeItem('TOKEN');
  }
}
