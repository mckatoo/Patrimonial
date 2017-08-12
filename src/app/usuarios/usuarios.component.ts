import { Observable } from 'rxjs/Observable';
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

  user: Observable<firebase.User>;

  modalActions = new EventEmitter<string | MaterializeAction>();
  usuarios:FirebaseListObservable<any>;
  tiposUsuarios:FirebaseListObservable<any>;
  setores:FirebaseListObservable<any>;
  editarUsuario = {
    "tipo": "",
    "nome": "",
    "email": "",
    "senha": "",
    "confirmarSenha": "",
    "setor": "",
    "ativo": "",
    "instituto": ""
  };

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;

    this.usuarios = db.list('usuarios/');
    this.tiposUsuarios = db.list('tiposUsuarios/');
    this.setores = db.list('setores/');
  }

  openModal(form?) {
    if (form.value.key == undefined) {
      // form.reset();
      this.modalActions.emit({ action: "modal", params: ['open'] });
    } else {
      console.log("editar");
      // this.modalActionsUsuario.emit({ action: "modal", params: ['open'] });
    }
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }

  onSubmit(form) {
    if (form.value[1] != undefined) {
      console.log("editar");
      // this.usuarios.update(form.value.key, form.value);
    } else {
      console.log(form.value);
      // this.usuarios.push(form.value);
    }
  };

  Ativar(key:string) {
    if (confirm('Você deseja ativar este usuário?')) {
      
    }
  }
  Desativar(key:string) {
    if (confirm('Você deseja desativar este usuário?')) {
      
    }
  }

  ngOnInit() {
  }

}
