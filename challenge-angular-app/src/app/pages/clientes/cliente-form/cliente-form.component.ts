import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cliente-form',
  providers: [provideNativeDateAdapter()],
  imports: [
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatCardModule,
  ],
  template: `
    <div class="cliente-form-container">
      <div class="header">
        <h1>Editar/Criar Cliente</h1>
        <button mat-raised-button routerLink="/clientes">Voltar</button>
      </div>
      <mat-card class="card">
        <mat-card-content class="card-content">
          <div class="personal-form">
            <h2>Dados Pessoais:</h2>

            <mat-form-field appearance="outline">
              <mat-label>Nome</mat-label>
              <input matInput placeholder="Nome completo" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Data de Nascimento</mat-label>
              <input
                matInput
                [matDatepicker]="picker"
                formControlName="dataNascimento"
              />
              <mat-datepicker-toggle
                matIconSuffix
                [for]="picker"
              ></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
          </div>

          <div class="address">
            <mat-form-field class="cep" appearance="outline">
              <mat-label>Cep</mat-label>
              <input matInput placeholder="00000-000" />
              <button
                class="search-icon"
                mat-icon-button
                matSuffix
                type="button"
              >
                <mat-icon fontIcon="search"></mat-icon>
              </button>
            </mat-form-field>

            <div class="street-number">
              <mat-form-field class="street" appearance="outline">
                <mat-label>Logradouro</mat-label>
                <input matInput placeholder="Rua, Avenida..." />
              </mat-form-field>

              <mat-form-field class="number" appearance="outline">
                <mat-label>Número</mat-label>
                <input matInput placeholder="123" />
              </mat-form-field>
            </div>
            <mat-form-field class="complement" appearance="outline">
              <mat-label>Complemento</mat-label>
              <input matInput placeholder="Casa, Apto, etc..." />
            </mat-form-field>

            <mat-form-field class="neighborhood" appearance="outline">
              <mat-label>Bairro</mat-label>
              <input matInput placeholder="Bairro" />
            </mat-form-field>

            <div class="city-state">
              <mat-form-field class="city" appearance="outline">
                <mat-label>Cidade</mat-label>
                <input matInput placeholder="Cidade" />
              </mat-form-field>

              <mat-form-field class="state" appearance="outline">
                <mat-label>Estado</mat-label>
                <input matInput placeholder="UF" />
              </mat-form-field>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrl: './cliente-form.component.scss',
})
export class ClienteFormComponent {}
