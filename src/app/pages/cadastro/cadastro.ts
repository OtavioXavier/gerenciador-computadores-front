import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CadastroService } from './cadastro.service';
import { Computadores } from '../../../models/computador-model-response';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro.html',
  standalone: true
})
export class Cadastro {
  private fb = inject(FormBuilder);
  private service = inject(CadastroService);

  constructor(private router: Router) { }

  computadorForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    localizacao: ['', [Validators.required]],
    status: [1, [Validators.required]]
  });

  statusOptions = [
    { value: 0, label: 'Online', color: 'bg-green-500' },
    { value: 1, label: 'Offline', color: 'bg-red-500' },
    { value: 2, label: 'Em Manutenção', color: 'bg-yellow-500' }
  ];

  get isFormValid(): boolean {
    return this.computadorForm.valid;
  }

  onSubmit(): void {
    if (this.isFormValid) {
      const computador: Computadores = {...this.computadorForm.value, id: "null"};
      this.service.criarComputador(computador).subscribe({
        next: (response) => {
          if (response.sucesso) {
            this.computadorForm.reset({ status: 0 });
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          console.error('Erro ao criar computador:', error);
        }
      });
    }
  }
}
