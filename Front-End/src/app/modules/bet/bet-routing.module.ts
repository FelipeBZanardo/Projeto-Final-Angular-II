import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBetComponent } from './components/create-bet/create-bet.component';
import { ListBetComponent } from './components/list-bet/list-bet.component';

const routes: Routes = [
  {
    path: '',
    component: ListBetComponent,
  },
  {
    path: 'create',
    component: CreateBetComponent,
  },
  {
    path: 'edit/:id',
    component: CreateBetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BetRoutingModule { }
