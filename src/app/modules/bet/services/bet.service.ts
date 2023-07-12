import { Injectable } from '@angular/core';
import { Bet } from 'src/app/models/bet.model';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  constructor() { }

  public findAll(): Bet[] {
    return JSON.parse(localStorage.getItem('BETS') || '[]');
  }

  public findById(id: number): Bet | undefined {
    const bets = this.findAll();
    return bets.find((b) => b.id == id);
  }

  public create(bet: Bet): boolean {
    bet.id =  Math.floor(Math.random() * (Math.floor(1000) - Math.ceil(1)) + Math.ceil(1));
    const bets = this.findAll();
    bet.dozens = bet.dozens.map(d => Object.values(d)[0]);
    bets.push(bet);
    this.setLocalStorage(bets);
    return true;
  }

  public delete(id: number): void {
    const bets = this.findAll();
    let idFound = bets.findIndex(b => b.id === id);
    bets.splice(idFound, 1);
    this.setLocalStorage(bets);
    
  }

  private setLocalStorage(bets: Bet[]): void {
    localStorage.setItem('BETS', JSON.stringify(bets));
  }

  public update(bet: Bet) : boolean{
    const bets = this.findAll();
    bet.dozens = bet.dozens.map(d => Object.values(d)[0]);
    let idFound = bets.findIndex(b => b.id === bet.id);
    if (idFound < 0) return false;
    bets[idFound] = bet;
    this.setLocalStorage(bets);
    return true;
  }
}
