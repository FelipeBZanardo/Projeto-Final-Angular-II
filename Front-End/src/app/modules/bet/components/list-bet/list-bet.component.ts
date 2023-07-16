import { Component, OnInit } from '@angular/core';
import { first, map } from 'rxjs';
import { BetDto } from 'src/app/models/bet.dto.model';
import { Bet } from 'src/app/models/bet.model';
import { BetService } from '../../services/bet.service';

@Component({
  selector: 'app-list-bet',
  templateUrl: './list-bet.component.html',
  styleUrls: ['./list-bet.component.css']
})
export class ListBetComponent implements OnInit{
  public bets!: Bet[];
  panelOpenState = false;

  constructor (private betService: BetService) {}

  ngOnInit(): void {
    this.getBets();
  }
  
  public onDelete (id: number) {
    this.betService
      .delete(id)
      .pipe(first())
      .subscribe({
        error: (err) => {
          console.log(err)
        },
        complete: () => {
          this.getBets();
        },
      });
  }

  private getBets(): void {
    this.betService
    .findAll()
    .pipe(
      first(),
      map((betsDto: BetDto[]) => 
        betsDto.map(betDto => {
          const mappedBet: Bet = {
            id: betDto.id!,
            raffleNumber: betDto.numeroSorteio,
            dozens: betDto.dezenas,
            betDate: betDto.dataJogo
          }
          return mappedBet;
        })))
    .subscribe({
      next: (response) => {
        this.bets = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
