import { Component, OnInit, EventEmitter } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-tipos-usuarios',
  templateUrl: './tipos-usuarios.component.html',
  styleUrls: ['./tipos-usuarios.component.scss']
})
export class TiposUsuariosComponent implements OnInit {

  modalActions = new EventEmitter<string | MaterializeAction>();
  editarTipo = {
    "tipo": "",
  };

  constructor(private db: AngularFireDatabase) { }

    openModalUsuario(data?) {
    if (data == undefined) {
      this.modalActions.emit({ action: "modal", params: ['open'] });
    } else {
      console.log("editar");
      // this.modalActions.emit({ action: "modal", params: ['open'] });
    }
  }
  closeModalUsuario() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }

  ngOnInit() {
  }

}
