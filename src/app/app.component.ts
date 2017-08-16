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
  title = 'app';
  user: Observable<firebase.User>;
  
    constructor(public afAuth: AngularFireAuth, private router: Router) {
      this.user = afAuth.authState;
      this.user.subscribe(snap => {
        if (snap == null) {
          console.log("Redirecionando para login.");
          this.router.navigate(['/login']);
        }
      });
    }
  
    logout() {
      this.afAuth.auth.signOut();
    }
}
