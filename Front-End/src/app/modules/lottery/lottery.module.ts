import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LotteryRoutingModule } from './lottery-routing.module';
import { LotteryComponent } from './lottery.component';
import { LotteryDrawDataComponent } from './components/lottery-draw-data/lottery-draw-data.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [LotteryComponent, LotteryDrawDataComponent],
  imports: [
    CommonModule,
    LotteryRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatChipsModule,
    MatExpansionModule,
  ],
})
export class LotteryModule {}
