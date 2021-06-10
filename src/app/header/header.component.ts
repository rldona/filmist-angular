import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbmoviesService } from '../../services/dbmovies.service';
import { TranslateService } from '@ngx-translate/core';
import { ScreenService } from '../../services/screen.service';
import { FirebaseService } from '../../services/firebase.service';

import * as firebase from 'firebase';

import { Location } from '@angular/common';

@Component({
  selector: 'fm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: any;
  settings: any;

  query: string;
  showBigMenu: boolean;
  showBS: boolean;
  showMenu: boolean;
  showOptions: boolean;

  languageES: boolean;
  languageEN: boolean;
  languageFR: boolean;

  showMiniLogin: boolean;

  resultsSearch: any;

  constructor(private _router: Router,
              private _dbmoviesService: DbmoviesService,
              private translate: TranslateService,
               private _firebaseService: FirebaseService,
              private _location: Location,
              private _screenService: ScreenService) {

    this.settings = {
      allowExitApps: false,
      avatar: null,
      lang: 'es'
    };

    this.showBigMenu = false;
    this.showBS      = false;
    this.showMenu    = false;
    this.showOptions = false;

    this.showMiniLogin = false;

    this.resultsSearch = [];

    this.languageES = this._dbmoviesService.getLang() === 'es' ? true : false;
    this.languageEN = this._dbmoviesService.getLang() === 'en' ? true : false;
    this.languageFR = this._dbmoviesService.getLang() === 'fr' ? true : false;

    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        this.showMiniLogin = true;
        this.user = user;

        firebase.default.database().ref('users/' + user.uid + '/settings').once('value', (snapshot) => {
          if (snapshot.val()) {
            this.settings = snapshot.val();
            if (typeof this.settings.avatar === 'undefined') {
              this.settings.avatar = null;
            }
          }
        });
      }
    });
  }

  back() {
    if (!this._firebaseService.getIsBack()) {
      this._firebaseService.setIsBack(true);
      this._location.back();
    }
  }

  searchEnter(e: { key: string; }) {
    if (e.key === 'Enter') {
      this._router.navigate(['/search', this.query ]);
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      this.close();
      this.query = '';
    }
  }

  searchTitle(_e: any) {
    if (typeof this.query !== 'undefined' && this.query !== '') {
      this._dbmoviesService.getList(this.query)
          .then((response) => {
            this.resultsSearch = [];

            let size = response.results.length;

            for (let i = 0; i < size ; i++) {
              if (response.results[i].vote_count > 0) {
                this.resultsSearch.push(response.results[i]);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
    } else {
      this.resultsSearch = [];
    }
  }

  loadMovieSearch(movie: { name: any; id: any; }) {
    let type = movie.name ? 'tv' : 'movie';

    this._dbmoviesService.setMediaType(type);
    this._dbmoviesService.setCurrentType(type);

    this._router.navigate(['movies', movie.id ]);

    this.query = '';
    this.resultsSearch = [];

    this.close();

    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  showBigSearch() {
    this.showBS = !this.showBS;
    setTimeout(() => document.getElementById('bigSearchInput').focus(), 0);
  }

  showMenuAside() {
    if (this._screenService.isDesktop || this._screenService.isTablet) {
      this.showBigMenu = !this.showBigMenu;
    } else {
      this.showMenu = !this.showMenu;
    }

    document.getElementsByTagName('body')[0].className += 'block';
  }

  showMenuOptions() {
    this.showOptions = !this.showOptions;
  }

  close() {
    this.showBS      = false;
    this.showBigMenu = false;
    this.showMenu    = false;
    this.showOptions = false;

    document.body.className = document.body.className.replace('block', '');
  }

  activeLanguage(lang: string) {
    if (lang === 'es') {
      this.languageES = true;
      this.languageEN = false;
      this.languageFR = false;
    } else if (lang === 'en') {
      this.languageES = false;
      this.languageEN = true;
      this.languageFR = false;
    } else {
      this.languageES = false;
      this.languageEN = false;
      this.languageFR = true;
    }

    this._dbmoviesService.setLang(lang);
    this.translate.use(lang);
    this.close();
  }

  navigateTo(_route: any) {
    this._router.navigate(['lists']);
  }

  login() {
    this._router.navigate(['/login']);
  }

  logout() {
    this._firebaseService.logout()
      .then((_response: any) => {
        // this._firebaseService.setIsBack(false);
        this.showOptions = false;
        this.showMiniLogin = false;
        // this._router.navigate(['/lists']);
      })
      .catch((_error: any) => console.log('logout error'));
  }
}
