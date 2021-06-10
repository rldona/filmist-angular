import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DbmoviesService } from '../../services/dbmovies.service';

@Component({
  selector: 'fm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lists: any;

  playingNowTitle: string;
  popularTitle: string;
  upcomingTitle: string;
  topRatedTitle: string;
  tvOnAir: string;
  tvToRated: string;
  tvPopular: string;

  constructor(private _route: ActivatedRoute,
              private _dbmoviesService: DbmoviesService,
              private translate: TranslateService) { }

  ngOnInit(): void {

    this.translate.get('BILLBOARD-RELEASES').subscribe((res: string) => {
      this.playingNowTitle = res;
    });

    this.translate.get('DISCOVER-RECOMENDED-MOVIES').subscribe((res: string) => {
      this.popularTitle = res;
    });

    this.translate.get('UPCOMING-MOVIES').subscribe((res: string) => {
      this.upcomingTitle = res;
    });

    this.translate.get('DISCOVER-BEST-RATED-MOVIES').subscribe((res: string) => {
      this.topRatedTitle = res;
    });

    this.translate.get('DISCOVER-TV-ON-AIR').subscribe((res: string) => {
      this.tvOnAir = res;
    });

    this.translate.get('DISCOVER-TV-TOP-RATED').subscribe((res: string) => {
      this.tvToRated = res;
    });

    this.translate.get('DISCOVER-TV-POPULAR').subscribe((res: string) => {
      this.tvPopular = res;
    });

    this.translate.onLangChange.subscribe((_langChange) => {
      this.playingNowTitle = this.translate.instant('BILLBOARD-RELEASES');
      this.popularTitle    = this.translate.instant('DISCOVER-RECOMENDED-MOVIES');
      this.topRatedTitle   = this.translate.instant('DISCOVER-BEST-RATED-MOVIES');
      this.tvOnAir         = this.translate.instant('DISCOVER-TV-ON-AIR');
      this.tvToRated       = this.translate.instant('DISCOVER-TV-TOP-RATED');
      this.tvPopular       = this.translate.instant('DISCOVER-TV-POPULAR');
      // this.reloadLists();
    });

    window.scroll({ top: 0, left: 0, behavior: 'smooth' });

    // apply resolve home
    this.lists = this._route.snapshot.data['home'];
  }

  reloadLists() {
    this._dbmoviesService.getTop('now_playing', 'movie').then((res) => {
      this.lists[0] = res;
    }).catch((error) => {
      console.log(error);
    });

    this._dbmoviesService.getTop('popular', 'movie').then((res) => {
      this.lists[1] = res;
    }).catch((error) => {
      console.log(error);
    });

    this._dbmoviesService.getTop('top_rated', 'movie').then((res) => {
      this.lists[3] = res;
    }).catch((error) => {
      console.log(error);
    });

    this._dbmoviesService.getTop('on_the_air', 'tv').then((res) => {
      this.lists[4] = res;
    }).catch((error) => {
      console.log(error);
    });

    this._dbmoviesService.getTop('top_rated', 'tv').then((res) => {
      this.lists[5] = res;
    }).catch((error) => {
      console.log(error);
    });

    this._dbmoviesService.getTop('popular', 'tv').then((res) => {
      this.lists[6] = res;
    }).catch((error) => {
      console.log(error);
    });
  }
}
