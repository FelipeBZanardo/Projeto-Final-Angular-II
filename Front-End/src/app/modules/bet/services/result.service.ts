import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultDto } from 'src/app/models/result.dto.model';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) {}

  private urlApi = 'http://localhost:8080/minha-quina/api/v1/apostas';

  public findById(id: number): Observable<ResultDto> {
    return this.http.get<ResultDto>(`${this.urlApi}/${id}/resultados`);
  }
}
