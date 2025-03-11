import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="cliente-list-container">
      <div class="header-actions">
        <mat-card class="list-card" appearance="outlined">
          <mat-card-header>
            <mat-card-title>Listagem de clientes</mat-card-title>
          </mat-card-header>

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
              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
            </table>
          </mat-card-content>
        </mat-card>
      </div>
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
}
