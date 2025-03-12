import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Produto } from '../../../interfaces/produto.interface';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="produto-list-container">
      <div class="header-actions">
        <h2>Listagem de Produtos</h2>
        <button mat-raised-button color="primary" routerLink="/produtos/novo">
          <mat-icon>add</mat-icon> Novo Produto
        </button>
      </div>

      <mat-card-content>
        <table mat-table [dataSource]="bancoProdutos" class="table">
          <!-- Coluna nome -->
          <ng-container matColumnDef="nome">
            <th mat-header-cell *matHeaderCellDef>Nome</th>
            <td mat-cell *matCellDef="let produto">{{ produto.nome }}</td>
          </ng-container>

          <!-- Coluna valor -->
          <ng-container matColumnDef="valor">
            <th mat-header-cell *matHeaderCellDef>Valor</th>
            <td mat-cell *matCellDef="let produto">
              {{ produto.valor }}
            </td>
          </ng-container>

          <!-- Coluna quantidade -->
          <ng-container matColumnDef="quantidade">
            <th mat-header-cell *matHeaderCellDef>Quantidade</th>
            <td mat-cell *matCellDef="let produto">
              {{ produto.quantidade }}
            </td>
          </ng-container>

          <!-- Coluna de ações -->
          <ng-container matColumnDef="acoes">
            <th mat-header-cell *matHeaderCellDef>Ações</th>
            <td mat-cell *matCellDef="let produto">
              <button
                mat-icon-button
                color="primary"
                [routerLink]="['/produtos/editar', produto.id]"
                matTooltip="Editar produto"
              >
                <mat-icon>edit</mat-icon>
              </button>
              <button
                mat-icon-button
                color="warn"
                (click)="confirmarExclusao(produto)"
                matTooltip="Excluir produto"
              >
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
    </div>
  `,
  styleUrl: './produto-list.component.scss',
})
export class ProdutoListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'valor', 'quantidade', 'acoes'];

  bancoProdutos = new MatTableDataSource<Produto>([]);

  private produtoService = inject(ProdutoService);

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    const produtos = this.produtoService.getProdutos();
    this.bancoProdutos.data = produtos;
    console.log(produtos);
  }

  confirmarExclusao(produto: Produto): void {
    const confirmacaoExclusao = window.confirm('Deseja excluir o produto?');

    if (confirmacaoExclusao) {
      this.produtoService.deleteProduto(produto.id);
      this.carregarProdutos();
    }
  }
}
