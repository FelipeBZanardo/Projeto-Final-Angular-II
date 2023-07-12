import { Component, OnInit } from '@angular/core';
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
    this.getProducts();
  }
  
  public onDelete (id: number) {
    this.betService.delete(id);
    this.getProducts();
  }

  private getProducts(): void {
    this.bets = this.betService.findAll();
  }

}
