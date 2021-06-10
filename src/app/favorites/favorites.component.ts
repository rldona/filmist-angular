import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase';
import { DbmoviesService } from '../../services/dbmovies.service';

@Component({
  selector: 'fm-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, DoCheck {

  favorites: any;
  showModal: boolean;

  constructor(private _dbmoviesService: DbmoviesService, private _route: ActivatedRoute) {
    this.favorites = {
      saved: [],
      viewed: [],
      favorite: []
    };
  }

  ngOnInit() {

    this._route.url.subscribe(params => {
      this._dbmoviesService.setCurrentToBack(params[0].path);
    });

    window.scroll({ top: 0, left: 0, behavior: 'smooth' });

    firebase.default.auth().onAuthStateChanged((user) => {

      if (user) {
        firebase.default.database().ref('users/' + user.uid + '/list/favorite').on('value', (snapshot) => {
          if (snapshot.val()) {
            this._dbmoviesService.setFavoriteList(snapshot.val(), 'favorite', 'array');
            this.favorites.favorite = snapshot.val();
          } else {
            this.favorites.favorite = [];
          }
        });

        firebase.default.database().ref('users/' + user.uid + '/list/viewed').on('value', (snapshot) => {
          if (snapshot.val()) {
            this._dbmoviesService.setFavoriteList(snapshot.val(), 'viewed', 'array');
            this.favorites.viewed = snapshot.val();
          } else {
            this.favorites.viewed = [];
          }
        });

        firebase.default.database().ref('users/' + user.uid + '/list/saved').on('value', (snapshot) => {
          if (snapshot.val()) {
            this._dbmoviesService.setFavoriteList(snapshot.val(), 'saved', 'array');
            this.favorites.saved = snapshot.val();
          } else {
            this.favorites.saved = [];
          }
        });

      }

    });

  }

  ngDoCheck() {
    let oAuth = false;

    for (let i = 0, len = localStorage.length; i < len; ++i ) {
      if (localStorage.key(i).indexOf('authUser') !== -1) {
        oAuth = true;
      }
    }

    if (oAuth) {
      this.showModal = false;
    } else {
      this.showModal = true;
      this.favorites = {
        saved: [],
        viewed: [],
        favorite: []
      };
    }
  }

  filterNumberResults(array: string | any[], max: number): any[] {
    let filter = [];

    for (let i = 0; i < array.length; i++) {
      if (i >= max) {
        break;
      } else {
        filter.push(array[i]);
      }
    }

    return filter;
  }

}
