import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfertasHomePage } from './ofertas-home.page';

const routes: Routes = [
  {
    path: '',
    component: OfertasHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfertasHomePageRoutingModule {}
