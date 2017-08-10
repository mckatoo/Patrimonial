import { Component, OnInit, EventEmitter } from '@angular/core';

import { UploadService } from './../../shared/upload.service';
import { Upload } from './../../shared/upload';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-instituto',
  templateUrl: './instituto.component.html',
  styleUrls: ['./instituto.component.scss']
})
export class InstitutoComponent implements OnInit {

  modalActions = new EventEmitter<string | MaterializeAction>();
  instituto: FirebaseListObservable<any>;
  selectedFiles: FileList;
  currentUpload: Upload;
  progresso: number;
  msgUpload;
  private uploadTask: firebase.storage.UploadTask;

  constructor(private db: AngularFireDatabase, private upSvc: UploadService) {
    this.instituto = db.list("instituto/");
  }

  ngOnInit() {
  }

  onSubmit(form) {
    let instituto = {
      "nome": form.value.nome,
      "logotipo": form.value.logotipo[0]
    }
    this.instituto.push(form.value);
    this.closeModal(form);
  };

  apagar(key:string){
    if (confirm("Deseja realmente apagar este instituto?")) {
      this.instituto.remove(key);
    }
  }

  openModal(data?) {
    if (data == undefined) {
      this.modalActions.emit({ action: "modal", params: ['open'] });
    } else {
      console.log("editar");
      // this.modalActions.emit({ action: "modal", params: ['open'] });
    }
  }
  closeModal(form) {
    this.modalActions.emit({ action: "modal", params: ['close'] });
    form.reset();
  }

  private uploadLogo() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload("institutoLogo/",this.currentUpload, this.currentUpload.name);
  };

}
