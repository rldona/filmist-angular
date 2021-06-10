import { Component, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DbmoviesService } from '../../services/dbmovies.service';
import { Movie } from '../movie-item/movie';

@Component({
  selector: 'fm-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnChanges {
  @Input() title: string;
  @Input() list: any;
  @Input() type: any;
  @Input() collection: any;
  @Input() hideShowMore: any;

  filterList: any;

  constructor(private _router: Router, private _dbmoviesService: DbmoviesService) {
    this.filterList = [];
  }

  ngOnChanges(): any {
    this.filterList = [];

    if (typeof this.list !== 'undefined') {
      for (let i = 0; i < this.list.length; i++) {
        if (i >= 10) {
          return true;
        } else {
          this.filterList.push(new Movie(
            this.list[i].id,
            this.list[i].title,
            this.list[i].name,
            this.list[i].poster_path,
            this.list[i].release_date,
            this.list[i].first_air_date,
            this.list[i].vote_average,
            this.list[i].vote_count
          ));
        }
      }
    }
  }

  loadMore() {
    this._dbmoviesService.setCurrentCollection(this.collection);
    this._dbmoviesService.setCurrentType(this.type);
    this._router.navigate(['/top-list', this.collection]);
  }
}
