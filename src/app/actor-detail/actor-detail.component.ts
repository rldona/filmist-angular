import { Component, OnInit } from '@angular/core';
import { DbmoviesService } from '../../services/dbmovies.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'fm-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.scss']
})
export class ActorDetailComponent implements OnInit {
  actorId: any;
  actorDetail: any;
  movieList: any;

  constructor(
    private _route: ActivatedRoute,
    private _dbmoviesService: DbmoviesService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    let actorDetailResolve = this._route.snapshot.data['actor'];

    this._route.params.subscribe((params: any) => {
      this.actorId = +params['id'];
    });

    // API
    this.actorDetail = actorDetailResolve[0];
    this.movieList = actorDetailResolve[1];

    this.translate.onLangChange.subscribe(() => {
      this.reloadData();
    });
  }

  reloadData() {
    this._dbmoviesService.getMoviesByActor(this.actorId).then((res: any) => {
      this.movieList = res;
    });
  }
}
