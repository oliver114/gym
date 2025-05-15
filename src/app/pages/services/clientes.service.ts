import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clientes } from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiUrl = ' http://localhost:8080/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(this.apiUrl);
  }

  getClienteById(id: number): Observable<Clientes> {
    return this.http.get<Clientes>(`${this.apiUrl}/${id}`);
  }

  createCliente(clientes: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(this.apiUrl, clientes);
  }

  updateCliente(clientes: Clientes) {
    return this.http.put(this.apiUrl, clientes);
  }

  deleteClientes(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
