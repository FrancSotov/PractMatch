import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss'],
})
export class PerfilPage {

  nombre: string = 'Juan Perez';
  carrera: string = 'Ing. Informática';
  nuevoNombre: string = '';
  nuevaCarrera: string = '';
  modificando: boolean = false;
  palabraClave: string = '';
  palabrasClavesDisponibles: string[] = ['Trabajo en Equipo', 'Python', 'Java', 'Frontend', 'Backend'];
  palabrasClavesSeleccionadas: string[] = [];

  habilitarModificacion() {
    this.modificando = true;
  }

  guardarCambios() {
    this.nombre = this.nuevoNombre || this.nombre;
    this.carrera = this.nuevaCarrera || this.carrera;
    this.modificando = false;
  }

  agregarPalabraClave() {
    if (this.palabraClave && !this.palabrasClavesSeleccionadas.includes(this.palabraClave)) {
      this.palabrasClavesSeleccionadas.push(this.palabraClave);
    }
  }
}
