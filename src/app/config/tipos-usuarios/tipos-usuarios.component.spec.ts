import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposUsuariosComponent } from './tipos-usuarios.component';

describe('TiposUsuariosComponent', () => {
  let component: TiposUsuariosComponent;
  let fixture: ComponentFixture<TiposUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
