import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { GoogleAuthProvider } from 'firebase/auth';  // Importa directamente el provider de autenticación de Google

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  email: string = '';
  password: string = '';

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController) { }

  login() {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then(userCredential => {
        // El inicio de sesión fue exitoso
        console.log(userCredential);
        // Redirige a la página después del inicio de sesión exitoso
        this.navCtrl.navigateForward('/dashboard'); // Reemplaza '/dashboard' con la ruta que deseas después del inicio de sesión.
      })
      .catch(error => {
        // Hubo un error en el inicio de sesión
        console.error(error);
      });
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await this.afAuth.signInWithPopup(provider);
      // El inicio de sesión con Google fue exitoso
      console.log(userCredential);
      // Redirige a la página después del inicio de sesión exitoso
      this.navCtrl.navigateForward('/dashboard'); // Reemplaza '/dashboard' con la ruta que deseas después del inicio de sesión.
    } catch (error) {
      // Hubo un error en el inicio de sesión con Google
      console.error(error);
    }
  }
}
