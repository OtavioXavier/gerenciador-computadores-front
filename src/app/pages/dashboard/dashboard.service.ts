import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ComputadorGetAllResponse, ComputadorGetResponse } from "../../../models/computador-model-response";

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  private baseUrl = 'https://gerenciador-computadores-api.fly.dev/api/computadores';

  constructor(private http: HttpClient) { }

  getComputadores() {
    return this.http.get<ComputadorGetAllResponse>(this.baseUrl);
  }

  getComputadorPorId(id: string) {
    return this.http.get<ComputadorGetAllResponse>(`${this.baseUrl}/${id}`);
  }

  deleteComputador(id: string) {
    return this.http.delete<ComputadorGetResponse>(`${this.baseUrl}/${id}`);
  }
}
