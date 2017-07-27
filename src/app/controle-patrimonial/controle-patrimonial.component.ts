import { Component, OnInit, EventEmitter } from '@angular/core';

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

  constructor(private db: AngularFireDatabase) {
    this.tipos = this.db.list('/tipos');
    this.patrimonios = this.db.list('/patrimonios', {
      query: {
        orderByKey: true,
        limitToLast: 10
      }
    });
  }

  modalEditar = new EventEmitter<string|MaterializeAction>();
  openModal(modal) {
    modal.emit({action:'modal',params:['open']});
  }
  closeModal(modal) {
    modal.emit({action:'modal',params:['close']});
  }

  ngOnInit() {
  }

}
