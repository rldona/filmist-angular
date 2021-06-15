import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { DbmoviesService } from '../services/dbmovies.service';

const LANG_STORAGE = 'lang';
const LANG_INIT = 'es'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public router: Router, public translate: TranslateService, private _dbmoviesService: DbmoviesService) {
    this._dbmoviesService.setLang(JSON.parse(localStorage.getItem(LANG_STORAGE)) || LANG_INIT);
    translate.setDefaultLang(JSON.parse(localStorage.getItem(LANG_STORAGE)) || LANG_INIT);
    translate.use(JSON.parse(localStorage.getItem(LANG_STORAGE)) || LANG_INIT);

    /**
     *  Chech is user is logged
     */
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // check user Firebase
      }
    });
  }
}
