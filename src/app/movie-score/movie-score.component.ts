import { Component, Input } from '@angular/core';

@Component({
  selector: 'fm-movie-score',
  templateUrl: './movie-score.component.html',
  styleUrls: ['./movie-score.component.scss']
})
export class MovieScoreComponent {
  @Input() title: string;
  @Input() score: number;

  constructor() {}
}
