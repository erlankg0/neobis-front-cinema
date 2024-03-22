import axios from "axios"

const MONTH: string[] = [
    'JANUARY', 'FEBRUARY',
    'MARCH', 'APRIL',
    'MAY', 'JUNE',
    'JULY', 'AUGUST',
    'SEPTEMBER', 'OCTOBER',
    'NOVEMBER', 'DECEMBER'
]

interface ICountry {
    country: string
}

interface IGenre {
    genre: string
}

interface IMovie {
    kinopoiskId: number,
    rating?: number,
    ratingKinopoisk: number,
    imdbId: string,
    posterUrl: string,
    year: string;
    countries: ICountry[],
    genres: IGenre[],
    nameRu: string | null,
    nameEn: string | null,
    nameOriginal?: string,
}

interface IReleasesMovies {
    filmId: number,
    nameRu: string,
    nameEn: string,
    year: string;
    posterUrl: string
    posterUrlPreview: string,
    countries: ICountry[],
    genres: IGenre[],
    rating: number,

}

interface IResponseMovies {
    data: {
        items: IMovie[],
        releases: IReleasesMovies[],
        films: IReleasesMovies[],
    },
    status: number,
    statusText: string,
}


interface IMoviesList {
    id: string,
    nameRu: string,
    nameEn: string,
    year: string;
    posterUrl: string
    posterUrlPreview: string,
    countries: ICountry[],
    genres: IGenre[],
    rating: number,
    isFollow: boolean

}
const instance = axios.create({
    baseURL: "https://kinopoiskapiunofficial.tech/api",
    method: 'GET',
    timeout: 2000,
    headers: {
        'X-API-KEY': 'c3be2e47-3e4f-4945-8b0b-cabd9af738fe',
        'Content-Type': 'application/json',
    },

});

const getFilm = async (id: string):Promise<IMoviesList> => {
    console.log(id, 'getting');
    try {
        const response = await instance.get('/v2.2/films/' + id);
        return response.data;
    } catch (error) {
        throw error; // Propagate the error
    }
}



const premieresMovies = (): Promise<IResponseMovies> => {
    const currentYear = new Date().getFullYear();
    const currentMonth = MONTH[new Date().getMonth()]
    return instance.get(`/v2.2/films/premieres?year=${currentYear}&month=${currentMonth}`)
}

const releasesMovies = (page: number = 1): Promise<IResponseMovies> => {
    const currentYear = new Date().getFullYear();
    const currentMonth = MONTH[new Date().getMonth()]
    return instance.get(`/v2.1/films/releases?year=${currentYear}&month=${currentMonth}&page=${page}`)
}

const bestMovies = (page: number = 1): Promise<IResponseMovies> => {
    const type = 'TOP_250_MOVIES';
    return instance.get(`/v2.2/films/collections?type=${type}&page=${page}`)
}

const waitingMovies = (page: number = 1): Promise<IResponseMovies> => {
    const type = 'TOP_POPULAR_ALL';
    return instance.get(`/v2.2/films/collections?type=${type}&page=${page}`)
}

const searchMovies = (page: number = 1, keyword: string): Promise<IResponseMovies> => {
    return instance.get(`/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`)
}

export {getFilm, premieresMovies, releasesMovies, bestMovies, waitingMovies, searchMovies};
export type {IMovie, IReleasesMovies, IGenre, ICountry, IMoviesList};
