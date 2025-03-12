import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cliente } from '../../../interfaces/cliente.interface';
import { ClienteService } from '../../../services/cliente.service';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    <div class="cliente-list-container">
      <div class="header-actions">
        <h2>Listagem de Clientes</h2>
        <button mat-raised-button color="primary" routerLink="/clientes/novo">
          <mat-icon>add</mat-icon> Novo Cliente
        </button>
      </div>

      <mat-card-content>
        <table mat-table [dataSource]="bancoClientes" class="table">
          <!-- Coluna nome -->
          <ng-container matColumnDef="nome">
            <th mat-header-cell *matHeaderCellDef>Nome</th>
            <td mat-cell *matCellDef="let cliente">{{ cliente.nome }}</td>
          </ng-container>

          <!-- Coluna data de nascimento -->
          <ng-container matColumnDef="dataNascimento">
            <th mat-header-cell *matHeaderCellDef>Data de Nascimento</th>
            <td mat-cell *matCellDef="let cliente">
              {{ cliente.dataNascimento }}
            </td>
          </ng-container>

          <!-- Coluna endereço -->
          <ng-container matColumnDef="endereco">
            <th mat-header-cell *matHeaderCellDef>Cidade/Estado</th>
            <td mat-cell *matCellDef="let cliente">
              {{ cliente.endereco.cidade }}/{{ cliente.endereco.estado }}
            </td>
          </ng-container>

          <!-- Coluna endereço completo -->
          <ng-container matColumnDef="enderecoCompleto">
            <th mat-header-cell *matHeaderCellDef>Endereço</th>
            <td mat-cell *matCellDef="let cliente">
              {{ cliente.endereco.logradouro }},
              {{ cliente.endereco.numero }}
              <span *ngIf="cliente.endereco.complemento">
                - {{ cliente.endereco.complemento }}</span
              >
            </td>
          </ng-container>

          <!-- Coluna de ações -->
          <ng-container matColumnDef="acoes">
            <th mat-header-cell *matHeaderCellDef>Ações</th>
            <td mat-cell *matCellDef="let cliente">
              <button
                mat-icon-button
                color="primary"
                [routerLink]="['/clientes/editar', cliente.id]"
                matTooltip="Editar cliente"
              >
                <mat-icon>edit</mat-icon>
              </button>
              <button
                mat-icon-button
                color="warn"
                (click)="confirmarExclusao(cliente)"
                matTooltip="Excluir cliente"
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
  styleUrl: './cliente-list.component.scss',
})
export class ClienteListComponent implements OnInit {
  displayedColumns: string[] = [
    'nome',
    'dataNascimento',
    'endereco',
    'enderecoCompleto',
    'acoes',
  ];

  bancoClientes = new MatTableDataSource<Cliente>([]);

  private clienteService = inject(ClienteService);

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    const clientes = this.clienteService.getClientes();
    this.bancoClientes.data = clientes;
  }

  confirmarExclusao(cliente: Cliente): void {
    const confirmacaoExclusao = window.confirm('Deseja excluir o cliente?');

    if (confirmacaoExclusao) {
      this.clienteService.deleteCliente(cliente.id);
      this.carregarClientes();
    }
  }
}
