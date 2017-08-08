import { Component, OnInit, EventEmitter } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MaterializeAction } from 'angular2-materialize';
import * as firebase from 'firebase';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  modalActionsUsuario = new EventEmitter<string | MaterializeAction>();
  modalActionsAtivar = new EventEmitter<string | MaterializeAction>();
  editarUsuario = {
    "tipo": "",
    "nome": "",
    "email": "",
    "setor": "",
    "ativo": ""
  };

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) { }

  openModalUsuario(data?) {
    if (data == undefined) {
      this.modalActionsUsuario.emit({ action: "modal", params: ['open'] });
    } else {
      console.log("editar");
      // this.modalActionsUsuario.emit({ action: "modal", params: ['open'] });
    }
  }
  closeModalUsuario() {
    this.modalActionsUsuario.emit({ action: "modal", params: ['close'] });
  }

  openModalAtivar() {
    this.modalActionsAtivar.emit({ action: "modal", params: ['open'] });
  }
  closeModalAtivar() {
    this.modalActionsAtivar.emit({ action: "modal", params: ['close'] });
  }

  ngOnInit() {
  }

}
