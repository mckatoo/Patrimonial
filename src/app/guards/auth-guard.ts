import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  logado:boolean = false;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(snap => {
        if (snap == null) {
          this.logado = false;
        } else {
          this.logado = true;
        }
      });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | boolean {
    if (this.logado == true) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }

}
