import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  logado: boolean = false;
  usuario: FirebaseListObservable<any>;
  auth: Observable<firebase.User>;
  estadoMenu: string = "menu-out";
  estadoBotaoMenu: string = "btn-menu-out";

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router,
    private translate: TranslateService
  ) {
    translate.addLangs(["pt_BR"]);
    translate.setDefaultLang('pt_BR');

    this.auth = afAuth.authState;

    this.auth.subscribe(auth => {
      if (auth == null) {
        this.router.navigate(['/login']);
        this.logado = false;
        this.usuario = null;
      } else {
        this.logado = true;
        db.list('/usuarios', {
          query: {
            orderByChild: 'email',
            equalTo: auth.email
          }
        }).subscribe(usuario => {
          this.usuario = usuario[0];
        });
      }
    });
  }

  toggle() {
    if (this.estadoMenu == "menu-out") {
      this.estadoMenu = "menu-in";
      this.estadoBotaoMenu = "btn-menu-in";
    } else {
      this.estadoMenu = "menu-out";
      this.estadoBotaoMenu = "btn-menu-out";
    }
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.logado = false;
        this.usuario = null;
      });
  }
}
