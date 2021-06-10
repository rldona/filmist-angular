import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../../services/user.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'fm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  location: any;

  constructor(private _firebaseService: FirebaseService,
              private _router: Router,
              private _location: Location) {
    this.location = _location;
  }

  back(): void {
    this._location.back();
  }

  onRegister(form: any): void {
    this._firebaseService.registerUser({email: form.email, password: form.password})
      .then((user) => {
        console.log(user);
        // update user
        this._firebaseService.updateUser(user, form.name);
        this._firebaseService.setConfig('currentRoute', 'register');
        // redirect to home
        this._router.navigate(['/preload']);
      }).catch((error) => {
        console.log(error);
      });
  }
}
