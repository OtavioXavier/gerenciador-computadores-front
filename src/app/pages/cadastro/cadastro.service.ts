import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Computadores, ComputadorGetResponse } from "../../../models/computador-model-response";

@Injectable({
  providedIn: 'root'
})

export class CadastroService {
  constructor(private http: HttpClient) { }

  criarComputador(computador: Computadores) {
    return this.http.post<ComputadorGetResponse>('https://gerenciador-computadores-api.fly.dev/api/computadores', computador);
  }
}
