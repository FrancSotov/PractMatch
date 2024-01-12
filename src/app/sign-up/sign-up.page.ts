import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {

  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    public navCtrl: NavController,
    public toastController: ToastController
  ) { }

  async register() {
    try {
      const userCredential = await this.authService.createUserWithEmailAndPassword(this.email, this.password);
      // Registro exitoso
      console.log('Usuario registrado:', userCredential.user);
      // Actualizar el estado de autenticación (si es necesario)
      this.authService.setLoggedIn(true);
      // Redirige a la página después del registro exitoso
      this.navCtrl.navigateForward('/login'); // Reemplaza '/home' con la ruta que desees después del registro.
    } catch (error: any) {
      // Hubo un error en el registro
      console.error('Error en el registro de usuario:', error);
      if (error.code === 'auth/email-already-in-use') {
        this.presentToast('Correo electrónico ya registrado. Inicia sesión en su lugar.');
      }
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
