import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ofertas-home',
  templateUrl: './ofertas-home.page.html',
  styleUrls: ['./ofertas-home.page.scss'],
})
export class OfertasHomePage implements OnInit {
  ofertas: any[] = [];
  usuario: any;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private ngZone: NgZone) {}

  ngOnInit() {
    this.obtenerOfertas();
  }

  async obtenerOfertas() {
    const apiUrl = 'https://api-prueba-70671-default-rtdb.firebaseio.com/.json';

    this.http.get(apiUrl).subscribe((data: any) => {
      this.ofertas = data.ofertas || [];

      // Asegúrate de incluir la carrera en cada oferta
      this.ofertas.forEach(oferta => {
        oferta.carrera = oferta.carrera || ''; // Ajusta la propiedad según la estructura de tus datos
      });

      console.log('Ofertas obtenidas:', this.ofertas);

      // Llama a obtenerUsuario después de obtener las ofertas
      this.obtenerUsuario();
    });
  }

  async obtenerUsuario() {
    this.usuario = await this.authService.getUserData();
    this.filtrarOfertasPorCarrera();
  }

  filtrarOfertasPorCarrera() {
    if (this.usuario && this.usuario.carrera) {
      const ofertasFiltradas = [...this.ofertas];

      // Utiliza ngZone.run para forzar la actualización de la vista
      this.ngZone.run(() => {
        this.ofertas = ofertasFiltradas.filter(oferta => oferta.carrera === this.usuario.carrera);
      });
    }
  }

  verDetalleOferta(link: string) {
    window.open(link, '_blank');
  }

  irAPerfil() {
    this.router.navigate(['/perfil']); // Ajusta la ruta según la configuración de tus rutas
  }

  esTagCoincidente(tag: string): boolean {
    return this.usuario && this.usuario.palabrasClaves && this.usuario.palabrasClaves.includes(tag);
  }
}
