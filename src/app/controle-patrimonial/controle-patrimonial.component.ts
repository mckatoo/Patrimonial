import { Observable } from 'rxjs/Observable';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MaterializeAction } from 'angular2-materialize';
import * as firebase from 'firebase';

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
  modalNota = new EventEmitter<string | MaterializeAction>();
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
  notaEdit: any = {
    "numNotaFiscal": "",
    "arquivo": ""
  }
  selectedFiles: FileList;
  progresso: number;
  downloadNota;
  msgUpload;
  private uploadTask: firebase.storage.UploadTask;

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

  imprimirNota(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  carrega(vl){
    this.progresso = vl;
  }

  uploadNota() {
    let file = this.selectedFiles.item(0);
    // let storageRef = firebase.storage().ref().child('notasFiscais/' + this.notaEdit.numNotaFiscal);
    let storageRef = firebase.storage().ref();
    // let task = storageRef.put(file);
    this.uploadTask = storageRef.child(`notasFiscais/${this.notaEdit.numNotaFiscal}`).put(file);
    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        this.progresso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        this.msgUpload = error;
      },
      () => {
        this.downloadNota = this.uploadTask.snapshot.downloadURL;
        // gravar dados no banco sobre a nota.
      }
    );
    // task.on('state_changed',
    //   function progress(snapshot) {
    //     var percente = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     this.progresso = percente;
    //     console.log(this.progresso);
    //   },
    //   function error(err) {
    //     this.msgUpload = err;
    //   },
    //   function complete() {
    //     this.msgUpload = 'Upload realizado com sucesso!';
    //   }
    // );
    // firebase.storage().ref().child('notasFiscais/' + this.notaEdit.numNotaFiscal)
    //   .getDownloadURL().then(url => {
    //     this.downloadNota = url;
    //   });
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

  openModalNota(data) {
    this.notaEdit.numNotaFiscal = data;
    this.modalNota.emit({ action: 'modal', params: ['open'] });
  }

  closeModalNota() {
    this.modalNota.emit({ action: 'modal', params: ['close'] });
  }

  onSubmit(data) {
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
    this.notaEdit = {
      "numNotaFiscal": "",
      "arquivo": ""
    }
  }

}
