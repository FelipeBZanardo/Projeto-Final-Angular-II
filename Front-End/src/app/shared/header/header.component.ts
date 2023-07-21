import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor (public authService: AuthService, private router: Router) {}

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
