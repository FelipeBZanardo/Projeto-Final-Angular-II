import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {

  public users!: User[];

  constructor (private usersService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public onDelete(id: number): void {
    this.usersService.delete(id);
    this.getUsers();
  }

  public getUsers(): void{
    this.users = this.usersService.findAll();
  } 

}
