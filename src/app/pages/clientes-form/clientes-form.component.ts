import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientesService } from '../services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clientes-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './clientes-form.component.html',
  styleUrl: './clientes-form.component.css'
})
export class ClientesFormComponent {

  formClientes!: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;
  clienteId!: number;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.formClientes = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      message: ['', Validators.required],
      fechaRegistro: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.edit = true;
      this.getClientesById(+id!);
    } else {
      // Solo al crear un nuevo cliente: establecer fecha actual
      const now = new Date();
      const formattedDate = formatDate(now, 'yyyy-MM-dd HH:mm:ss', 'en-US');
      this.formClientes.patchValue({ fechaRegistro: formattedDate });
    }
  }

  getClientesById(id: number) {
    this.clienteService.getClienteById(id).subscribe({
      next: (foundCliente) => {
        this.formClientes.patchValue(foundCliente);
      },
      error: (err) => {
        alert('Error al cargar el cliente: ' + (err.error?.message || 'No encontrado'));
        this.router.navigateByUrl('/');
      }
    });
  }

  createClientes() {
    if (this.formClientes.valid) {
      const formData = this.formClientes.value;
      this.clienteService.createCliente(formData).subscribe({
        next: (response) => {
          console.log("Cliente guardado:", response);
         /* this.router.navigate(['/clientes']);*/
          alert("Cliente creado exitosamente");
        },
        error: (err) => {
          console.error("Error al guardar:", err);
          alert("Error al guardar");
        },
      });
    } else {
      this.formClientes.markAllAsTouched();
    }
  }

  updateClientes() {
    if (this.formClientes.valid) {
      const formData = this.formClientes.value;
      this.clienteService.updateCliente(formData).subscribe({
        next: (response) => {
          console.log("Cliente actualizado:", response);
          this.router.navigate(['/clientes']);  
          alert("Cliente actualizado exitosamente");
        },
        error: (err) => {
          console.error("Error al actualizar:", err);
          alert("Error al guardar");
        },
      });
    } else {
      this.formClientes.markAllAsTouched();
    }
  }
}
