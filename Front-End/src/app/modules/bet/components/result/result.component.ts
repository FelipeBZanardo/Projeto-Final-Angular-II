import { Component, Input, OnInit } from '@angular/core';
import { first, map } from 'rxjs';
import { ResultDto } from 'src/app/modules/bet/components/result/models/result.dto.model';
import { Result } from 'src/app/modules/bet/components/result/models/result.model';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit{
  @Input() public betId!: number;

  public result?: Result;
  public errorMessage?: string;

  constructor(private resultService: ResultService){}

  ngOnInit(): void {
    this.resultService.findById(this.betId)
    .pipe(
      first(),
      map((resultDto: ResultDto) => {
      const mappedResult: Result = {
        raffleNumber: resultDto.numeroSorteio,
        raffleDate: resultDto.dataSorteio,
        dozensDrawn: resultDto.dezenasSorteadas,
        dozensBet: resultDto.dezenasApostadas,
        accumulated: resultDto.acumulado,
        score: resultDto.pontuacao,
        award: resultDto.valorPremio,
      }
      return mappedResult;
    }))
    .subscribe({
      next: (response) => {
        this.result = response;
      },
      error: (err) => {
        this.errorMessage = err.error;
      }
    });
}

}
