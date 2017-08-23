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

  auth: Observable<firebase.User>;

  user = [];
  modalActions = new EventEmitter<string | MaterializeAction>();
  usuarios: FirebaseListObservable<any>;
  tiposUsuarios: FirebaseListObservable<any>;
  setores: FirebaseListObservable<any>;
  editarUsuario = {
    "key": '',
    "tipo": '',
    "nome": '',
    "email": '',
    "senha": '',
    "setor": '',
    "ativo": '',
    "instituto": ''
  };
  validate = {
    borderBottom: '1px solid #9e9e9e',
    boxShadow: 'none'
  };

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.auth = afAuth.authState;
    this.usuarios = db.list('usuarios/');

    this.auth.subscribe(auth => {
      db.list('usuarios/',{
        query: {
          orderByChild: 'email',
          equalTo: auth.email
        }
      }).subscribe(usuario => {
        if (usuario[0].tipo == 'ADMINISTRADOR') {
          db.list('usuarios/').subscribe(usuarios => {
            this.user = usuarios;
          });
        } else {
          db.list('usuarios/',{
            query: {
              orderByChild: 'tipo',
              startAt: 'CONSULTOR',
              endAt: 'GESTOR'
            }
          }).subscribe(usuarios => {
            usuarios.forEach( u => {
              if (u.setor == usuario[0].setor) {
                this.user.push(u);
              }
            });
            console.log(this.user);
          });
        }
      });
    });

    this.tiposUsuarios = db.list('tiposUsuarios/');
    this.setores = db.list('setores/');
  }

  validaSenha(form: NgForm) {
    if ((form.value.senha == form.value.confirmarSenha) && (form.value.senha.length > 5)) {
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

  openModal(form?, dataEdit?) {
    if (dataEdit == undefined) {
      this.modalActions.emit({ action: "modal", params: ['open'] });
    } else {
      this.modalActions.emit({ action: "modal", params: ['open'] });
      this.editarUsuario.key = dataEdit.$key;
      this.editarUsuario.tipo = dataEdit.tipo;
      this.editarUsuario.nome = dataEdit.nome;
      this.editarUsuario.email = dataEdit.email;
      this.editarUsuario.setor = dataEdit.setor;
    }
  }

  private limpar() {
    this.editarUsuario = {
      "key": null,
      "tipo": '',
      "nome": '',
      "email": '',
      "senha": '',
      "setor": '',
      "ativo": '',
      "instituto": ''
    };
  }

  closeModal(form) {
    this.limpar();
    this.modalActions.emit({ action: "modal", params: ['close'] });
    form.reset();
    form.value.key = '';
    console.log(form.value.key)
  }

  onSubmit(form: NgForm) {
    if (form.value[1] != undefined) {
      console.log("editar");
      // this.usuarios.update(form.value.key, form.value);
    } else {
      this.afAuth.auth.createUserWithEmailAndPassword(form.value.email, form.value.senha)
        .then(user => {
          this.usuarios.push({
            "tipo": `${form.value.tipo}`,
            "nome": `${form.value.nome}`,
            "email": `${form.value.email}`,
            "setor": `${form.value.setor}`,
            "ativo": true,
            "instituto": "IESI"
          })
          .then(() => {
            form.reset();
          });
        });
    }
    this.limpar();
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
