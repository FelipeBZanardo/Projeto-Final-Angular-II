import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { LoginCredentials } from 'src/app/models/login-credentials.model';
import { UserDto } from 'src/app/models/user.dto';
import { AuthService } from '../../services/auth.service';

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
        error: (err) => {
          this.errorMessage = 'Credenciais inválidas. Tente novamente!';
        },
        complete: () => {
          this.router.navigate(['/bet']);
        },
      });
  }
}
