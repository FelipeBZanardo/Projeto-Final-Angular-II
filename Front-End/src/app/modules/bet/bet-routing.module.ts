import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBetComponent } from './components/create-bet/create-bet.component';
import { ListBetComponent } from './components/list-bet/list-bet.component';
import { authGuard } from 'src/app/core/guards/functional-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ListBetComponent,
    canActivate: [authGuard],
    data: {
      roles: ['ADMIN', 'USER'],
    },
  },
  {
    path: 'create',
    component: CreateBetComponent,
    canActivate: [authGuard],
    data: {
      roles: ['ADMIN', 'USER'],
    },
  },
  {
    path: 'edit/:id',
    component: CreateBetComponent,
    canActivate: [authGuard],
    data: {
      roles: ['ADMIN', 'USER'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BetRoutingModule { }
