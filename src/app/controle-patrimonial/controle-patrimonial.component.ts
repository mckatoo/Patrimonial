import { Component, OnInit, EventEmitter } from '@angular/core';
import {NgForm} from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-controle-patrimonial',
  templateUrl: './controle-patrimonial.component.html',
  styleUrls: ['./controle-patrimonial.component.scss']
})
export class ControlePatrimonialComponent implements OnInit {

  patrimonios: FirebaseListObservable<any>;
  tipos: FirebaseListObservable<any>;
  setores: FirebaseListObservable<any>;
  areainst: FirebaseListObservable<any>;
  fornecedores: FirebaseListObservable<any>;
  autores: FirebaseListObservable<any>;
  patrimonioEdit: any = { 
    "areainst": "",
    "ativo": "",
    "autor": "",
    "dataAquisicao": "",
    "descr": "",
    "fornecedor": "",
    "numNotaFiscal": "",
    "numPlacaPatr": "",
    "obs": "",
    "setor": "",
    "tipo": ""
  };

  actions = new EventEmitter<string|MaterializeAction>();
  modalEditar = new EventEmitter<string|MaterializeAction>();
  openModal(modal,data) {
    this.patrimonioEdit = data;
    // console.log(this.patrimonioEdit.numPlacaPatr);
    modal.emit({action:'modal',params:['open']});
  }
  closeModal(modal) {
    modal.emit({action:'modal',params:['close']});
  }

  onSubmit(form){
    console.log(form.value);
  }

  constructor(private db: AngularFireDatabase) {
    this.tipos = this.db.list('/tipos');
    this.autores = this.db.list('/login');
    this.fornecedores = this.db.list('/fornecedores');
    this.areainst = this.db.list('/areainst');
    this.setores = this.db.list('/setores');
    this.patrimonios = this.db.list('/patrimonios', {
      query: {
        orderByKey: true,
        limitToLast: 10
      }
    });
  }

  ngOnInit() {
  }

}
