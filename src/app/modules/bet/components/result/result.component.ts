import { Component } from '@angular/core';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {

  public result: Result = {
    raffleNumber: 6111,
    raffleDate: '2023-03-28',
    dozensDrawn: [
      1,
		  26,
		  48,
		  55,
		  63
    ],
    dozensBet: [
      2,
		  58,
		  25,
		  62,
		  3
    ],
    accumulated: false,
    score: 0,
    award: 0
  }

}
