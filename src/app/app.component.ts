import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Perfil', url: '/perfil', icon: 'person' },
    { title: 'Ofertas', url: '/ofertas-home', icon: 'apps' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.setupAppStateChangeListener();
      this.setupAppResumeListener();
    });
  }

  setupAppStateChangeListener() {
    App.addListener('appStateChange', (state: { isActive: boolean }) => {
      if (state.isActive) {
        console.log('La aplicación se ha reanudado.');
      } else {
        console.log('La aplicación está en segundo plano.');
      }
    });
  }

  setupAppResumeListener() {
    App.addListener('resume', () => {
      console.log('La aplicación ha sido reanudada desde el segundo plano.');
    });
  }
}
