import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// routes
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// services
import { UserService } from './user.service';
// import { FirebaseService } from './firebase.service';
 import { DbmoviesService } from './dbmovies.service';
// import { ScreenService } from './screen.service';

// resolves
import { HomeResolve } from './home/home.resolve';

// guards
import { HomeCanActivate } from './home/home.canActivate';

// consts
export const stateComponents = [
  AppComponent,
  // HeaderComponent,
  // LoadingComponent,
  // MovieListComponent,
  // MovieItemComponent,
  // MovieFeaturedComponent,
  // MovieScoreComponent,
  // ResultListComponent,
  // GenreListComponent
];

export const routesComponents = [
  HomeComponent,
  // SearchComponent,
  // DetailComponent,
  // GenresComponent,
  // VideoGenreComponent,
  // ActorDetailComponent,
];

export const pipes = [
  // RuntimeConvertPipe
];

export const services = [
  UserService,
  // FirebaseService,
  DbmoviesService,
  // ScreenService
];

export const resolves = [
  HomeResolve,
  // SearchResolve,
  // DetailResolve,
  // GenresResolve,
  // MovieGenreResolve,
  // ActorDetailResolve
];

export const guards = [
  // LoggedInGuard,
  HomeCanActivate,
  // HomeCanDeactivate,
  // DetailCanActivate,
  // DetailCanDeactivate
];

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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
