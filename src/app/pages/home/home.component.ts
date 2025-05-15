import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Clientes } from '../models/clientes';
import { ClientesService } from '../services/clientes.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [MatCardModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  clientes: Clientes[] = [];
  isDeleteProgress:boolean=false

  constructor(private clienteService: ClientesService) { }
  ngOnInit(): void {
    this.getAllClientes();
  }

  getAllClientes() {
    this.clienteService.getClientes().subscribe((data) => {
      this.clientes = data;
    });
  }

  deleteClientes(id: number) {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.clienteService.deleteClientes(id).subscribe({
        next: () => {
          // Actualizar lista después de eliminar
          this.clientes = this.clientes.filter(c => c.id !== id);
          alert('Cliente eliminado');
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Error al eliminar el cliente');
        }
      });
    }
  }
}

