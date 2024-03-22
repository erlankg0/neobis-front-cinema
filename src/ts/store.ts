import { getFilm } from "./network.ts";
import { IFollowingMovies } from "./network.ts";



class Store {
    private _movies: IFollowingMovies[] = [];
    private _premiers: IFollowingMovies[] = [];
    private _waiting: IFollowingMovies[] = [];
    private _best: IFollowingMovies[] = [];

    constructor() {
        this.loadMovies()
    }

    get movies(): IFollowingMovies[] {
        return this._movies;
    }

    get premiers(): IFollowingMovies[]{
        return this._premiers;
    }

    get best(): IFollowingMovies[]{
        return this._best;
    }

    get waiting():IFollowingMovies[]{
        return this._waiting;
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

export { Store }
