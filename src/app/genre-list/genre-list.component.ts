import { Component, Input } from '@angular/core';
import { DbmoviesService } from '../../services/dbmovies.service';

@Component({
  selector: 'fm-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent {

  @Input() title: string;
  @Input() list: any;
  @Input() type: string;

  service: any;

  constructor(private _dbmoviesService: DbmoviesService) {
    this.service = this._dbmoviesService;
  }

}
