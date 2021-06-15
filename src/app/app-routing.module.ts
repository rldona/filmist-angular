import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { SearchComponent } from './search/search.component';
import { GenresComponent } from './genres/genres.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { TopListComponent } from './top-list/top-list.component';
import { VideoGenreComponent } from './video-genre/video-genre.component';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';

import { PreloadComponent } from './preload/preload.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RememberComponent } from './remember/remember.component';

import { HomeResolve } from './home/home.resolve';
import { DetailResolve } from './detail/detail.resolve';
import { SearchResolve } from './search/search.resolve';
import { GenresResolve } from './genres/genres.resolve';
import { MovieGenreResolve } from './video-genre/video-genre.resolve';
import { ActorDetailResolve } from './actor-detail/actor-detail.resolve';

import { LoggedInGuard } from './shared/logged-in-guard/logged-in-guard';

const routes: Routes = [

  { path: '', redirectTo: 'lists', pathMatch: 'full' },

  {
    path: 'preload',
    component: PreloadComponent
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ LoggedInGuard ]
  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ LoggedInGuard ]
  },

  {
    path: 'remember',
    component: RememberComponent,
    canActivate: [ LoggedInGuard ]
  },

  {
    path: 'lists',
    component: HomeComponent,
    resolve: {
      home: HomeResolve
    }
  },

  {
    path: 'favorites',
    component: FavoritesComponent
  },

  {
    path: 'genres',
    component: GenresComponent,
    resolve: {
      genres: GenresResolve
    }
  },

  {
    path: 'search/:title',
    component: SearchComponent,
    resolve: {
      search: SearchResolve
    }
  },

  {
    path: 'top-list/:collection',
    component: TopListComponent,
    resolve: {
      home: HomeResolve
    }
  },

  {
    path: 'movies/:id',
    component: DetailComponent,
    resolve: {
      detail: DetailResolve
    }
  },

  {
    path: 'movies/genre/:id',
    component: VideoGenreComponent,
    resolve: {
      genre: MovieGenreResolve
    }
  },

  {
    path: 'actors/:id',
    component: ActorDetailComponent,
    resolve: {
      actor: ActorDetailResolve
    }
  },

  { path: '**', redirectTo: 'lists' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
