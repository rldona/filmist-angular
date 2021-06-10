import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DbmoviesService } from '../../services/dbmovies.service';
import { ScreenService } from '../../services/screen.service';

@Component({
  selector: 'fm-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent {
  @Input() movie: any;

  velo: boolean;
  addHover: boolean;

  posterSize: string;

  constructor(private _router: Router,
              private _dbmoviesService: DbmoviesService,
              private _screenService: ScreenService) {
    this.velo = false;
    this.addHover = false;

    this.posterSize = this._screenService.isDesktop ? 'w185' : this._screenService.isTablet ? 'w154' : 'w154';
  }

  loadDetail(movie: { name: any; id: any; }): void {
    let mediaType = typeof movie.name !== 'undefined' ? 'tv' : 'movie';

    this._dbmoviesService.setMediaType(mediaType);
    this._dbmoviesService.setCurrentType(mediaType);
    this._router.navigate(['movies', movie.id ]);

    setTimeout(() => window.scroll({ top: 0, left: 0, behavior: 'smooth' }), 150);
  }

  showVelo(_e: any) {
    this.addHover = this.addHover ? false : true;
  }
}
