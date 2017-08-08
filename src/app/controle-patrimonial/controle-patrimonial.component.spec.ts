import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlePatrimonialComponent } from './controle-patrimonial.component';

describe('ControlePatrimonialComponent', () => {
  let component: ControlePatrimonialComponent;
  let fixture: ComponentFixture<ControlePatrimonialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlePatrimonialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlePatrimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
