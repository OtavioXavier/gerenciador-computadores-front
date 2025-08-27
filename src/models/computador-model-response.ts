export type ComputadorGetAllResponse = {
  dados: Computadores[],
  status: number;
  mensagem: string;
  sucesso: boolean;
}

export type ComputadorGetResponse = {
  dados: Computadores,
  status: number;
  mensagem: string;
  sucesso: boolean;
}

export type Computadores = {
  id: string;
  nome: string;
  localizacao: string;
  status: number;
}
