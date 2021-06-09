import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[fmMovieListFilter]'
})
export class MovieListFilterDirective {

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

  @Input()

  set fmMovieListFilter(movie: { vote_average: number; }) {
    if (movie.vote_average > 5) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
