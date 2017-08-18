import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { CanActivate, ActivateRouteSnapshot, RouteStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth) {}

  canActivate(route: ActivateRouteSnapshot, state: RouteStateSnapshot):Observable<boolean> | boolean {
    if (this.afAuth.authState != null) {
      return true;
    }
  }

}
