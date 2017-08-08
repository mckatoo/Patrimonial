import { Component, OnInit, EventEmitter } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-instituto',
  templateUrl: './instituto.component.html',
  styleUrls: ['./instituto.component.scss']
})
export class InstitutoComponent implements OnInit {

  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
  }

  openModal(data?) {
    if (data == undefined) {
      this.modalActions.emit({ action: "modal", params: ['open'] });
    } else {
      console.log("editar");
      // this.modalActions.emit({ action: "modal", params: ['open'] });
    }
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }

}
