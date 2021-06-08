import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { DbmoviesService } from './dbmovies.service';

// declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public router: Router, public translate: TranslateService, private _dbmoviesService: DbmoviesService) {
    if (!JSON.parse(localStorage.getItem('lang'))) {
      this._dbmoviesService.setLang('es');
      translate.setDefaultLang('es');
      translate.use('es');
    } else {
      this._dbmoviesService.setLang(JSON.parse(localStorage.getItem('lang')));
      translate.setDefaultLang(JSON.parse(localStorage.getItem('lang')));
      translate.use(JSON.parse(localStorage.getItem('lang')));
    }

    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationEnd) {
    //     ga('send', 'pageview', event.urlAfterRedirects);
    //   }
    // });
  }
}
