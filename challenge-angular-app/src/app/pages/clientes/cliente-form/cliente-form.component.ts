import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { ClienteService } from '../../../services/cliente.service';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Cliente } from '../../../interfaces/cliente.interface';

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
    <div class="cliente-form-container">
      <div class="header">
        <h1>{{ isEditMode ? 'Editar' : 'Criar' }} Cliente</h1>
        <button mat-raised-button routerLink="/clientes">Voltar</button>
      </div>
      <mat-card class="card">
        <mat-card-content class="card-content">
          <form [formGroup]="clienteForm" (ngSubmit)="onSubmit()">
            <div class="personal-form">
              <h2>Dados Pessoais:</h2>

              <mat-form-field appearance="outline">
                <mat-label>Nome</mat-label>
                <input
                  formControlName="nome"
                  matInput
                  placeholder="Nome completo"
                />
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
                <input
                  formControlName="cep"
                  matInput
                  placeholder="00000-000"
                  (blur)="getCep()"
                />

                <button
                  class="search-icon"
                  mat-icon-button
                  matSuffix
                  type="button"
                  (click)="getCep()"
                >
                  <mat-icon fontIcon="search"></mat-icon>
                </button>
              </mat-form-field>

              <div class="street-number">
                <mat-form-field class="street" appearance="outline">
                  <mat-label>Logradouro</mat-label>
                  <input
                    formControlName="logradouro"
                    matInput
                    placeholder="Rua, Avenida..."
                  />
                </mat-form-field>

                <mat-form-field class="number" appearance="outline">
                  <mat-label>Número</mat-label>
                  <input formControlName="numero" matInput placeholder="123" />
                </mat-form-field>
              </div>
              <mat-form-field class="complement" appearance="outline">
                <mat-label>Complemento</mat-label>
                <input
                  formControlName="complemento"
                  matInput
                  placeholder="Casa, Apto, etc..."
                />
              </mat-form-field>

              <mat-form-field class="neighborhood" appearance="outline">
                <mat-label>Bairro</mat-label>
                <input formControlName="bairro" matInput placeholder="Bairro" />
              </mat-form-field>

              <div class="city-state">
                <mat-form-field class="city" appearance="outline">
                  <mat-label>Cidade</mat-label>
                  <input
                    formControlName="cidade"
                    matInput
                    placeholder="Cidade"
                  />
                </mat-form-field>

                <mat-form-field class="state" appearance="outline">
                  <mat-label>Estado</mat-label>
                  <input formControlName="estado" matInput placeholder="UF" />
                </mat-form-field>
              </div>
            </div>
            <div class="form-action">
              <button
                class="save-button"
                [disabled]="clienteForm.invalid"
                mat-raised-button
                type="submit"
              >
                {{ isEditMode ? 'Editar' : 'Salvar' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrl: './cliente-form.component.scss',
})
export class ClienteFormComponent implements OnInit {
  clienteForm!: FormGroup;

  isEditMode = false;
  clienteId = '';

  private clienteService = inject(ClienteService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe((params) => {
      if (params['clienteId']) {
        this.isEditMode = true;
        this.clienteId = params['clienteId'];

        this.loadCliente(this.clienteId);
      }
    });
  }

  initForm(): void {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cep: [''],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  getCep(): void {
    const cep = this.clienteForm.get('cep')?.value.replace('-', '');

    if (cep && cep.length == 8) {
      this.clienteService.consultarCep(cep).subscribe({
        next: (data) => {
          console.log(data);
          if (data.erro === 'true') {
            this.clienteForm.get('cep')?.setValue('');
            window.alert('CEP não encontrado');
          } else {
            this.clienteForm.patchValue({
              logradouro: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf,
            });

            const numeroInput = document.querySelector(
              'input[formControlName="numero"]'
            ) as HTMLInputElement;
            numeroInput?.focus();
          }
        },
      });
    }
  }

  loadCliente(id: string): void {
    const cliente = this.clienteService.getClientesById(id);
    if (cliente) {
      this.clienteForm.patchValue({
        nome: cliente.nome,
        dataNascimento: cliente.dataNascimento,
        logradouro: cliente.endereco.logradouro,
        numero: cliente.endereco.numero,
        complemento: cliente.endereco.complemento,
        bairro: cliente.endereco.bairro,
        cidade: cliente.endereco.cidade,
        estado: cliente.endereco.estado,
      });
    } else {
      this.router.navigate(['/clientes']);
    }
  }

  onSubmit(): void {
    const formData = this.clienteForm.value;
    const cliente: Omit<Cliente, 'id'> = {
      nome: formData.nome,
      dataNascimento: formData.dataNascimento,
      endereco: {
        logradouro: formData.logradouro,
        numero: formData.numero,
        complemento: formData.complemento,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
      },
    };
    if (this.isEditMode) {
      this.clienteService.updateCliente({ ...cliente, id: this.clienteId });
    } else {
      this.clienteService.addCliente(cliente);
    }

    this.router.navigate(['/clientes']);
  }
}
