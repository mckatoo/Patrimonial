import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimonioDetalheComponent } from './patrimonio-detalhe.component';

describe('PatrimonioDetalheComponent', () => {
  let component: PatrimonioDetalheComponent;
  let fixture: ComponentFixture<PatrimonioDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrimonioDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrimonioDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
