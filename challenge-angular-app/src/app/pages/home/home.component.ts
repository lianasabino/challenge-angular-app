import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, RouterLink, MatButtonModule],
  template: `
    <div class="home-container">
      <mat-card class="home-card" appearance="outlined">
        <mat-card-header>
          <mat-card-title>Bem-vindo ao sistema de cadastro</mat-card-title>
          <mat-card-subtitle>Desafio em angular 19.</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <h2>Funcionalidades</h2>

          <div class="features">
            <div class="feature-container">
              <div class="feature-text">
                <h3>Cadastro de clientes</h3>
                <p>CRUD de clientes com integração API via cep</p>
              </div>
            </div>
          </div>

          <div class="features">
            <div class="feature-container">
              <div class="feature-text">
                <h3>Cadastro de produtos</h3>
                <p>CRUD de produtos</p>
              </div>
            </div>
          </div>
        </mat-card-content>

        <mat-card-actions>
          <button mat-raised-button color="primary" routerLink="/clientes">
            Ir para clientes
          </button>

          <button mat-raised-button color="accent" routerLink="/produtos">
            Ir para produtos
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
