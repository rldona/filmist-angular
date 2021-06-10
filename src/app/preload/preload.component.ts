import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import { FirebaseService } from '../../services/firebase.service';
import { DbmoviesService } from '../../services/dbmovies.service';

@Component({
  selector: 'fm-preload',
  templateUrl: './preload.component.html',
  styleUrls: ['./preload.component.scss']
})
export class PreloadComponent implements OnInit {

  constructor(private _firebaseService: FirebaseService,
              private _dbmoviesService: DbmoviesService,
              private _router: Router) { }

  ngOnInit() {
    if (this._firebaseService.getConfig().currentRoute === 'login') {
      this.configLogin();
    } else {
      this.configRegister();
    }
  }

  configLogin() {
    let route = this._dbmoviesService.getCurrentToBack();

    firebase.default.auth().onAuthStateChanged((user) => {
      firebase.default.database().ref('users/' + user.uid + '/favorites').once('value', (snapshot) => {
        let arr = [];

        if (snapshot.val()) {
          this._dbmoviesService.setFavorite(Object.keys(snapshot.val()), 'list');
        }

        for (let i = 0; i < this._dbmoviesService.getFavorites().length; i++) {
          arr.push(+(this._dbmoviesService.getFavorites()[i]));
        }

        this._dbmoviesService.setFavorite(arr, 'list');

        console.log('getFavorites(): ', this._dbmoviesService.getFavorites());

        setTimeout(() => {
          this._router.navigate(['/' + route]);
        }, 2500);
      });
    });
  }

  configRegister() {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.default.database().ref('users/' + user.uid).set({
          info: {
            id: user.uid,
            name: user.displayName,
            email: user.email
          },
          settings: {
            lang: 'es',
            allowExitApp: false
          }
        });

        firebase.default.database().ref('users/' + user.uid + '/list/init').set({
          init: 'init'
        });

        firebase.default.database().ref('users/' + user.uid + '/search/init').set({
          init: 'init'
        });

        setTimeout(() => {
          this._router.navigate(['/lists']);
        }, 2500);
      }
    });
  }
}
