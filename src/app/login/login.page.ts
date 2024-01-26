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
    try {
      if (!this.email || !this.password || !this.isValidEmail(this.email)) {
        throw new Error('Ingresa un correo electrónico y una contraseña válidos.');
      }

      const userCredential = await this.authService.signInWithEmailAndPassword(this.email, this.password);

      // El inicio de sesión fue exitoso
      console.log('Inicio de sesión exitoso:', userCredential);

      // Actualizar el estado de autenticación (si es necesario)
      this.authService.setLoggedIn(true);

      // Redirige a la página después del inicio de sesión exitoso
      this.navCtrl.navigateForward('/ofertas-home'); // Reemplaza '/home' con la ruta que desees después del inicio de sesión.
    } catch (error: any) {
      console.error('Error en el inicio de sesión:', error);

      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        this.presentToast('Credenciales incorrectas. Verifica tu correo y contraseña.');
      } else {
        this.presentToast('Error en el inicio de sesión. Verifica tus credenciales.');
      }
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

  private isValidEmail(email: string): boolean {
    // Implementa una lógica para verificar la validez del correo electrónico
    // Puedes utilizar expresiones regulares o una lógica más específica según tus requisitos.
    // Retorna true si el correo es válido, de lo contrario false.

    // Ejemplo simple: Verifica que el correo tenga un formato básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
