import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { environment } from './../../environments/environment.prod';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SetoresComponent } from './setores/setores.component';
import { TiposUsuariosComponent } from './tipos-usuarios/tipos-usuarios.component';
import { InstitutoComponent } from './instituto/instituto.component';
import { ConfigComponent } from './config.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { MaterializeModule } from "angular2-materialize";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterializeModule,
    AngularFireDatabaseModule,
  ],
  declarations: [
    ConfigComponent,
    SetoresComponent,
    TiposUsuariosComponent,
    InstitutoComponent,
    UsuariosComponent
  ]
})
export class ConfigModule { }
