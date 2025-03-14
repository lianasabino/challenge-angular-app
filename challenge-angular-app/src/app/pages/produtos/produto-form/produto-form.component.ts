import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Produto } from '../../../interfaces/produto.interface';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-cliente-form',
  providers: [provideNativeDateAdapter()],
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatCardModule,
  ],
  template: `
    <div class="produto-form-container">
      <div class="header">
        <h1>{{ isEditMode ? 'Editar' : 'Criar' }} Produto</h1>
        <button mat-raised-button routerLink="/produtos">Voltar</button>
      </div>
      <mat-card class="card">
        <mat-card-content class="card-content">
          <form [formGroup]="produtoForm" (ngSubmit)="onSubmit()">
            <div class="produto-form">
              <h2>Dados dos produtos:</h2>

              <mat-form-field appearance="outline">
                <mat-label>Nome</mat-label>
                <input
                  formControlName="nome"
                  matInput
                  placeholder="Nome do produto"
                />
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Valor</mat-label>
                <input
                  type="number"
                  formControlName="valor"
                  matInput
                  placeholder="48.00"
                />
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Quantidade</mat-label>
                <input
                  type="number"
                  formControlName="quantidade"
                  matInput
                  placeholder="10"
                />
                <mat-hint align="start"
                  >Aceita apenas números inteiros!</mat-hint
                >
              </mat-form-field>
              <div class="form-action">
                <button
                  class="save-button"
                  [disabled]="produtoForm.invalid"
                  mat-raised-button
                  type="submit"
                >
                  {{ isEditMode ? 'Editar' : 'Salvar' }}
                </button>
              </div>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrl: './produto-form.component.scss',
})
export class ProdutoFormComponent implements OnInit {
  produtoForm!: FormGroup;

  isEditMode = false;
  produtoId = '';

  private produtoService = inject(ProdutoService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe((params) => {
      if (params['produtoId']) {
        this.isEditMode = true;
        this.produtoId = params['produtoId'];

        this.loadProduto(this.produtoId);
      }
    });
  }

  initForm(): void {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      valor: ['', Validators.required],
      quantidade: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  loadProduto(id: string): void {
    const produto = this.produtoService.getProdutoById(id);
    if (produto) {
      this.produtoForm.patchValue({
        nome: produto.nome,
        valor: produto.valor,
        quantidade: produto.quantidade,
      });
    } else {
      this.router.navigate(['/produtos']);
    }
  }

  onSubmit(): void {
    const formData = this.produtoForm.value;
    const produto: Omit<Produto, 'id'> = {
      nome: formData.nome,
      valor: formData.valor,
      quantidade: formData.quantidade,
    };
    if (this.isEditMode) {
      this.produtoService.updateProduto({ ...produto, id: this.produtoId });
    } else {
      this.produtoService.addProduto(produto);
    }

    this.router.navigate(['/produtos']);
  }
}
