import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  public findAll(): User[] {
    return JSON.parse(localStorage.getItem('USERS') || '[]');
  }

  public findByUsername(username: string): User | undefined {
    const users = this.findAll();
    return users.find((u) => u.username === username);
  }

  public findById(id: number): User | undefined {
    const users = this.findAll();
    return users.find((u) => u.id == id);
  }

  public create(user: User): boolean {
    if (this.findByUsername(user.username)){
      return false;
    }
    user.id =  Math.floor(Math.random() * (Math.floor(1000) - Math.ceil(1)) + Math.ceil(1));
    const users = this.findAll();
    users.push(user);
    this.setLocalStorage(users);
    return true;
  }

  public delete(id: number): void {
    const users = this.findAll();
    let idFound = users.findIndex(u => u.id === id);
    users.splice(idFound, 1);
    this.setLocalStorage(users);
    
  }

  private setLocalStorage(users: User[]): void {
    localStorage.setItem('USERS', JSON.stringify(users));
  }

  public update(user: User) : boolean{
    const users = this.findAll();
    let idFound = users.findIndex(u => u.id === user.id);
    if (idFound < 0) return false;
    users[idFound] = user;
    this.setLocalStorage(users);
    return true;
  }
}
