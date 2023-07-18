import { Prize } from './prize.model';

export interface LotteryDraw {
  numeroConcursoProximo: number;
  acumulado: boolean;
  dataSorteio: string;
  dataProximoSorteio: string;
  valorAcumuladoProximoConcurso: number;
  numero: number;
  listaDezenas: number[];
  listaRateioPremio: Prize[];
}
