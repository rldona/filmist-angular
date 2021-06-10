import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbmoviesService } from '../../services/dbmovies.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'fm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  title: string;
  query: string;

  list: any[];

  page: number;
  totalPages: number;

  showNoMoreResults: boolean;

  windowHeight: number;
  pageServer: number;

  constructor(private _route: ActivatedRoute,
              private _dbmoviesService: DbmoviesService,
              private translate: TranslateService) {

    this.windowHeight = window.innerHeight;
    this.page = 1;
    this.showNoMoreResults = false;
    this.pageServer = 1;

    this.translate.onLangChange.subscribe((_langChange) => {
      this.reloadData();
    });

    this._route.params.subscribe(params => {
      this.query = params['title'];
    });

  }
  /**
   *
   * ¡¡ IMPORTANTE !!
   *
   * Este hook es NECESARIO cuando trabajamos con 'resolve'
   * ya que evita la cache y muestra los nuevo resultados
   * de la llamada al API que no se mostrarían si usaramos
   * el hook 'ngOnInt()'.
   *
   * Por defecto Angular realiza la caché de la vista.
   *
   * Usar 'ngOnInit()' si no queremos nuevos resultados
   * como por ejempolo en la 'Home' de la 'App' ya que son
   * siempre los mismo datos.
   *
   */
  ngOnInit(): void {
    this._route.params.subscribe((params: any) => {
      this.title = params.title;
      this.list = this._route.snapshot.data['search'].results;
      this.totalPages = this._route.snapshot.data['search'].total_pages;
    });
  }

  onScrollDown() {
    this.page = this.page + 1;

    if (this.page <= this.totalPages) {
      this._dbmoviesService.getList(this.title, this.page)
        .then((response: any) => {
            this.pageServer = response.page;
            for (let i = 0; i < response.results.length; i++) {
              this.list.push(response.results[i]);
            }
        })
        .catch((error) => console.log(error));
    } else {
      this.showNoMoreResults = true;
    }
  }

  upReturn() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  reloadData() {
    this._dbmoviesService.getList(this.query, this.page).then((response: any) => {
      this.list = [];
      this.totalPages = 0;
      this.list       = response.results;
      this.totalPages = response.total_pages;
    });
  }
}
