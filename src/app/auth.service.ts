// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importa ToastController

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private toastController: ToastController // Agrega ToastController aquí
  ) {}

  getAuthInstance() {
    return this.afAuth;
  }

  setLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async signInWithEmailAndPassword(email: string, password: string): Promise<void> {
    try {
      const credentials = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (credentials.user) {
        this.router.navigate(['/perfil']);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);
      if (result && result.user) {
        // El inicio de sesión con Google fue exitoso
        console.log('Inicio de sesión con Google exitoso:', result.user);
        this.router.navigate(['/ofertas-home']);
      } else {
        // No se pudo obtener el usuario después del inicio de sesión con Google
        this.presentToast('Error en el inicio de sesión con Google. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión con Google:', error);
      // Manejar errores
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/']); // Redirige a la página de inicio después del cierre de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  async registerUser(email: string, password: string, userData: any): Promise<void> {
    try {
      const credentials = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (credentials.user) {
        const uid = credentials.user.uid;
        await this.saveUserData(uid, userData);
        this.router.navigate(['/perfil']);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  }

  async saveUserData(uid: string, userData: any): Promise<void> {
    try {
      await this.firestore.collection('usuarios').doc(uid).set(userData);
    } catch (error) {
      console.error('Error al guardar datos del usuario:', error);
    }
  }

  async updateProfileData(uid: string, updatedData: any): Promise<void> {
    try {
      await this.firestore.collection('usuarios').doc(uid).update(updatedData);
    } catch (error) {
      console.error('Error al actualizar datos del perfil en Firestore:', error);
      // Maneja el error según tus necesidades
    }
  }

  async getUserData(): Promise<any | null> {
    try {
      // Obtén el usuario actual
      const user = await this.afAuth.currentUser;

      if (user) {
        const uid = user.uid;

        const doc = await this.firestore.collection('usuarios').doc(uid).get().toPromise();

        if (doc && doc.exists) {
          const data = doc.data() as { nombre: string; apellido: string; carrera: string; palabrasClaves: string[] };
          return data;
        } else {
          console.log('El documento no existe. Creando nuevo usuario.');

          const nuevoUsuario = {
            nombre: '',
            apellido: '',
            carrera: '',
            palabrasClaves: []
          };

          await this.saveUserData(uid, nuevoUsuario);

          return nuevoUsuario;
        }
      } else {
        console.error('No se pudo obtener el usuario actual.');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      return null;
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }
}
