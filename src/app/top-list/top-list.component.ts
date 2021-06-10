import { Component, OnInit } from '@angular/core';
import { DbmoviesService } from '../../services/dbmovies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fm-top-list',
  templateUrl: './top-list.component.html',
  styleUrls: ['./top-list.component.scss']
})
export class TopListComponent implements OnInit {
  collection: string;
  topList: any;

  lists: any;

  constructor(private _router: ActivatedRoute,
              private _dbmoviesService: DbmoviesService,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    let indexCollection = 0;

    this._router.params.subscribe(params => {
      this.collection = params['collection'];
    });

    let type: any = this._dbmoviesService.getCurrentType();

    switch (this.collection) {
      case 'now-playing':
        indexCollection = 0;
        break;
      case 'upcoming':
        indexCollection = 2;
        break;
      case 'top-rated':
        indexCollection = type === 'tv' ? 5 : 3;
        break;
      case 'popular':
        indexCollection = type === 'tv' ? 6 : 1;
        break;
      case 'on-the-air':
        indexCollection = 4;
        break;
      default:
        indexCollection = 0;
        break;
    }

    this.lists = this._route.snapshot.data['home'][indexCollection];

    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
}
