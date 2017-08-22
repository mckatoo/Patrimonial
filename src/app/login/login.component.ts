import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
// import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;
  erro: string = '';
  sucesso: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
    this.user.subscribe(user => {
      if (user != null && router.routerState.snapshot.url == '/login') {
        this.router.navigate(['']);
      }
    });
  }

  ngOnInit() {
  }

  login(form) {
    this.afAuth.auth.signInWithEmailAndPassword(form.value.email,form.value.senha)
    .then((success) => {
      this.router.navigate(['']);
    })
    .catch((erro) => {
      this.sucesso = '';
      this.erro = erro.message;
    })
  }

  reset(email?:string) {
    if (email == '') {
      this.sucesso = '';
      this.erro = "Preencha no campo email para qual a senha deve ser refeita.";
    } else {
      this.afAuth.auth.sendPasswordResetEmail(email).then(sucesso => {
        this.erro = '';
        this.sucesso = 'sucesso';
      });
    }
  }

}
