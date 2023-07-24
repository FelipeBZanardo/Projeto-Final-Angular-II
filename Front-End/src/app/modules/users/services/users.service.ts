import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'src/app/modules/users/models/user.model';
import { UserDto } from 'src/app/modules/users/models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private urlApi = 'http://localhost:8080/minha-quina/api/v1/usuarios';

  public findAll(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.urlApi);
  }

  public findById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.urlApi}/${id}`);
  }

  public create(user: User): Observable<UserDto> {
    return this.http.post<UserDto>(
      `${this.urlApi}/cadastro`,
      this.mapUser(user)
    );
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}/deletar`);
  }

  private mapUser(user: User): UserDto {
    const userDto: UserDto = {
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    };
    return userDto;
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(
      `${this.urlApi}/${user.id}/editar`,
      this.mapUser(user)
    );
  }
}
