import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { authGuard } from 'src/app/core/guards/functional-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ListUserComponent,
    canActivate: [authGuard],
    data: {
      roles: ['ADMIN'],
    },
  },
  {
    path: 'create',
    component: CreateUserComponent,
    canActivate: [authGuard],
    data: {
      roles: ['ADMIN'],
    },
  },
  {
    path: 'edit/:id',
    component: CreateUserComponent,
    canActivate: [authGuard],
    data: {
      roles: ['ADMIN'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
