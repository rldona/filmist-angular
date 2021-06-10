import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { DbmoviesService } from '../../services/dbmovies.service';

@Injectable()
export class DetailResolve implements Resolve<any> {

  constructor(private _dbmoviesService: DbmoviesService) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this._dbmoviesService.getDetailExtend(route.params['id']);
  }
}
