import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import { FirebaseService } from '../../services/firebase.service';
import { DbmoviesService } from '../../services/dbmovies.service';

@Component({
  selector: 'fm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  navigator: any;
  showRegister: boolean;

  constructor(private _router: Router,
              private _dbmoviesService: DbmoviesService,
              private _firebaseService: FirebaseService) {
    this.navigator    = _router;
    this.showRegister = false;
  }

  ngOnInit() {

    this._dbmoviesService.showModal = false;

    // firebase.default.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this._router.navigate(['/lists']);
    //   } else {
    //     console.log('No user is signed in [login]');
    //   }
    // });
  }

  loginFilmist(form: any): void {
    this._firebaseService.passwordAuthProvider(form)
      .then((_response: any) => {

        console.log('**** is logged ****');

        this._firebaseService.setConfig('currentRoute', 'login');
        this._router.navigate(['/preload']);
      }).catch((error: any) => {
        console.log(error);
      });
  }

  loginGoogle(): void {
    const user = firebase.default.auth().currentUser;

    if (!user) {
      this._firebaseService.googleAuthProvider()
        .then((_response: any) => {
          this._firebaseService.setIsBack(false);
          this._router.navigate(['/lists']);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }

  register() {
    this._router.navigate(['/register']);
  }

  remember() {
    this._router.navigate(['/remember']);
  }

  logout(): void {
    this._firebaseService.logout()
      .then((_response: any) => {
        this._firebaseService.setIsBack(false);
      }, (_error: any) => {
        console.log('An error happened');
      });
  }
}
