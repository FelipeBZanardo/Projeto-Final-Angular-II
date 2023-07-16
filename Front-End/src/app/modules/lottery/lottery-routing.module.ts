import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LotteryComponent } from './lottery.component';
import { LotteryDrawDataComponent } from './components/lottery-draw-data/lottery-draw-data.component';

const routes: Routes = [{ path: '', component: LotteryDrawDataComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LotteryRoutingModule {}
