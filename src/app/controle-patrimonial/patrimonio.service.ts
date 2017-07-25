import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class PatrimonioService {
  patrimonios: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.patrimonios = db.list('/patrimonios');
  }

}
