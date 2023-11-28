import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ofertas-home',
  templateUrl: './ofertas-home.page.html',
  styleUrls: ['./ofertas-home.page.scss'],
})
export class OfertasHomePage implements OnInit {
  ofertas: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.obtenerOfertas();
  }

  obtenerOfertas() {
    const apiUrl = 'https://api-prueba-70671-default-rtdb.firebaseio.com/.json';

    this.http.get(apiUrl).subscribe((data: any) => {
      this.ofertas = data.ofertas || [];
    });
  }

  verDetalleOferta(link: string) {
    window.open(link, '_blank');  // Abre el enlace en una nueva pestaña
  }
}
