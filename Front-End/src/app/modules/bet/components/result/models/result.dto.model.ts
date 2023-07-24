export interface ResultDto {
    numeroSorteio: number;
    dataSorteio: string;
    dezenasSorteadas: number[];
    dezenasApostadas: number[];
    acumulado: boolean;
    pontuacao: number;
    valorPremio: number;
}