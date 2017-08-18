import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  routeNames = ["Controle Patrimonial", "Usuários", "Configurações", "Sair"];
  user: Observable<firebase.User>;
  logado:boolean = false;
  
    constructor(public afAuth: AngularFireAuth, private router: Router) {
      this.user = afAuth.authState;
      this.user.subscribe(snap => {
        if (snap == null) {
          this.logado = false;
        } else {
          this.logado = true;
        }
      });
    }
  
    logout() {
      this.afAuth.auth.signOut();
    }
}
