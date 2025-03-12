import { Injectable, signal } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { CepResponse } from '../interfaces/cep.interface';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private clientes = signal<Cliente[]>([]);

  constructor(private http: HttpClient) {
    this.clientes.set([
      {
        id: crypto.randomUUID(),
        nome: 'Liana Sabino',
        dataNascimento: new Date('1998-03-07'),
        endereco: {
          estado: 'CE',
          cidade: 'Fortaleza',
          bairro: 'Parquelandia',
          logradouro: 'Rua Padre Guerra',
          numero: 2149,
          complemento: 'casa',
        },
      },
      {
        id: crypto.randomUUID(),
        nome: 'Jefferson Brandão',
        dataNascimento: new Date('1994-08-24'),
        endereco: {
          estado: 'CE',
          cidade: 'Fortaleza',
          bairro: 'Jardim das Oliveiras',
          logradouro: 'Avenida Lea Pompeu',
          numero: 545,
          complemento: 'Casa',
        },
      },
    ]);
  }

  getClientes(): Cliente[] {
    return this.clientes();
  }

  getClientesById(id: string): Cliente | undefined {
    return this.clientes().find((cliente) => cliente.id === id);
  }

  addCliente(cliente: Omit<Cliente, 'id'>): Cliente {
    const novoCliente: Cliente = {
      ...cliente,
      id: crypto.randomUUID(),
    };

    this.clientes.update((clientes) => [...clientes, novoCliente]);
    return novoCliente;
  }

  updateCliente(cliente: Cliente): void {
    this.clientes.update((clientes) =>
      clientes.map((clientes) =>
        clientes.id === cliente.id ? cliente : clientes
      )
    );
  }

  deleteCliente(id: string): void {
    this.clientes.update((clientes) =>
      clientes.filter((cliente) => cliente.id !== id)
    );
  }

  consultarCep(cep: string): Observable<CepResponse> {
    const newCep = cep.replace(/\D/g, '');

    const url = `https://viacep.com.br/ws/${newCep}/json/`;

    return this.http.get<CepResponse>(url).pipe(
      catchError(() => {
        return throwError(() => new Error('CEP não encontrado'));
      })
    );
  }
}
