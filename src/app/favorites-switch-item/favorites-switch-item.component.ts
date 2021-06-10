import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import * as firebase from 'firebase';

import { DbmoviesService } from '../../services/dbmovies.service';

@Component({
  selector: 'fm-favorites-switch-item',
  templateUrl: './favorites-switch-item.component.html',
  styleUrls: ['./favorites-switch-item.component.scss']
})
export class FavoritesSwitchItemComponent implements OnInit {

  @Input() title: string;
  @Input() icon: string;
  @Input() type: string;

  @Output() onSelectItem = new EventEmitter();

  itemSelected: boolean;

  showModal: boolean;

  constructor(private _dbmoviesService: DbmoviesService) {
    this.showModal = false;
  }

  ngOnInit() {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.default
          .database()
          .ref('users/' + user.uid + '/favorites/' + this._dbmoviesService.getCurrentMovie().id)
          .on('value', (snapshot) => {
            if (snapshot.val()) {
              this.itemSelected = snapshot.val()[this.type];
            }
          });
      }
    });
  }

  selected() {
    let oAuth = false;

    for (let i = 0, len = localStorage.length; i < len; ++i ) {
      if (localStorage.key(i).indexOf('authUser') !== -1) {
        oAuth = true;
      }
    }

    if (oAuth) {
      // selected toggle
      this.itemSelected = !this.itemSelected;
      // onSeleteItem
      this.onSelectItem.emit({title: this.title, type: this.type, checked: this.itemSelected});
    } else {
      // alert
      this._dbmoviesService.showModal = true;
      this.showModal = true;
    }
  }
}
