import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterializeModule } from "angular2-materialize";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { AngularFireModule } from 'angularfire2';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PatrimonioService } from './controle-patrimonial/patrimonio.service';
import { PatrimonioDetalheComponent } from './controle-patrimonial/patrimonio-detalhe/patrimonio-detalhe.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ControlePatrimonialComponent } from './controle-patrimonial/controle-patrimonial.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ControlePatrimonialComponent,
    UsuariosComponent,
    PatrimonioDetalheComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [PatrimonioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
