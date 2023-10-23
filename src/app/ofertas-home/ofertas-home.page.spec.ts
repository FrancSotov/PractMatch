import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfertasHomePage } from './ofertas-home.page';

describe('OfertasHomePage', () => {
  let component: OfertasHomePage;
  let fixture: ComponentFixture<OfertasHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OfertasHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
