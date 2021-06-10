import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private _router: Router, private _firebaseService: FirebaseService) { }

  canActivate(_route: ActivatedRouteSnapshot): boolean {
    let redirect = false;

    for (let i = 0, len = localStorage.length; i < len; ++i ) {
      if (localStorage.key(i).indexOf('authUser') !== -1) {
        redirect = true;
      }
    }

    console.log('OAuth: ', redirect);

    if (redirect) { // !user
      this._router.navigate(['/lists']); // ['/login']
      return false;
    }

    return true;
  }
}
