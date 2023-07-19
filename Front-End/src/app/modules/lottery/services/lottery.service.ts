import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LotteryDraw } from '../models/lottery-draw.model';

@Injectable({
  providedIn: 'root',
})
export class LotteryService {
  constructor(private http: HttpClient) {}

  getLotteryLastDrawData(): Observable<LotteryDraw> {
    return this.http.get<LotteryDraw>(
      'http://localhost:8080/minha-quina/api/v1/sorteios/external-search'
    );
  }

  getLotteryDrawDataByNumber(drawNumber: number): Observable<LotteryDraw> {
    return this.http.get<LotteryDraw>(
      `http://localhost:8080/minha-quina/api/v1/sorteios/external-search/${drawNumber}`
    );
  }
}
