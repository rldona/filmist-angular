import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DbmoviesService } from '../../services/dbmovies.service';

@Component({
  selector: 'fm-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  genreId: number;
  genres: any;
  genreMovieSelect: boolean;
  genreTvSelect: boolean;

  constructor(private _route: ActivatedRoute,
              private translate: TranslateService,
              private _dbmoviesService: DbmoviesService) {
    this.genreMovieSelect = true;
    this.genreTvSelect = false;
  }

  ngOnInit() {
    this.genres = this._route.snapshot.data['genres'];

    this.translate.onLangChange.subscribe((_langChange) => {
      this.reloadData();
    });

    this._route.params.subscribe(params => {
      this.genreId = +params['id'];
    });

  }

  genreSwitch() {
    this.genreMovieSelect = !this.genreMovieSelect;
    this.genreTvSelect = !this.genreTvSelect;
  }

  reloadData() {
    this._dbmoviesService.getGenres().then((res) => {
      this.genres = res;
    });
  }
}
