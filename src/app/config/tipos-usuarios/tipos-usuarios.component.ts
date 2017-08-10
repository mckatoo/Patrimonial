import { FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit, EventEmitter } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-tipos-usuarios',
  templateUrl: './tipos-usuarios.component.html',
  styleUrls: ['./tipos-usuarios.component.scss']
})
export class TiposUsuariosComponent implements OnInit {

  tiposUsuarios: FirebaseListObservable<any>;
  modalActions = new EventEmitter<string | MaterializeAction>();
  editarTipo = {
    "tipo": "",
  };

  constructor(private db: AngularFireDatabase) {
    this.tiposUsuarios = db.list("tiposUsuarios/");
  }

  onSubmit(form) {
    this.tiposUsuarios.push(form.value);
    this.closeModal(form);
  };

  apagar(key: string) {
    if (confirm("Deseja realmente apagar este tipo de usuário?")) {
      this.tiposUsuarios.remove(key);
    }
  }

  openModal(form?) {
    if (form == undefined) {
      this.modalActions.emit({ action: "modal", params: ['open'] });
    } else {
      console.log("editar");
      // this.modalActions.emit({ action: "modal", params: ['open'] });
    }
  }
  closeModal(form?) {
    this.modalActions.emit({ action: "modal", params: ['close'] });
    form.reset();
  }

  ngOnInit() {
  }

}
