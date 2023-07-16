import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/modules/users/services/users.service';
import { AuthService } from '../../services/auth.service';
import { UserDto } from 'src/app/models/user.dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public username?: string;
  public password?: string;
  public users!: Observable<UserDto[]>; // todo revisar! alterei para não quebrar

  constructor(
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.users = this.usersService.findAll();
  }

  public login(): void {
    const result = this.authService.login({
      username: this.username,
      password: this.password,
    });

    console.log(typeof result);

    if (typeof result === 'string') {
      console.log(result);
      return;
    }

    this.router.navigate(['/users']);
  }
}
