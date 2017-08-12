import { NgForm } from '@angular/forms';
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
    this.uploadLogo(form.value.nome);
  };

  apagar(key: string) {
    if (confirm("Deseja realmente apagar este instituto?")) {
      this.instituto.remove(key);
    }
  }

  openModal(form?) {
    if (form.value.nome == "") {
      form.reset();
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

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  };

  private uploadLogo(saveAs: string) {
    this.currentUpload = new Upload(this.selectedFiles.item(0));
    this.upSvc.pushUpload("instituto/", this.currentUpload, saveAs);
  };

}
