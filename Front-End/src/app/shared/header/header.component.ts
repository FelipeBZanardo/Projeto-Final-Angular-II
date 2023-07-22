import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  public logout(): void {
    this.authService.logout().subscribe({
      next: (next) => {
        console.log(next);
      },
      error: (err) => {
        if (err.error.text == 'Logout feito com sucesso') {
          sessionStorage.removeItem('TOKEN');
          sessionStorage.removeItem('ROLE');
          this.router.navigate(['/auth/login']);
        }
        console.log(err);
      },
      complete: () => {
        sessionStorage.removeItem('TOKEN');
        sessionStorage.removeItem('ROLE');
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
