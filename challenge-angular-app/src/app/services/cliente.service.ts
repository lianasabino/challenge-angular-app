import { Injectable, signal } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';
import { HttpClient } from '@angular/common/http';

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

  getClientes() {
    return this.clientes;
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

  updateCliente(id: string, cliente: Cliente): void {
    this.clientes.update((clientes) =>
      clientes.map((clientes) => (clientes.id === id ? cliente : clientes))
    );
  }

  deleteCliente(id: string): void {
    this.clientes.update((clientes) =>
      clientes.filter((cliente) => cliente.id !== id)
    );
  }
}
