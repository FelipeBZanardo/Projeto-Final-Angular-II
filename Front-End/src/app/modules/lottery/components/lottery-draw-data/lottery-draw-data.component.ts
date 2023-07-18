import { Component, OnInit } from '@angular/core';
import { LotteryService } from '../../services/lottery.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { LotteryDraw } from '../../models/lottery-draw.model';

@Component({
  selector: 'app-lottery-draw-data',
  templateUrl: './lottery-draw-data.component.html',
  styleUrls: ['./lottery-draw-data.component.css'],
})
export class LotteryDrawDataComponent implements OnInit {
  [x: string]: any;
  public drawData?: LotteryDraw;
  // public drawData?: string;
  private localStorageToken = localStorage.getItem('TOKEN');
  constructor(
    private lotteryService: LotteryService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getDrawData();
  }

  public getDrawData(): void {
    this.lotteryService.getLotteryLastDrawData().subscribe({
      next: (response) => {
        // this.drawData =JSON.stringify(response);
        this.drawData = response;
      },
      error: (err) => {
        this.snackbarService.openSnackBar(err.message);
      },
    });
  }
}
