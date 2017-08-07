import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetoresComponent } from './setores/setores.component';
import { TiposUsuariosComponent } from './tipos-usuarios/tipos-usuarios.component';
import { InstitutoComponent } from './instituto/instituto.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SetoresComponent, TiposUsuariosComponent, InstitutoComponent]
})
export class ConfigModule { }
