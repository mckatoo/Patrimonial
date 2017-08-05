import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Upload } from './upload';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase) { }

  private basePath: string = '/notasFiscais';
  private uploadTask: firebase.storage.UploadTask;

  pushUpload(upload: Upload, saveAs?) {
    let nomeArquivo: string;
    if (saveAs == undefined) {
      nomeArquivo = upload.file.name;
    } else {
      nomeArquivo = saveAs;
    }
    
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${nomeArquivo}`).put(upload.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        console.log(error)
      },
      () => {
        upload.url = this.uploadTask.snapshot.downloadURL;
        upload.name = nomeArquivo;
        this.saveFileData(upload);
      }
    );
  };

  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
      .then(() => {
        this.deleteFileStorage(upload.name)
      })
      .catch(error => console.log(error))
  };

  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  };

  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  };

  private deleteFileStorage(name: string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  };
}