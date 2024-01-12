import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  carrera: string = '';
  nuevoNombre: string = '';
  nuevoApellido: string = '';
  nuevaCarrera: string = '';
  modificando: boolean = false;
  palabraClave: string = '';
  palabrasClavesDisponibles: string[] = [];
  palabrasClavesSeleccionadas: string[] = [];

  carrerasPermitidas: string[] = ['Ing. Informática', 'Ing. Mecanica y Autotronica'];
  tagsPorCarrera: { [key: string]: string[] } = {
    'Ing. Informática': [
      'Desarrollo de proyectos',
      'Configuración de ambientes',
      'Servicios de aplicaciones',
      'Bases de datos',
      'Operatividad',
      'Continuidad de sistemas',
      'Procesos de negocio',
      'Estándares de la industria',
      'Propuestas de solución informática',
      'Requerimientos de la organización',
      'Desarrollo de software',
      'Mantenimiento de software',
      'Sistematización',
      'Objetivos de desarrollo',
      'Modelos de datos',
      'Diseño escalable',
      'Programación de consultas',
      'Rutinas de manipulación de información',
      'Certificación de productos',
      'Pruebas de certificación',
      'Modelos arquitectónicos',
      'Soluciones sistémicas',
      'Automatización de procesos',
      'Optimización de procesos',
      'Buenas prácticas de codificación',
      'Vulnerabilidades sistémicas',
      'Normas de seguridad',
      'Gestión de proyectos informáticos',
      'Transformación de grandes volúmenes de datos',
      'Obtención de información',
      'Conocimiento de la organización',
      'Mejora de procesos de negocio'
    ],
    'Ing. Mecanica y Autotronica': [
      'Gestión de procesos',
      'Identificación de oportunidades de negocios',
      'Aseguramiento de la calidad del servicio',
      'Entrega del vehículo',
      'Mantenimiento de vehículos',
      'Diagnóstico y reparación',
      'Sistemas de automóviles, motos y vehículos eléctricos',
      'Procesos de desabolladura y pintura',
      'Logística asociada a procesos de mantenimiento',
      'Gestión logística en el sector automotriz',
      'Rutinas de inspección técnica',
      'Análisis de resultados de inspección',
      'Cumplimiento de normativas ambientales',
      'Sostenibilidad en el sector automotriz',
      'Aseguramiento de la calidad del servicio',
      'Entrega satisfactoria del vehículo al cliente',
      'Experiencia del cliente en el sector automotriz',
      'Identificación de oportunidades de negocios en el sector automotriz',
      'Gestión de empresas automotrices',
      'Habilidades técnicas en mantenimiento y reparación',
      'Diagnóstico de sistemas automotrices',
      'Competencias en vehículos eléctricos',
      'Gestión eficiente de procesos',
      'Competencias de liderazgo en el sector automotriz',
      'Tecnología en vehículos',
      'Innovación en sistemas automotrices'
    ]
  };
  

  constructor(private authService: AuthService, private afAuth: AngularFireAuth, private router: Router) {}

  async ngOnInit() {
    await this.loadUserData();
  }

  async loadUserData() {
    const user = await this.afAuth.currentUser;

    if (user) {
      const userData = await this.authService.getUserData();

      if (userData) {
        const { nombre, apellido, carrera, palabrasClaves } = userData;
        this.nombre = nombre || '';
        this.apellido = apellido || '';
        this.carrera = carrera || '';
        this.palabrasClavesSeleccionadas = palabrasClaves?.slice(0, 10) || [];
        this.actualizarPalabrasClaves();
      }
    }
  }

  habilitarModificacion() {
    this.modificando = true;
  }

  async guardarCambios() {
    const user = await this.afAuth.currentUser;

    if (user) {
      const uid = user.uid;

      await this.authService.updateProfileData(uid, {
        nombre: this.nuevoNombre || this.nombre,
        apellido: this.nuevoApellido || this.apellido,
        carrera: this.nuevaCarrera || this.carrera,
        palabrasClaves: this.palabrasClavesSeleccionadas,
      });

      this.modificando = false;
    }
  }

  agregarPalabraClave() {
    if (this.palabraClave && this.palabrasClavesSeleccionadas.length < 10 && !this.palabrasClavesSeleccionadas.includes(this.palabraClave)) {
      this.palabrasClavesSeleccionadas.push(this.palabraClave);
      this.actualizarPalabrasClavesEnDB();
    }
  }

  eliminarPalabraClave(palabraClave: string) {
    this.palabrasClavesSeleccionadas = this.palabrasClavesSeleccionadas.filter(pc => pc !== palabraClave);
    this.actualizarPalabrasClavesEnDB();
  }

  async actualizarPalabrasClaves() {
    if (this.nuevaCarrera) {
      // Reiniciar las palabras clave al cambiar de carrera
      this.palabraClave = '';
      this.palabrasClavesDisponibles = this.tagsPorCarrera[this.nuevaCarrera] || [];
      this.palabrasClavesSeleccionadas = [];
    }
  }

  async actualizarPalabrasClavesEnDB() {
    const user = await this.afAuth.currentUser;

    if (user) {
      const uid = user.uid;
      await this.authService.updateProfileData(uid, { palabrasClaves: this.palabrasClavesSeleccionadas });
    }
  }
  irAOfertasHome() {
    this.router.navigate(['/ofertas-home']); // Ajusta la ruta según la configuración de tus rutas
  }

}