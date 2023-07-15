import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BetDto } from 'src/app/models/bet.dto';
import { Bet } from 'src/app/models/bet.model';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  constructor(private http: HttpClient) {}

  private urlApi = "http://localhost:8080/minha-quina/api/v1/apostas";
  private headers = { 'Authorization': `Bearer ${this.tokenByLocalStorage}` }

  public findAll(): Observable<BetDto[]> {
    return this.http.get<BetDto[]>(this.urlApi, {headers: this.headers});
  }

  public findById(id: number): Observable<BetDto> {
    return this.http.get<BetDto>(`${this.urlApi}/${id}`, {headers: this.headers});
  }

  public create(bet: Bet): Observable<BetDto> {
    return this.http.post<BetDto>(this.urlApi, this.mapBet(bet), {headers: this.headers});
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}`, {headers: this.headers});
  }

  public update(bet: Bet) : Observable<Bet>{
    return this.http.put<Bet>(`${this.urlApi}/${bet.id}`, this.mapBet(bet), {headers: this.headers});
  }

  public formatDateISO(date: string): string{
    const year = date.substring(4);
    const month = date.substring(2,4);
    const day = date.substring(0,2);

    return year + '-' + month + '-' + day;
  }

  public formatDate(date: string): string{
    const day = date.substring(8);
    const month = date.substring(5,7);
    const year = date.substring(0,4);

    return day + month + year;
  }

  private mapBet(bet: Bet): BetDto{
    bet.dozens = bet.dozens.map(d => parseInt(Object.values(d)[0]));
    bet.betDate = this.formatDateISO(bet.betDate);
    const betDto: BetDto = {
      numeroSorteio: bet.raffleNumber,
      dezenas: bet.dozens,
      dataJogo: bet.betDate
    };
    return betDto;
  }

  private get tokenByLocalStorage() : string {
    localStorage.setItem('TOKEN', JSON.stringify('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmZWxpcGUuemFuYXJkbyIsImlhdCI6MTY4OTQ2MTQ0MSwiZXhwIjoxNjg5NDY1MDQxfQ.LEi-UcXhFVtz23ONtIjpmXOq1wkl70xlEupmHxqRmgc'));
    return JSON.parse(localStorage.getItem('TOKEN') || '');
  }
}
