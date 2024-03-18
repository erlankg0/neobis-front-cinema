import {premieresMovies, releasesMovies, bestMovies, waitingMovies} from "./network.ts"
import {IMovie, IReleasesMovies} from './network.ts'


// DOM объекты
const moviesList = document.getElementById('movies__list') as HTMLElement;
const releases = document.getElementById('releases') as HTMLElement;
const best = document.getElementById('best') as HTMLElement;
const waiting = document.getElementById('waiting') as HTMLElement;
const premiers = document.getElementById('premiers') as HTMLElement;
const title = document.getElementById('title') as HTMLElement;

// eventListeners

document.addEventListener('DOMContentLoaded', async () => {
    const premiersList = await premieresMovies()
    renderPremiersCard(premiersList.data.items.splice(0, 10))
})

premiers.addEventListener('click', async () => {
    title.innerHTML = '';
    title.textContent = 'Преьмеры Месяца';
    const premiersList = await premieresMovies()
    renderPremiersCard(premiersList.data.items.splice(0, 10))
})
releases.addEventListener('click', async () => {
    const releasesList = await releasesMovies();
    title.innerHTML = '';
    title.textContent = 'Релизы Месяца';

    renderReleasesCard(releasesList.data.releases);
})
best.addEventListener('click', async () => {
    const bestMoviesList = await bestMovies();
    title.textContent = 'Лучшие фильмы';

    renderPremiersCard(bestMoviesList.data.items.splice(0, 10));
})
waiting.addEventListener('click', async ()=>{
    const waitingList = await waitingMovies();
    title.textContent = 'Лучшие фильмы';

    renderPremiersCard(waitingList.data.items.splice(0, 10));
})
const renderPremiersCard = (movies: IMovie[]) => {
    // очищяем элемент от старных объектов
    moviesList.innerHTML = '';

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('card');

        const card__header = document.createElement('div');
        card__header.classList.add('card__header');

        const card__top = document.createElement('div');
        card__top.classList.add('card__top');

        const card__rating = document.createElement('p');
        card__rating.classList.add('card__rating');
        card__rating.textContent = movie.rating ? `${movie.rating.toFixed(1)}` : '';

        const card__follow = document.createElement('div');
        card__follow.classList.add('card__follow')

        const card__img = document.createElement('img');
        card__img.classList.add('card__img')
        card__img.src = movie.posterUrl;
        card__img.alt = movie.nameRu ? movie.nameRu : '';

        const card__year = document.createElement('div');
        card__year.classList.add('card__year');
        const p = document.createElement('p');
        p.textContent = movie.year;
        card__year.appendChild(p);


        const card__footer = document.createElement('div');
        card__footer.classList.add('card__footer');

        const card__title = document.createElement('h3')
        card__title.textContent = movie.nameRu ? movie.nameRu : movie.nameEn;
        card__title.classList.add('card__title')

        card__footer.appendChild(card__title)
        const card__genres = document.createElement('ul');
        card__genres.classList.add('card__genres');

        movie.genres.forEach(genre => {
            const card__genre = document.createElement('li');
            card__genre.classList.add('card__genre');
            card__genre.textContent = genre.genre;
            card__genres.appendChild(card__genre);
        })


        card__top.appendChild(card__rating);
        card__top.appendChild(card__follow);
        card__header.appendChild(card__top);
        card__header.appendChild(card__img);
        card__header.appendChild(card__year);
        card__footer.appendChild(card__genres);
        card.appendChild(card__header);
        card.appendChild(card__footer);

        moviesList.appendChild(card)
    })
}

const renderReleasesCard = (movies: IReleasesMovies[]) => {
    // очищяем элемент от старных объектов
    moviesList.innerHTML = '';

    movies.forEach((movie) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const card__header = document.createElement('div');
        card__header.classList.add('card__header');

        const card__top = document.createElement('div');
        card__top.classList.add('card__top');

        const card__rating = document.createElement('p');
        card__rating.classList.add('card__rating');
        card__rating.textContent = movie.rating ? `${movie.rating.toFixed(1)}` : '';

        const card__follow = document.createElement('div');
        card__follow.classList.add('card__follow')

        const card__img = document.createElement('img');
        card__img.classList.add('card__img')
        card__img.src = movie.posterUrl;
        card__img.alt = movie.nameRu ? movie.nameRu : movie.nameEn;

        const card__year = document.createElement('div');
        card__year.classList.add('card__year');
        const p = document.createElement('p');
        p.textContent = movie.year;
        card__year.appendChild(p);


        const card__footer = document.createElement('div');
        card__footer.classList.add('card__footer');

        const card__title = document.createElement('h3')
        card__title.textContent = movie.nameRu ? movie.nameRu : movie.nameEn;
        card__title.classList.add('card__title')

        card__footer.appendChild(card__title)
        const card__genres = document.createElement('ul');
        card__genres.classList.add('card__genres');

        movie.genres.forEach(genre => {
            const card__genre = document.createElement('li');
            card__genre.classList.add('card__genre');
            card__genre.textContent = genre.genre;
            card__genres.appendChild(card__genre);
        })


        card__top.appendChild(card__rating);
        card__top.appendChild(card__follow);
        card__header.appendChild(card__top);
        card__header.appendChild(card__img);
        card__header.appendChild(card__year);
        card__footer.appendChild(card__genres);
        card.appendChild(card__header);
        card.appendChild(card__footer);

        moviesList.appendChild(card)
    })
}