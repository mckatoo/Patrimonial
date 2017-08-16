import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;
  erro: string;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
  }

  login(form) {
    this.afAuth.auth.signInWithEmailAndPassword(form.value.email,form.value.senha)
    .then((success) => {
      this.router.navigate(['/controle-patrimonial']);
    })
    .catch((erro) => {
      this.erro = erro.message;
    })
  }

}
