// interfaces/partida.ts
export interface Time {
  escudo: string;
  nome_popular: string;
}

export interface Partida {
  time_mandante?: Time;
  time_visitante?: Time;
  data_realizacao?: string;
  hora_realizacao?: string;
}
