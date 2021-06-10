import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Routes Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MovieFeaturedComponent } from './movie-featured/movie-featured.component';
import { MovieScoreComponent } from './movie-score/movie-score.component';
import { ResultListComponent } from './result-list/result-list.component';
import { GenreListComponent } from './genre-list/genre-list.component';
import { FavoritesSwitchComponent } from './favorites-switch/favorites-switch.component';
import { FavoritesSwitchItemComponent } from './favorites-switch-item/favorites-switch-item.component';
import { ModalComponent } from './modal/modal.component';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';

// State Components
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { GenresComponent } from './genres/genres.component';
import { VideoGenreComponent } from './video-genre/video-genre.component';

// Services
import { UserService } from '../services/user.service';
import { FirebaseService } from '../services/firebase.service';
import { DbmoviesService } from '../services/dbmovies.service';
import { ScreenService } from '../services/screen.service';
import { FavoritesComponent } from './favorites/favorites.component';

// Resolves
import { HomeResolve } from './home/home.resolve';
import { SearchResolve } from './search/search.resolve';
import { DetailResolve } from './detail/detail.resolve';
import { GenresResolve } from './genres/genres.resolve';
import { MovieGenreResolve } from './video-genre/video-genre.resolve';
import { ActorDetailResolve } from './actor-detail/actor-detail.resolve';

// Guards
import { HomeCanActivate } from './home/home.canActivate';
import { HomeCanDeactivate } from './home/home.canDeactivate';
import { DetailCanDeactivate } from './detail/detail.canDeactivate';
import { DetailCanActivate } from './detail/detail.canActivate';

// Plugins
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { LoginComponent } from './login/login.component';
import { LoggedInGuard } from './shared/logged-in-guard/logged-in-guard';
import { PreloadComponent } from './preload/preload.component';

// Pipes
import { RuntimeConvertPipe } from './detail/multiplicador.pipe';
import { RegisterComponent } from './register/register.component';
import { RememberComponent } from './remember/remember.component';
import { TopListComponent } from './top-list/top-list.component';
import { MovieListFilterDirective } from './movie-list/movie-list-filter.directive';

// consts
export const stateComponents = [
  AppComponent,
  HeaderComponent,
  MovieListComponent,
  MovieItemComponent,
  MovieFeaturedComponent,
  MovieScoreComponent,
  ResultListComponent,
  GenreListComponent,
  FavoritesSwitchComponent,
  FavoritesSwitchItemComponent,
  ModalComponent,
  MovieListFilterDirective,
  PreloadComponent,
  RegisterComponent,
  RememberComponent,
  LoadingComponent,
  TopListComponent,
  VideoGenreComponent,
];

export const routesComponents = [
  LoginComponent,
  HomeComponent,
  SearchComponent,
  DetailComponent,
  GenresComponent,
  ActorDetailComponent,
  FavoritesComponent
];

export const pipes = [
  RuntimeConvertPipe
];

export const services = [
  UserService,
  FirebaseService,
  DbmoviesService,
  ScreenService
];

export const resolves = [
  HomeResolve,
  SearchResolve,
  DetailResolve,
  GenresResolve,
  MovieGenreResolve,
  ActorDetailResolve
];

export const guards = [
  LoggedInGuard,
  HomeCanActivate,
  HomeCanDeactivate,
  DetailCanActivate,
  DetailCanDeactivate
];

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'swipe': {velocity: 0.4, threshold: 20} // override default settings
  };
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    ...stateComponents,
    ...routesComponents,
    ...pipes,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ...services,
    ...resolves,
    ...guards,
    { provide: HAMMER_GESTURE_CONFIG,  useClass: MyHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
