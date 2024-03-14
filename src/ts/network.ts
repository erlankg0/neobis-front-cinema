import axios from "axios"


interface ICountry {
    country: string
}

interface IGenre {
    genre: string
}

interface IMovie {
    kinopoiskId: number,
    imdbId: string,
    countries: ICountry[],
    genres: IGenre[],
    nameRu: string | null,
    nameEn: string | null,
    nameOriginal: string | null,
}


const instance = axios.create({
    baseURL: "https://kinopoiskapiunofficial.tech/api",
    method: 'GET',
    headers: {
        'X-API-KEY': 'c3be2e47-3e4f-4945-8b0b-cabd9af738fe',
        'Content-Type': 'application/json',
    },

});


const getFilm = (id: number) => {
    return instance.get('/v2.2/films/' + id)
}

const movies = (): Promise<IMovie> => {
    return instance.get('')
}


export {getFilm, movies};