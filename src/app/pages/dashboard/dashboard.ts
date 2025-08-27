import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from './dashboard.service';
import { Computadores } from '../../../models/computador-model-response';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule ],
  templateUrl: './dashboard.html',
  standalone: true
})
export class Dashboard implements OnInit {

  constructor(private service: DashboardService) { }
  computadores: Computadores[] = []

  ngOnInit(): void {
    this.service.getComputadores()
    .subscribe(res => {
       this.computadores = res.dados;
    });
  }

  handleDelete(id: string): void {
    this.service.deleteComputador(id).subscribe({
      next: (response) => {
        if (response.sucesso) {
          this.computadores = this.computadores.filter(c => c.id !== id);
        }
      },
      error: (error) => {
        console.error('Erro ao excluir computador:', error);
      }
    });
  }

}
