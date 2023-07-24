import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/modules/users/models/user.model';
import { UsersService } from '../../services/users.service';
import { Role } from 'src/app/constants/role.enum';
import { UserDto } from 'src/app/modules/users/models/user.dto';
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
  public errorMessage?: string;

  public userForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  public errorMessages: { [key: string]: string } = {
    username: `Deve possuir entre 5 e 20 caracteres. Pode conter letras maiúsculas e minúsculas, números, sublinhados e pontos.`,
    password: `Deve possuir entre 8 e 20 caracteres. Deve conter pelo menos um número, uma letra minúscula, uma letra maiúscula e um caractere especial.`,
    // Adicione outras mensagens de erro para campos adicionais, se necessário.
  };

  public getErrorMessage(field: string): string {
    return (
      this.errorMessages[field] || 'Ocorreu um erro ao processar a solicitação.'
    );
  }

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
      username: new FormControl(null, [
        Validators.required,
        Validators.pattern('[\\w\\p{L}.]{5,20}'),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–{}:;',?/*~$^+=<>]).{8,20}$"
        ),
      ]),
      role: new FormControl(null, [Validators.required]),
    });
  }

  private updateForm(): void {
    this.usersService
      .findById(this.id!)
      .pipe(
        first(),
        map((userDto: UserDto) => {
          const mappedUser: User = {
            id: userDto.id!,
            username: userDto.username,
            email: userDto.email,
            password: userDto.password,
            role: userDto.role,
          };
          return mappedUser;
        })
      )
      .subscribe({
        next: (response) => {
          this.userForm.patchValue(response as User);
        },
        error: (err) => {
          console.log(err);
        },
      });
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
            this.errorMessage = err.error;
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
            this.errorMessage = err.error;
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
