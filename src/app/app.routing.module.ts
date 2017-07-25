import { PatrimonioDetalheComponent } from './controle-patrimonial/patrimonio-detalhe/patrimonio-detalhe.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ControlePatrimonialComponent } from './controle-patrimonial/controle-patrimonial.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'controle-patrimonial', component: ControlePatrimonialComponent },
    { path: 'patrimonio/:id', component: PatrimonioDetalheComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'login', component: LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}