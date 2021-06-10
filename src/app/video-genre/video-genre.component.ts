import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DbmoviesService } from '../../services/dbmovies.service';

@Component({
  selector: 'fm-video-genre',
  templateUrl: './video-genre.component.html',
  styleUrls: ['./video-genre.component.scss']
})
export class VideoGenreComponent implements OnInit {

  genreId: any;
  genreList: any;

  constructor(private _route: ActivatedRoute,
              private translate: TranslateService,
              private _dbmoviesService: DbmoviesService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.genreList = this._route.snapshot.data['genre'];

    this.translate.onLangChange.subscribe((langChange) => {
      this.reloadData();
    });

    this._route.params.subscribe(params => {
      this.genreId = +params['id'];
    });

  }

  reloadData() {
    this._dbmoviesService.getListByGenre(this.genreId).then((res) => {
      this.genreList = res;
    });
  }

}
