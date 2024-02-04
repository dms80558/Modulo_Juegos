import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolverJugarDgComponent } from './volver-jugar-dg.component';

describe('VolverJugarDgComponent', () => {
  let component: VolverJugarDgComponent;
  let fixture: ComponentFixture<VolverJugarDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolverJugarDgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolverJugarDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
