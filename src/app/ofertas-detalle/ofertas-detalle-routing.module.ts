import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfertasDetallePage } from './ofertas-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: OfertasDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfertasDetallePageRoutingModule {}
