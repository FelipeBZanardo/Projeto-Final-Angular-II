import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/modules/users/services/users.service';
import { AuthService } from '../../services/auth.service';
import { LoginCredentials } from 'src/app/models/login-credentials.model';
import { first, map } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserDto } from 'src/app/models/user.dto';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public username?: string;
  public password?: string;
  public hide = true;
  public errorMessage?: string;
  public users!: UserDto[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    // this.users = this.usersService.findAll();
    this.usersService
      .findAll()
      // .pipe(
      //   first(),
      //   map((userDtos: UserDto[]) =>
      //     userDtos.map((userDto) => {
      //       const mappedUser: User = {
      //         id: userDto.id!,
      //         username: userDto.username,
      //         email: userDto.email,
      //         password: userDto.password!,
      //         role: userDto.role,
      //       };
      //       return mappedUser;
      //     })
      //   )
      // )
      .subscribe({
        next: (response) => {
          this.users = response;
        },
        error: (err) => {
          this.snackbarService.openSnackBar(err.message);
        },
      });
  }

  public login(): void {
    const payload: LoginCredentials = {
      username: this.username!,
      password: this.password!,
    };
    this.authService
      .login(payload)
      .pipe(first())
      .subscribe({
        next: (response) => {
          localStorage.setItem('TOKEN', response.token);
        },
        error: (err) => {
          this.errorMessage = 'Credenciais inválidas. Tente novamente!';
        },
        complete: () => {
          this.router.navigate(['/users']);
        },
      });
  }
}
