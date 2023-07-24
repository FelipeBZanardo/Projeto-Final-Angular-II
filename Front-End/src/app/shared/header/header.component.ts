import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router, private snackbarService: SnackbarService) {}

  public logout(): void {
    this.authService.logout().subscribe({
      error: (err) => {
        if (err.error.text == 'Logout feito com sucesso') {
          sessionStorage.removeItem('TOKEN');
          sessionStorage.removeItem('ROLE');
          this.snackbarService.openSnackBar(err.error.text)
          this.router.navigate(['/auth/login']);
        }
      },
      complete: () => {
        sessionStorage.removeItem('TOKEN');
        sessionStorage.removeItem('ROLE');
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
