export interface Cliente {
  id: string;
  nome: string;
  dataNascimento: string;
  endereco: string;
}

export interface Endereco {
  estado: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: number;
  complemento: string;
  cep?: string;
}
