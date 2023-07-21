import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guards/functional-auth.guard';
import { LotteryDrawDataComponent } from './components/lottery-draw-data/lottery-draw-data.component';

const routes: Routes = [
  { 
    path: '', 
    component: LotteryDrawDataComponent,
    canActivate: [authGuard],
    data: {
      roles: ['ADMIN'],
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LotteryRoutingModule {}
