import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { DbmoviesService } from '../../services/dbmovies.service';

@Injectable()
export class ActorDetailResolve implements Resolve<any> {

  constructor(private _dbmoviesService: DbmoviesService) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this._dbmoviesService.getActorDetail(route.params['id']);
  }
}
