import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from '../../services/users.service';
import { Role } from 'src/app/constants/role.enum';
import { UserDto } from 'src/app/models/user.dto';
import { distinctUntilChanged, first, map } from 'rxjs';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  public id?: number;
  public title = 'Novo Usuário';
  public roles!: Role[];

  public userForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.roles = [Role.ADMIN, Role.USER];
    this.buildForm();

    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.title = 'Editar Usuário';
      this.updateForm();
    }
  }

  public buildForm(): void {
    this.userForm = new FormGroup({
      id: new FormControl(),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required]),
    });
  }

  private updateForm(): void {
    // this.usersService
    //   .findById(this.id!)
    //   .pipe(
    //     first(),
    //     map((userDto: UserDto) => {
    //       const mappedUser: User = {
    //         id: userDto.id!,
    //         username: userDto.username,
    //         email: userDto.email,
    //         password: userDto.password,
    //         role: userDto.email,
    //       };
    //       return mappedUser;
    //     })
    //   )
    //   .subscribe({
    //     error: (err) => {
    //       console.log(err);
    //     },
    //   });
  }

  public onSubmit(): void {
    if (this.id) {
      this.usersService
        .update(this.userForm.getRawValue())
        .pipe(
          first(),
          distinctUntilChanged(
            (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
          )
        )
        .subscribe({
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.router.navigate(['/users']);
          },
        });
    } else {
      this.usersService
        .create(this.userForm.getRawValue())
        .pipe(first())
        .subscribe({
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.router.navigate(['/users']);
          },
        });
    }
  }

  public onCancel(): void {
    this.router.navigate(['/users']);
  }
}
