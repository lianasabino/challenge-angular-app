import { Injectable, signal } from '@angular/core';
import { Produto } from '../interfaces/produto.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private produtos = signal<Produto[]>([]);

  constructor(private http: HttpClient) {
    this.produtos.set([
      {
        id: crypto.randomUUID(),
        nome: 'Teclado',
        valor: 100.0,
        quantidade: 2,
      },
      {
        id: crypto.randomUUID(),
        nome: 'Mouse',
        valor: 50.0,
        quantidade: 3,
      },
    ]);
  }

  getProdutos(): Produto[] {
    return this.produtos();
  }

  getProdutoById(id: string): Produto | undefined {
    return this.produtos().find((produto) => produto.id === id);
  }

  addProduto(produto: Omit<Produto, 'id'>): Produto {
    const novoProduto: Produto = {
      ...produto,
      id: crypto.randomUUID(),
    };

    this.produtos.update((produtos) => [...produtos, novoProduto]);
    return novoProduto;
  }

  updateProduto(produto: Produto): void {
    this.produtos.update((produtos) =>
      produtos.map((produtos) =>
        produtos.id === produto.id ? produto : produtos
      )
    );
  }

  deleteProduto(id: string): void {
    this.produtos.update((produtos) =>
      produtos.filter((produto) => produto.id !== id)
    );
  }
}
