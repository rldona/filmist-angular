import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { DbmoviesService } from '../../services/dbmovies.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'fm-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, DoCheck {

  movieId: any;
  movie: any;
  similarList: any;
  actors: any;
  crew: any;
  // actorsFull: any;
  reviews: any;
  images: any;

  location: any;

  recomendationsTitle: string;

  director: any;
  screenplay: any;
  musicEditor: any;
  directorPhotography: any;

  showModal: boolean;

  title: string;
  type: string;
  year: string;

  constructor(private _route: ActivatedRoute,
              private _location: Location,
              private _router: Router,
              private _dbmoviesService: DbmoviesService,
              private translate: TranslateService) {

    this.location = this._location;

    this.translate.onLangChange.subscribe((_langChange) => {
      this.recomendationsTitle = this.translate.instant('DISCOVER-OTHER-RECOMMENDATIONS');
    });

    translate.get('DISCOVER-OTHER-RECOMMENDATIONS').subscribe((res: string) => {
        this.recomendationsTitle = res;
    });

    this.translate.onLangChange.subscribe((_langChange) => {
      this.reloadData();
    });

    this._route.params.subscribe(params => {
      this.movieId = +params['id'];
    });
  }

  ngOnInit(): void {
    let detailResolve = this._route.snapshot.data['detail'];

    this._route.url.subscribe(params => {
      this._dbmoviesService.setCurrentToBack(params[0].path + '/' + params[1].path);
    });

    // API
    this.movie          = detailResolve[0];
    this.similarList    = this.filterNumberResults(detailResolve[1].results, 5);
    this.actors         = this.filterNumberResults(detailResolve[2].cast, 5);
    this.crew           = detailResolve[2].crew;
    // this.actorsFull     = this.filterNumberResults(detailResolve[2].cast, 15);

    this.director = this.searchCrew('Director');
    this.screenplay = this.searchCrew('Screenplay');
    this.musicEditor = this.searchCrew('Music Editor');
    this.directorPhotography = this.searchCrew('Director of Photography');

    this.year = this.movie['release_date'] || this.movie['first_air_date'];
    // this.title = this.movie['title'] || this.movie['name'];
    this.type = this._dbmoviesService.currentType;

    this._dbmoviesService.setCurrentMovie(this.movie);

  }

  ngDoCheck() {
    let detailResolve = this._route.snapshot.data['detail'];
    this.movie        = detailResolve[0];
    this.crew         = detailResolve[2].crew;
    this.actors       = this.filterNumberResults(detailResolve[2].cast, 5);
    // this.similarList  = this.filterNumberResults(detailResolve[1].results, 5);
    this.showModal = this._dbmoviesService.showModal;
  }

  reloadData() {
    this._dbmoviesService.getFilm(this.movieId).then((res) => {
      this.movie = res;
    });

    this._dbmoviesService.getSimilar(this.movieId).then((res) => {
      this.similarList = this.filterNumberResults(res.results, 5);
    });
  }

  loadActor(actor: { id: any; }) {
    if (this.type !== 'tv') {
      this._router.navigate(['actors', actor.id ]);
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  }

  /**
   * TODO: Sacar a un módulo común de utilidades
   *
   * @param {any} array
   * @param {any} max
   * @returns {any[]}
   *
   * @memberOf DetailComponent
   */
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

  searchCrew(job: string) {
    let crewFound: any;

    for (let i = 0; i < this.crew.length; i++) {
      if (this.crew[i].job === job) {
        crewFound = this.crew[i];
      }
    }

    return crewFound;
  }
}
