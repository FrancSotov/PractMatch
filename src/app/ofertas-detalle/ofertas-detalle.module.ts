import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfertasDetallePageRoutingModule } from './ofertas-detalle-routing.module';

import { OfertasDetallePage } from './ofertas-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfertasDetallePageRoutingModule
  ],
  declarations: [OfertasDetallePage]
})
export class OfertasDetallePageModule {}
