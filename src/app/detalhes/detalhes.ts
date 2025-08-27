import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Computadores } from '../../models/computador-model-response';
import { DetalhesService } from './detalhes.service';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './detalhes.html'
})
export class Detalhes implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(DetalhesService);
  private fb = inject(FormBuilder);

  computador: Computadores = { id: '', nome: '', localizacao: '', status: 0 };
  carregando = signal(true);
  erro = signal<string | null>(null);
  editar = signal(false);

  statusMap = {
    0: { label: 'Offline', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50' },
    1: { label: 'Online', color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50' },
    2: { label: 'Em Manutenção', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50' }
  };

  statusOptions = [
    { value: 0, label: 'Online', color: 'bg-green-500' },
    { value: 1, label: 'Offline', color: 'bg-red-500' },
    { value: 2, label: 'Em Manutenção', color: 'bg-yellow-500' }
  ];

  onEditar() {
    this.editar.update(prev => !prev);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.service.getComputador(id).subscribe({
      next: (response) => {
        if (response.sucesso) {
          this.computador = response.dados;
          this.computadorForm.patchValue(this.computador);
        } else {
          this.erro.set('Computador não encontrado');
        }
        this.carregando.update(prev => false);
      },
      error: (error) => {
        this.erro.set('Erro ao carregar os detalhes do computador');
        this.carregando.update(prev => false);
        console.error('Erro:', error);
      }
    });
  }

  get isFormValid(): boolean {
    return this.computadorForm.valid;
  }

  onSubmit(): void {
    if (this.isFormValid) {
      const id = this.computador.id;
      const computador: Computadores = { ...this.computadorForm.value, id };
      this.service.atualizarComputador(id, computador).subscribe({
        next: (response) => {
          if (response.sucesso) {
            this.computador = response.dados;
          }
        },
        error: (error) => {
          console.error('Erro ao criar computador:', error);
        }
      });
    }
  }

  computadorForm: FormGroup = this.fb.group({
    nome: [this.computador.nome, [Validators.required, Validators.minLength(3)]],
    localizacao: [this.computador.localizacao, [Validators.required]],
    status: [this.computador.status, [Validators.required]]
  });
}
