import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from '../../services/users.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { first, map } from 'rxjs';
import { UserDto } from 'src/app/models/user.dto';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent {
  public users!: User[];

  constructor(
    private usersService: UsersService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public onDelete(id: number): void {
    this.usersService
      .delete(id)
      .pipe(first())
      .subscribe({
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.getUsers();
        },
      });
  }

  public getUsers(): void {
    this.usersService
      .findAll()
      .pipe(
        first(),
        map((userDto: UserDto[]) =>
          userDto.map((userDto) => {
            const mappedUser: User = {
              id: userDto.id!,
              username: userDto.username,
              email: userDto.email,
              password: userDto.password!,
              role: userDto.role,
            };
            return mappedUser;
          })
        )
      )
      .subscribe({
        next: (response) => {
          this.users = response;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
