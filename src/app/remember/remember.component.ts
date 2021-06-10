import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'fm-remember',
  templateUrl: './remember.component.html',
  styleUrls: ['./remember.component.scss']
})
export class RememberComponent {

  f: any;

  constructor(private _location: Location,
              private _firebaseService: FirebaseService,
              private _router: Router) { }

  onRemember(form: { email: any; }) {
    this._firebaseService.rememberPassword(form.email)
      .then(_response => {
        this._router.navigate(['/login']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  back(): void {
    this._location.back();
  }
}
