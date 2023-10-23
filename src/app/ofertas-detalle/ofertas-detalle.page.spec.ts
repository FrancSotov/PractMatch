import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfertasDetallePage } from './ofertas-detalle.page';

describe('OfertasDetallePage', () => {
  let component: OfertasDetallePage;
  let fixture: ComponentFixture<OfertasDetallePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OfertasDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
