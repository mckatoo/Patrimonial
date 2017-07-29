import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-controle-patrimonial',
  templateUrl: './controle-patrimonial.component.html',
  styleUrls: ['./controle-patrimonial.component.scss']
})
export class ControlePatrimonialComponent implements OnInit {

  patrimonios: FirebaseListObservable<object>;
  tipos: FirebaseListObservable<any>;
  setores: FirebaseListObservable<any>;
  areainst: FirebaseListObservable<any>;
  fornecedores: FirebaseListObservable<any>;
  autores: FirebaseListObservable<any>;
  actions = new EventEmitter<string | MaterializeAction>();
  modal = new EventEmitter<string | MaterializeAction>();
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

  openModal(data) {
    this.patrimonioEdit = data;
    this.modal.emit({ action: 'modal', params: ['open'] });
  }
  closeModal() {
    this.limpar();
    this.modal.emit({ action: 'modal', params: ['close'] });
  }

  onSubmit(data) {
    // this.patrimonios.update(this.patrimonioEdit.$key, this.patrimonioEdit);
    this.patrimonios.update(this.patrimonioEdit.$key, data.value);
    // console.log(data.value);
    // console.log(this.patrimonioEdit.$key);
    this.limpar();
  }

  limpar() {
    this.patrimonioEdit.key = "";
    this.patrimonioEdit = {
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
  }

}
