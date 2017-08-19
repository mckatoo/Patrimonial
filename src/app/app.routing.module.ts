import { Observable } from 'rxjs/Observable';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigComponent } from './config/config.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ControlePatrimonialComponent } from './controle-patrimonial/controle-patrimonial.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'controle-patrimonial', component: ControlePatrimonialComponent },
    // { path: 'Controle Patrimonial', component: ControlePatrimonialComponent },
    { path: 'usuarios', component: UsuariosComponent },
    // { path: 'Usuários', component: UsuariosComponent },
    { path: 'config', component: ConfigComponent },
    // { path: 'Configurações', component: ConfigComponent },
    { path: 'login', component: LoginComponent },
    // { path: 'Sair', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}