import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { OfertasHomePageRoutingModule } from './ofertas-home-routing.module';

import { OfertasHomePage } from './ofertas-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    OfertasHomePageRoutingModule
  ],
  declarations: [OfertasHomePage]
})
export class OfertasHomePageModule {}
