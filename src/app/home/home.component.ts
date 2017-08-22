import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  usuario;
  
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      if (user.email != undefined) {
        db.list('/usuarios',{
          query: {
            orderByChild: 'email',
            equalTo: user.email
          }
        }).subscribe(usuarios => {
          this.usuario = usuarios[0];
          console.log(this.usuario);
        });
      }
    });
  }

  ngOnInit() {
  }

}
