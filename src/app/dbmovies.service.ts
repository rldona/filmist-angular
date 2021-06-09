import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class DbmoviesService {
  // private filmlistAPI: string;
  // private service: string;
  // public current: Object; // REFACTOR
  private API_KEY: string;
  private END_POINT: string;
  private lang: string;
  private list: any;
  private favorites: any;
  private currentToBack: string;

  movies: any;
  public page: number;
  public showModal: boolean = false;
  public currentMedia: any;
  public currentMediaType: string;
  public currentGenre: any;
  public currentType: any;
  public currentCollection: any;
  public currentMovie: any;

  constructor(private http: HttpClient, private _router: Router) {
    this.END_POINT = 'https://api.themoviedb.org/3/';
    this.API_KEY   = 'd29e0f4d164566ae95cfb5022b6ef0c0';

    // this.current = {}; // REFACTOR

    this.favorites = [];

    this.list = {
      favorite: [],
      saved: [],
      viewed: []
    };

    this.currentToBack = null;
    this.lang = this.getLang(); // this.settingsService.options.language.use;
    this.currentMediaType = this.getMediaType();
    this.currentType = this.getCurrentType();
  }

  setLang(lang: string) {
    this.lang = lang;
    localStorage.setItem('lang', JSON.stringify(this.lang));
  }

  getLang() {
    return this.lang || JSON.parse(localStorage.getItem('lang'));
  }

  // TODO: REFACTOR: probar que funciona bien este desarrollo para todos los casos

  // getCurrent(localStorageName) { // REFACTOR
  //   return this.current[localStorageName] || JSON.parse(localStorage.getItem(localStorageName));
  // }

  // setCurrent(localStorageName, value) { // REFACTOR
  //   this.current[localStorageName] = value;
  //   localStorage.setItem(localStorageName, JSON.stringify(this.current[localStorageName]));
  // }

  //
  // # START # Borrar estos getters - setters
  //

  setFavoriteList(movie: any, type: string | number, option: string) {
    if (option === 'array') {
      this.list[type] = movie;
    } else {
      this.list[type].push(movie);
    }
  }

  getFavoriteList(type: string | number) {
    return this.list[type];
  }

  removeFavoriteList(movie: { id: any; }, type: string | number) {
    for (let i = 0; i < this.list[type].length; i++) {
      if (this.list[type][i].id === movie.id) {
        this.list[type].splice(i, 1);
      }
    }
  }

  clearFavoriteList() {
    this.list = {
      favorite: [],
      saved: [],
      viewed: []
    };
  }

  setFavorite(data: any, type: string) {
    if (type === 'list') {
      this.favorites = data;
    } else {
      this.favorites.unshift(data);
    }
  }

  getFavorites() {
    return this.favorites;
  }

  findFavorite(id: any) {
    return this.favorites.indexOf(id);
  }

  getMediaType() {
    return this.currentMediaType || JSON.parse(localStorage.getItem('media-type'));
  }

  setMediaType(type: string) {
    this.currentMediaType = type;
    localStorage.setItem('media-type', JSON.stringify(this.currentMediaType));
  }

  getCurrentToBack() {
    return this.currentToBack || JSON.parse(localStorage.getItem('current-route-to-back'));
  }

  setCurrentToBack(route: string) {
    this.currentToBack = route;
    localStorage.setItem('current-route-to-back', JSON.stringify(this.currentToBack));
  }

  getCurrentMovie() {
    return this.currentMovie || JSON.parse(localStorage.getItem('current-movie'));
  }

  setCurrentMovie(collection: any) {
    this.currentMovie = collection;
    localStorage.setItem('current-movie', JSON.stringify(this.currentMovie));
  }

  getCurrentCollection() {
    return this.currentCollection || JSON.parse(localStorage.getItem('current-collection'));
  }

  setCurrentCollection(collection: any) {
    this.currentCollection = collection;
    localStorage.setItem('current-collection', JSON.stringify(this.currentCollection));
  }

  getCurrentGenre() {
    return this.currentGenre || JSON.parse(localStorage.getItem('current-genre'));
  }

  setCurrentGenre(genre: any) {
    this.currentGenre = genre;
    localStorage.setItem('current-genre', JSON.stringify(this.currentGenre));
  }

  getCurrentType() {
    return this.currentType || JSON.parse(localStorage.getItem('current-type'));
  }

  setCurrentType(type: any) {
    this.currentType = type;
    localStorage.setItem('current-type', JSON.stringify(this.currentType));
  }

  loadGenre(genre: { id: any; }, type: any) {
    this.setCurrentGenre(genre);
    this.setCurrentType(type);
    this._router.navigate(['movies/genre/', genre.id ]);
  }

  //
  // # END # Borrar estos getters - setters
  //

  get(service: { name: any; data: { id: string; }; verb: string | number; }) {
    let config = this.API_KEY + '&language=' + this.lang;
    let url = '';

    switch (service.name) {
      case 'recomendations':
        // GET /movie/{movie_id}/recommendations
        url = this.END_POINT + this.currentMediaType + '/' + service.data.id + '/recommendations?api_key=' + config;
        break;
      default:
        break;
    }

    return this.http[service.verb](url)
      .toPromise()
      .then((response: any) => response)
      .catch((error: any) => console.log(error));
  }

  async getList(query: string, page?: number): Promise<any> {
    let list: string;
    let searhType =  'search/multi'; // type === 'movies' ? 'search/movie' : 'search/tv';

    // this.lang = this.settingsService.options.language.use;

    this.page = page || 1;

    if (typeof query !== 'undefined' && query !== null && query !== '') {
      list = `${this.END_POINT}${searhType}?query=${query}&api_key=${this.API_KEY}&include_adult=false&page=${this.page}&language=${this.lang}`
    }

    try {
      const response: any = await this.http.get(list).toPromise();
      return response;
    } catch (error) {
      return console.log(error);
    }
  }

  async getFilm(id: string): Promise<any> {
    let film: string;
    if (typeof id !== 'undefined' && id !== null) {
      film = this.END_POINT + this.currentMediaType + '/' + id + '?' + 'api_key=' + this.API_KEY + '&language=' + this.lang;
    }

    try {
      const response: any = await this.http.get(film).toPromise();
      return response;
    } catch (error) {
      return console.log(error);
    }
  }

  async getCredits(id: string): Promise<any> {
    let credits: string;
    if (typeof id !== 'undefined' && id !== null) {
      credits = this.END_POINT + this.currentMediaType + '/' + id + '/credits?' + 'api_key=' + this.API_KEY;
    }

    try {
      const response: any = await this.http.get(credits).toPromise();
      return response;
    } catch (error) {
      return console.log(error);
    }
  }

  async getReviews(id: string): Promise<any> {
    let reviews: string;
    if (typeof id !== 'undefined' && id !== null) {
      reviews = this.END_POINT + this.currentMediaType + '/' + id + '/reviews?' + 'api_key=' + this.API_KEY;
    }

    try {
      const response: any = await this.http.get(reviews).toPromise();
      return response;
    } catch (error) {
      return console.log(error);
    }
  }

  async getTop(collection: string, type: string, page?: number): Promise<any> {
    let currentPage = page || 1;
    // let currentType = this.getCurrentType() || 'movie';
    let top: string;

    if (typeof collection !== 'undefined' && collection !== null) {
      top = this.END_POINT + type + '/' + collection + '?' + 'api_key=' + this.API_KEY + '&page=' + currentPage + '&language=' + this.lang;
    }

    try {
      const response: any = await this.http.get(top).toPromise();
      return response;
    } catch (error) {
      return console.log(error);
    }
  }

  async getSimilar(id: string, page?: number): Promise<any> {
    let similar: string;
    let currentPage = page || 1;

    if (typeof id !== 'undefined' && id !== null) {
      // tslint:disable-next-line:max-line-length
      similar = this.END_POINT + this.currentMediaType + '/' + id + '/similar' + '?' + 'api_key=' + this.API_KEY + '&page=' + currentPage + '&language=' + this.lang;
    }

    try {
      const response: any = await this.http.get(similar).toPromise();
      return response;
    } catch (error) {
      return console.log(error);
    }
  }

  async getGenres() {
    const genres = this.END_POINT + 'genre/movie/list' + '?' + 'api_key=' + this.API_KEY + '&language=' + this.lang;

    try {
      const response: any = await this.http.get(genres).toPromise();
      return this.filterArray(response.genres, 10770);
    } catch (error) {
      return console.log(error);
    }
  }

  filterArray(arr: any, id: number) {
    let oldArr: any = arr;
    let newArr: any = [];

    for (let i = 0; i < oldArr.length; i++) {
        if (oldArr[i].id !== id) {
          newArr.push(oldArr[i]);
        }
    }

    return newArr;
  }

  async getListByGenre(genre: string, type?: any, page?: number): Promise<any> {
    let currentPage = page || 1;
    let currentType = this.getCurrentType() || 'movie';

    const listByGenre = this.END_POINT + 'discover/' + currentType + '?'
                                      + 'with_genres=' + genre
                                      // + 'sort_by=' + 'primary_release_date.desc'
                                      + '&page=' + currentPage
                                      + '&include_adult=' + false
                                      + '&api_key=' + this.API_KEY
                                      + '&language=' + this.lang;

    try {
      const response: any = await this.http.get(listByGenre).toPromise();
      return response;
    } catch (error) {
      return console.log(error);
    }
  }

  async discover(options: { page: number; cast: string; }) {
    let currentPage = options.page || 1;
    let currentType = this.getCurrentType() || 'movie';

    // TODO: concatenar de forma dinámica el this.filmistAPI con el objecto pasado 'options'
    // las propiedades que no son null

    const discover = this.END_POINT + 'discover/' + currentType + '?'
                                      // + '&with_genres=' + genre
                                      + '&with_cast=' + options.cast
                                      + '&page=' + currentPage
                                      + '&include_adult=false'
                                      + '&api_key=' + this.API_KEY
                                      + '&language=' + this.lang;

    try {
      const response: any = await this.http.get(discover).toPromise();
      return response;
    } catch (error) {
      return console.log(error);
    }
  }

  async getActor(id: string) {
    const actor = this.END_POINT + 'person/' + id + '?api_key=' + this.API_KEY + '&language=' + this.lang;

    try {
      const response: any = await this.http.get(actor).toPromise();
      return response;
    } catch (error) {
      return console.log(error);
    }
  }

  async getMoviesByActor(id: string, page?: number) {
    let currentPage = page || 1;
    let currentType = this.getCurrentType() || 'movie';

    const moviesByActor = this.END_POINT + 'discover/' + currentType + '?'
                                      + '&with_cast=' + id
                                      + '&sort_by=' + 'release_date.desc'
                                      + '&page=' + currentPage
                                      + '&include_adult=false'
                                      + '&api_key=' + this.API_KEY
                                      + '&language=' + this.lang;

    try {
      const response: any = await this.http.get(moviesByActor).toPromise();
      return response;
    } catch (error) {
      return console.log(error);
    }
  }

  // Home page
  getAllTop(): Promise<any> {
    return Promise.all([
      this.getTop('now_playing', 'movie'),
      this.getTop('popular', 'movie'),
      this.getTop('upcoming', 'movie'),
      this.getTop('top_rated', 'movie'),
      this.getTop('on_the_air', 'tv'),
      this.getTop('popular', 'tv'),
      this.getTop('top_rated', 'tv'),
      // this.getSimilar(this.currentMovie)
      // this.getGenres()
    ]);
  }

  // Detail page
  getDetailExtend(id: any): Promise<any> {
    return Promise.all([
      this.getFilm(id),
      this.getSimilar(id),
      this.getCredits(id),
      // this.get({name: 'recomendations', data: { id: id }, verb: 'get'})
      /*, this.getReviews(id)*/
    ]);
  }

  // Detail page
  getActorDetail(id: any): Promise<any> {
    return Promise.all([
      this.getActor(id),
      this.getMoviesByActor(id)
    ]);
  }
}
