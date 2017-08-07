import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterializeModule } from "angular2-materialize";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { environment } from '../environments/environment';
import { AngularFireDatabaseModule  } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ControlePatrimonialComponent } from './controle-patrimonial/controle-patrimonial.component';
import { UploadService } from './shared/upload.service';
import { ConfigComponent } from './config/config.component';
import { TiposUsuariosComponent } from './config/tipos-usuarios/tipos-usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ControlePatrimonialComponent,
    UsuariosComponent,
    ConfigComponent,
    TiposUsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterializeModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
