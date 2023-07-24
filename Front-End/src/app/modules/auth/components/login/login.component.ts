import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { LoginCredentials } from 'src/app/modules/auth/models/login-credentials.model';
import { UserDto } from 'src/app/modules/users/models/user.dto';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public username?: string;
  public password?: string;
  public hide = true;
  public users!: UserDto[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {}

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
          sessionStorage.setItem('TOKEN', response.token);
          sessionStorage.setItem('ROLE', response.role);
        },
        error: () => {
          this.snackbarService.openSnackBar('Credenciais inválidas. Tente novamente!');
        },
        complete: () => {
          this.router.navigate(['/bet']);
        },
      });
  }
}
