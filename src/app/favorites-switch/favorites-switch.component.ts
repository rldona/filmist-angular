import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

import { DbmoviesService } from '../../services/dbmovies.service';

@Component({
  selector: 'fm-favorites-switch',
  templateUrl: './favorites-switch.component.html',
  styleUrls: ['./favorites-switch.component.scss']
})
export class FavoritesSwitchComponent implements OnInit {

  constructor(private _dbmoviesService: DbmoviesService) { }

  ngOnInit() { }

  onSelectItem(item: { type: string; checked: any; }) {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        // Set checked
        firebase.default
          .database()
          .ref('users/' + user.uid + '/favorites/' + this._dbmoviesService.currentMovie.id + '/' + item.type)
          .set(item.checked);

        // Add o remove from 'favorites list'
        if (item.checked) {
          this._dbmoviesService.setFavoriteList(this._dbmoviesService.getCurrentMovie(), item.type, 'movie');
        } else {
          this._dbmoviesService.removeFavoriteList(this._dbmoviesService.getCurrentMovie(), item.type);
        }

        // Sync list to Firebase
        firebase.default
          .database()
          .ref('users/' + user.uid + '/list/' + item.type)
          .set(this._dbmoviesService.getFavoriteList(item.type));
      }
    });
  }
}
