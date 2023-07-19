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
  public drawData?: LotteryDraw;
  public maxDrawNumber: number = 0;
  public panelOpenState = false;

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
        this.drawData = response;
        this.maxDrawNumber = response.numero;
      },
      error: (err) => {
        this.snackbarService.openSnackBar(err.message);
      },
    });
  }

  public getDrawDataByNumber(numero: number): void {
    this.lotteryService.getLotteryDrawDataByNumber(numero).subscribe({
      next: (response) => {
        this.drawData = response;
      },
      error: (err) => {
        this.snackbarService.openSnackBar(err.message);
      },
    });
  }

  public onPrevious(): void {
    if (this.drawData?.numero) {
      this.getDrawDataByNumber(this.drawData.numero - 1);
    }
  }

  public onNext(): void {
    if (this.drawData?.numero) {
      if (this.drawData.numero < this.maxDrawNumber) {
        this.getDrawDataByNumber(this.drawData.numero + 1);
      } else {
        this.snackbarService.openSnackBar(
          'Não há sorteios posteriores ao atual.'
        );
      }
    }
  }
}
