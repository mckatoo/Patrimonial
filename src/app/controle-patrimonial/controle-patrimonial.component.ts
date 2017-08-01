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
  modalActions = new EventEmitter<string | MaterializeAction>();
  actions = new EventEmitter<string | MaterializeAction>();
  paramsDatePicker = [{
    format: 'dd/mm/yyyy',
    today: 'Hoje',
    clear: 'Limpar',
    closeOnSelect: true,
    close: 'Ok',
    labelMonthNext: 'Próximo mês',
    labelMonthPrev: 'Mês anterior',
    labelMonthSelect: 'Selecione um mês',
    labelYearSelect: 'Selecione um ano',
    monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
    weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    selectYears: 15,
  }];
  patrimonioEdit: any = {
    "areainst": "",
    "ativo": "s",
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

  onFileSelection(e) {
    console.log(e.target.files[0].name)
  }

  openModal(data) {
    if (data != null) {
      this.patrimonioEdit = data;
      this.modalActions.emit({ action: 'modal', params: ['open'] });
    } else {
      this.limpar();
      this.modalActions.emit({ action: 'modal', params: ['open'] });
    }
  }

  closeModal() {
    this.limpar();
    this.modalActions.emit({ action: 'modal', params: ['close'] });
}
  
  // openModalNota(data) {
  //   if (data != null) {
  //     this.patrimonioEdit = data;
  //     this.modalNota.emit({ action: 'modalNota', params: ['open'] });
  //   } else {
  //     this.limpar();
  //     this.modalNota.emit({ action: 'modalNota', params: ['open'] });
  //   }
  // }
  
  // closeModalNota() {
  //   this.limpar();
  //   this.modalNota.emit({ action: 'modalNota', params: ['close'] });
  // }

  onSubmit(data) {
    if (this.patrimonioEdit.$key != undefined) {
      this.patrimonios.update(this.patrimonioEdit.$key, data.value);
      this.limpar();
    } else {
      this.patrimonios.push(data.value);
      this.limpar();
    }
  }
  
  onSubmitNota(data) {
    if (this.patrimonioEdit.$key != undefined) {
      this.patrimonios.update(this.patrimonioEdit.$key, data.value);
      this.limpar();
    } else {
      this.patrimonios.push(data.value);
      this.limpar();
    }
  }

  limpar() {
    this.patrimonioEdit.key = "";
    this.patrimonioEdit = {
      "areainst": "",
      "ativo": "s",
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
