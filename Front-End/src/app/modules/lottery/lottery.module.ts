import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LotteryRoutingModule } from './lottery-routing.module';
import { LotteryComponent } from './lottery.component';


@NgModule({
  declarations: [
    LotteryComponent
  ],
  imports: [
    CommonModule,
    LotteryRoutingModule
  ]
})
export class LotteryModule { }
