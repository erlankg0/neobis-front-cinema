import axios from "axios"



interface Country {
    country: string
}
interface Genre {
    genre: string
}
interface Movie {
    kinopoiskId: number,
    imdbId: string,
    countries: Country[],
    genres: Genre[],
    nameRu:  string | null,
    nameEn:  string | null,
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


export { getFilm }