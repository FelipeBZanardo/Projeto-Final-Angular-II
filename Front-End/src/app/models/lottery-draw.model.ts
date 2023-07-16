import { Prize } from './prize.model';

export interface Result {
  nextRaffleNumber: number;
  accumulated: boolean;
  raffleDate: string;
  nextRaffleDate: string;
  accumulatedPrizeNextRaffle: number;
  raffleNumber: number;
  dozensDrawn: number[];
  prizeApportionments: Prize[];
}
