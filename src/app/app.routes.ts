import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Cadastro } from './pages/cadastro/cadastro';
import { Detalhes } from './detalhes/detalhes';

export const routes: Routes = [
  {path: 'dashboard', component: Dashboard},
  {path: 'cadastro', component: Cadastro},
  {path: 'detalhes/:id', component: Detalhes},
];
