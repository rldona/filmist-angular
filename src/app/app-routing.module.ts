import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HomeResolve } from './home/home.resolve';

const routes: Routes = [

  { path: '', redirectTo: 'lists', pathMatch: 'full' },

  {
    path: 'lists',
    component: HomeComponent,
    // canActivate: [ LoggedInGuard ],
    resolve: {
      home: HomeResolve
    }
  },

  { path: '**', redirectTo: 'lists' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
