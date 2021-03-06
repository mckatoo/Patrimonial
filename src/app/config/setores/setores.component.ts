import { Component, OnInit, EventEmitter } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-setores',
  templateUrl: './setores.component.html',
  styleUrls: ['./setores.component.scss']
})
export class SetoresComponent implements OnInit {

  modalActions = new EventEmitter<string | MaterializeAction>();
  setores: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.setores = db.list('setores/');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.setores.push(form.value);
    this.closeModal(form);
  };

  apagar(key: string) {
    if (confirm("Deseja realmente apagar este setor?")) {
      this.setores.remove(key);
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

}
