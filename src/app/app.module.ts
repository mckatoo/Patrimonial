import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LOCALE_ID } from '@angular/core';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';
import { Http } from '@angular/http';
import { MaterializeModule } from "angular2-materialize";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ConfigModule } from './config/config.module';

import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ControlePatrimonialComponent } from './controle-patrimonial/controle-patrimonial.component';
import { UploadService } from './shared/upload.service';
// import { UsuariosComponent } from './usuarios/usuarios.component';
// import { ConfigComponent } from './config/config.component';
// import { TiposUsuariosComponent } from './config/tipos-usuarios/tipos-usuarios.component';
// import { InstitutoComponent } from './config/instituto/instituto.component';
// import { SetoresComponent } from './config/setores/setores.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ControlePatrimonialComponent,
    // UsuariosComponent,
    // ConfigComponent,
    // TiposUsuariosComponent,
    // InstitutoComponent,
    // SetoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterializeModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    ConfigModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
    // TranslateModule.forRoot({
    //   provide: TranslateLoader,
    //   useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
    //   deps: [Http]
    // })
  ],
  providers: [
    UploadService,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
