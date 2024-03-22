import {getFilm} from "./network.ts";
import {IMoviesList} from "./network.ts";


class Store {
    private _movies: IMoviesList[] = [];

    constructor() {
        this.loadMovies()
    }

    get movies(): IMoviesList[] {
        return this._movies;
    }

    private loadMovies = (): void => {
        // Загрузка данных из store
        const moviesData = localStorage.getItem('movies');
        if (moviesData) {
            this._movies = JSON.parse(moviesData);
        }
    }

    private saveMovies = (): void => {
        // сохранения в localStorage
        localStorage.setItem('movies', JSON.stringify(this._movies))
        this.loadMovies();
    }

    addFollow = (id: string) => {
        console.log(id);
        return getFilm(id).then(r => r)
    }

    isFollow = async (id: string) => {
        if (this._movies.length > 0) {
            const result = await this.addFollow(id);
            this._movies.push(result);
            this._movies = this._movies.map((movie) => {
                if (movie.id === id) {
                    movie.isFollow = !movie.isFollow;
                }
                return movie;
            });


        } else {
            const result = await this.addFollow(id);
            this._movies.push(result)
        }
        console.log('end');
        this.saveMovies();
    }

}

export {Store}
