export class Movie {
    constructor(public id: number,
                public title: string,
                public name: string,
                public poster_path: string,
                public release_date: string,
                public first_air_date: string,
                public vote_average: number,
                public vote_count: number) {
        this.id = id;
        this.title = title;
        this.name = name;
        this.poster_path = poster_path;
        this.release_date = release_date;
        this.first_air_date = first_air_date;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
    }
}
