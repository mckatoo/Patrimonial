import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlimScrollModule } from 'ng2-slimscroll';

import { ControlePatrimonialComponent } from './controle-patrimonial.component';
import { PatrimonioDetalheComponent } from './patrimonio-detalhe/patrimonio-detalhe.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ControlePatrimonialComponent, PatrimonioDetalheComponent]
})
export class ControlePatrimonialModule { }
