import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ComputadorGetResponse, Computadores } from "../../../models/computador-model-response";

@Injectable({
  providedIn: 'root'
})
export class DetalhesService {
  private baseUrl = 'https://gerenciador-computadores-api.fly.dev/api/computadores';

  constructor(private http: HttpClient) { }

  getComputador(id: string) {
    return this.http.get<ComputadorGetResponse>(`${this.baseUrl}/${id}`);
  }

  atualizarComputador(id: string, computador: Computadores) {
    return this.http.put<ComputadorGetResponse>(`${this.baseUrl}/${id}`, computador);
  }
}
