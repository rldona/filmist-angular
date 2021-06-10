import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DbmoviesService } from '../../services/dbmovies.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fm-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit, OnDestroy {
  @Input() list: any;
  @Input() id: any;
  @Input() title?: string;
  @Input() hideGenre: boolean;
  @Input() serviceMethod: string;

  @Input() collection: string;

  sub: any;

  hideByCollection: any;

  genre: any;
  page: number;
  titleType: string;
  type: string;
  pageServer: number;
  showNoMoreResults: boolean;

  constructor(private _dbmoviesService: DbmoviesService,
              private translate: TranslateService,
              private route: ActivatedRoute) {
    this.titleType = this._dbmoviesService.getCurrentType() === 'tv' ? this.translate.instant('TV') : this.translate.instant('MOVIES');
    this.type = this._dbmoviesService.getCurrentType();
    this.genre = this._dbmoviesService.getCurrentGenre();
    this.page = 1;
    this.showNoMoreResults = false;
    this.pageServer = 1;

    this.translate.onLangChange.subscribe((_langChange) => {
      this.titleType = this._dbmoviesService.getCurrentType() === 'tv' ? this.translate.instant('TV') : this.translate.instant('MOVIES');
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.hideByCollection = params.hasOwnProperty('collection');
      if (params.hasOwnProperty('collection')) {
        this.title = this.convertTitle();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  convertTitle() {
    let title = null;

    switch (this._dbmoviesService.getCurrentCollection()) {
      case 'now-playing':
        title = this._dbmoviesService.currentType === 'movie' ?
                this.translate.instant('BILLBOARD-RELEASES') :
                this.translate.instant('BILLBOARD-RELEASES');
        break;
      case 'upcoming':
        title = this.translate.instant('UPCOMING-MOVIES');
        break;
      case 'top-rated':
        title = this._dbmoviesService.currentType === 'movie' ?
                this.translate.instant('DISCOVER-RECOMENDED-MOVIES') :
                this.translate.instant('DISCOVER-TV-TOP-RATED');
        break;
      case 'on-the-air':
        title = this.translate.instant('DISCOVER-TV-ON-AIR');
        break;
      case 'popular':
        title = this._dbmoviesService.currentType === 'movie' ?
                this.translate.instant('DISCOVER-TV-POPULAR') :
                this.translate.instant('DISCOVER-TV-POPULAR');
        break;
      default:
        break;
    }

    return title;
  }

  onScrollDown() {
    this.page = this.page + 1;

    if (this.page <= this.list.total_pages) {
      if (this.collection === 'similar') {
        this.serviceMethod = 'similar';

        this._dbmoviesService['getSimilar'](this._dbmoviesService.getCurrentMovie().id, this.page)
          .then((response: any) => {
            this.pageServer = response.page;
            for (let i = 0; i < response.results.length; i++) {
              this.list.results.push(response.results[i]);
            }
          })
          .catch((error) => console.log(error));
      }

      if (this.serviceMethod === 'getTop') {

        if (this._dbmoviesService.getCurrentCollection() === 'now-playing') {
          this._dbmoviesService.setCurrentCollection('now_playing');
        }

        if (this._dbmoviesService.getCurrentCollection() === 'top-rated') {
          this._dbmoviesService.setCurrentCollection('top_rated');
        }

        if (this._dbmoviesService.getCurrentCollection() === 'on-the-air') {
          this._dbmoviesService.setCurrentCollection('on_the_air');
        }

        this._dbmoviesService['getTop'](this._dbmoviesService.getCurrentCollection(), this.type, this.page)
          .then((response: any) => {
            this.pageServer = response.page;
            for (let i = 0; i < response.results.length; i++) {
              this.list.results.push(response.results[i]);
            }
          })
          .catch((error) => console.log(error));

      }

      if (this.serviceMethod === 'getListByGenre') {
        this._dbmoviesService['getListByGenre'](this.genre['id'], this.type, this.page)
          .then((response: any) => {
            this.pageServer = response.page;
            for (let i = 0; i < response.results.length; i++) {
              this.list.results.push(response.results[i]);
            }
          })
          .catch((error) => console.log(error));
      }

      if (this.serviceMethod === 'getListByActor') {
        this._dbmoviesService['getMoviesByActor'](this.id, this.page)
          .then((response: any) => {
            this.pageServer = response.page;
            for (let i = 0; i < response.results.length; i++) {
              this.list.results.push(response.results[i]);
            }
          })
          .catch((error) => console.log(error));
      }
    } else {
      this.showNoMoreResults = true;
    }
  }

  upReturn() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
}
