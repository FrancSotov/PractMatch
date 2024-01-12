// login.page.ts

import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    public navCtrl: NavController,
    public toastController: ToastController
  ) { }

  async login() {
    if (!this.email || !this.password) {
      this.presentToast('Ingresa un correo electrónico y una contraseña válidos.');
      return;
    }

    try {
      const userCredential = await this.authService.signInWithEmailAndPassword(this.email, this.password);
      // El inicio de sesión fue exitoso
      console.log('Inicio de sesión exitoso:', userCredential);
      // Actualizar el estado de autenticación (si es necesario)
      this.authService.setLoggedIn(true);
      // Redirige a la página después del inicio de sesión exitoso
      this.navCtrl.navigateForward('/ofertas-home'); // Reemplaza '/home' con la ruta que desees después del inicio de sesión.
    } catch (error: any) {
      // Hubo un error en el inicio de sesión
      console.error('Error en el inicio de sesión:', error);

      // Imprime el error completo en la consola
      console.error('Error completo:', error);

      // Muestra un mensaje genérico de error
      this.presentToast('Error en el inicio de sesión. Verifica tus credenciales.');
    }
  }

  async loginWithGoogle() {
    try {
      await this.authService.signInWithGoogle();
      // El inicio de sesión con Google fue exitoso
      console.log('Inicio de sesión con Google exitoso');
      // Actualizar el estado de autenticación (si es necesario)
      this.authService.setLoggedIn(true);
      // Redirige a la página después del inicio de sesión exitoso
      this.navCtrl.navigateForward('/ofertas-home'); // Reemplaza '/home' con la ruta que desees después del inicio de sesión.
    } catch (error) {
      // Hubo un error en el inicio de sesión con Google
      console.error('Error en el inicio de sesión con Google:', error);
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
