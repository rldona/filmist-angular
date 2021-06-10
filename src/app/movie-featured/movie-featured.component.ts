import { Component, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DbmoviesService } from '../../services/dbmovies.service';
import { ScreenService } from '../../services/screen.service';

@Component({
  selector: 'fm-movie-featured',
  templateUrl: './movie-featured.component.html',
  styleUrls: ['./movie-featured.component.scss']
})
export class MovieFeaturedComponent implements OnChanges {
  @Input() lists: any;
  @Input() detail: any;
  @Input() options: any;

  movie: any;

  backdropSize: string;
  posterSize: string;

  constructor(private _router: Router,
              private _dbmoviesService: DbmoviesService,
              private _screenService: ScreenService) {}

  ngOnChanges(): void {

    this.backdropSize = this._screenService.isDesktop ? 'w1280' : this._screenService.isTablet ? 'w780' : 'w500';
    this.posterSize   = this._screenService.isDesktop ? 'w500' : this._screenService.isTablet ? 'w154' : 'w92';

    if (typeof this.lists === 'undefined') {
      // Detail Page
      this.movie = this.detail;
      // this.movie.title = '';
    } else {
      // Home Page
      this.movie = this.lists.results[Math.floor(Math.random() * this.lists.results.length)];
    }
  }

  loadDetail(movie: { name: any; id: any; }): void {
    let mediaType = typeof movie.name !== 'undefined' ? 'tv' : 'movie';
    this._dbmoviesService.setMediaType(mediaType);
    this._router.navigate(['/movies', movie.id ]);
  }
}
