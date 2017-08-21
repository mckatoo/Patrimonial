import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  user: Observable<firebase.User>;
  logado: boolean = false;
  estadoMenu:string = "menu-out";
  estadoBotaoMenu:string = "btn-menu-out";

  constructor(private afAuth: AngularFireAuth, private router: Router, private translate: TranslateService) {
    translate.addLangs(["pt_BR"]);
    translate.setDefaultLang('pt_BR');

    this.user = afAuth.authState;

    this.user.subscribe(snap => {
      if (snap == null) {
        this.logado = false;
        this.router.navigate(['/login']);
      } else {
        this.logado = true;
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
    this.afAuth.auth.signOut();
  }
}
