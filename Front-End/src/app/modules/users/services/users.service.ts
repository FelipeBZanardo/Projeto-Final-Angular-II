import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserDto } from 'src/app/models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private urlApi = 'http://localhost:8080/minha-quina/api/v1/usuarios';
  private headers = { Authorization: `Bearer ${this.tokenByLocalStorage}` };

  // todo: endpoint find all
  public findAll(): Observable<UserDto[]> {
    return new Observable<UserDto[]>();
    //   return this.http.get<UserDto[]>(this.urlApi, {headers: this.headers});
  }

  // todo: endpoint find by id
  public findById(id: number): Observable<UserDto> {
    return new Observable<UserDto>();
    // return this.http.get<UserDto>(`${this.urlApi}/${id}`, {
    //   headers: this.headers,
    // });
  }

  // todo: endpoint find by username
  public findByUsername(username: string): Observable<UserDto> {
    return new Observable<UserDto>();
    // return this.http.get<UserDto>(`${this.urlApi}/username/${username}`, {
    //   headers: this.headers,
    // });
  }

  public create(user: User): Observable<UserDto> {
    return this.http.post<UserDto>(
      `${this.urlApi}/cadastro`,
      this.mapUser(user),
      { headers: this.headers }
    );
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}/deletar`, {
      headers: this.headers,
    });
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
      this.mapUser(user),
      { headers: this.headers }
    );
  }

  private get tokenByLocalStorage(): string {
    localStorage.setItem(
      'TOKEN',
      JSON.stringify(
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmZWxpcGUuemFuYXJkbyIsImlhdCI6MTY4OTQ3MjQ4OCwiZXhwIjoxNjg5NDc2MDg4fQ.qhW3VeH_nb0VsOmwGOy3fhFT8PBpX3otAFkf8H8cC4c'
      )
    );
    return JSON.parse(localStorage.getItem('TOKEN') || '');
  }
}
