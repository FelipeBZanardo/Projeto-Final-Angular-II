import { Injectable } from '@angular/core';
import { UsersService } from '../../users/services/users.service';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private usersService: UsersService) { }

  public login(credentials: Partial<User>): User | string {
    const user = this.usersService.findByUsername(credentials.username!);

    if (!user) {
      return 'Username não encontrado!';
    }

    if (user?.password !== credentials.password) {
      return 'Senha incorreta!';
    }

    localStorage.setItem('USER', JSON.stringify(user));
    return user;
  }

  public logout(): void {
    localStorage.removeItem('USER');
  }
}
