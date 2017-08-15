import { Observable } from 'rxjs/Observable';
import { Component, OnInit, EventEmitter } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MaterializeAction } from 'angular2-materialize';
import * as firebase from 'firebase';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  user: Observable<firebase.User>;

  modalActions = new EventEmitter<string | MaterializeAction>();
  usuarios: FirebaseListObservable<any>;
  tiposUsuarios: FirebaseListObservable<any>;
  setores: FirebaseListObservable<any>;
  editarUsuario = {
    "tipo": "",
    "nome": "",
    "email": "",
    "senha": "",
    "setor": "",
    "ativo": "",
    "instituto": ""
  };
  validate = {
    borderBottom: '1px solid #9e9e9e',
    boxShadow: 'none'
  };

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;

    this.usuarios = db.list('usuarios/');
    this.tiposUsuarios = db.list('tiposUsuarios/');
    this.setores = db.list('setores/');
  }

  validaSenha(form: NgForm) {
    if (form.value.senha == form.value.confirmarSenha) {
      this.validate = {
        borderBottom: '1px solid #4CAF50',
        boxShadow: '0 1px 0 0 #4CAF50'
      };
    } else {
      this.validate = {
        borderBottom: '1px solid red',
        boxShadow: '0 1px 0 0 red'
      };
    }
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

  onSubmit(form: NgForm) {
    if (form.value[1] != undefined) {
      console.log("editar");
      // this.usuarios.update(form.value.key, form.value);
    } else {

      this.afAuth.auth.createUserWithEmailAndPassword(form.value.email, form.value.senha);
      console.log(form.value);
      this.usuarios.push({
        "tipo": `${form.value.tipo}`,
        "nome": `${form.value.nome}`,
        "email": `${form.value.email}`,
        "setor": `${form.value.setor}`,
        "ativo": true,
        "instituto": "IESI"
      });
    }
    form.reset();
  };

  Ativar(key: string) {
    if (confirm('Você deseja ativar este usuário?')) {

    }
  }
  Desativar(key: string) {
    if (confirm('Você deseja desativar este usuário?')) {

    }
  }

  ngOnInit() {
  }

}
