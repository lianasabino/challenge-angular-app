import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary" class="toolbar">
        <button mat-icon-button (click)="drawer.toggle()">
          <mat-icon fontIcon="menu"></mat-icon>
        </button>
        <span>{{ title }}</span>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #drawer mode="over" class="sidenav">
          <mat-nav-list>
            <a mat-list-item routerLink="/">
              <mat-icon matListItemIcon fontIcon="home"></mat-icon>
              <span matListItemTitle>Home</span>
            </a>
            <a mat-list-item routerLink="/clientes">
              <mat-icon matListItemIcon fontIcon="people"></mat-icon>
              <span matListItemTitle>Clientes</span>
            </a>
            <a mat-list-item routerLink="/produtos">
              <mat-icon matListItemIcon fontIcon="inventory"></mat-icon>
              <span matListItemTitle>Produtos</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content class="sidenav-content">
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Teste Liana');
  }

  title = 'Teste front - Liana';
}
