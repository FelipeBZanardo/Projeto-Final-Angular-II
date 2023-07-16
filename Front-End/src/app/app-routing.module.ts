import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  }, 
  { 
    path: 'auth', 
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) 
  }, 
  { 
    path: 'users', 
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) 
  },
  { 
    path: 'bet', 
    loadChildren: () => import('./modules/bet/bet.module').then(m => m.BetModule) 
  }, 
  {
    path: 'lottery',
    loadChildren: () =>
      import('./modules/lottery/lottery.module').then(m => m.LotteryModule)
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
