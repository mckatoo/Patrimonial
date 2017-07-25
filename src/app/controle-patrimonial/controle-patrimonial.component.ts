import { Component, OnInit } from '@angular/core';

import { PatrimonioService } from './patrimonio.service';

@Component({
  selector: 'app-controle-patrimonial',
  templateUrl: './controle-patrimonial.component.html',
  styleUrls: ['./controle-patrimonial.component.scss']
})
export class ControlePatrimonialComponent implements OnInit {

  constructor(private patrimonioService: PatrimonioService) { }

  ngOnInit() {
  }

}
