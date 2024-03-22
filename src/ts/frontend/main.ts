import {
    bestMovies,
    IMovie,
    IReleasesMovies,
    IFollowingMovies,
    premieresMovies,
    releasesMovies,
    searchMovies,
    waitingMovies
} from "./network.ts";
import {Store} from "./store.ts";

// DOM объекты
const moviesList = document.getElementById('movies__list') as HTMLElement;
const releases = document.getElementById('releases') as HTMLElement;
const best = document.getElementById('best') as HTMLElement;
const waiting = document.getElementById('waiting') as HTMLElement;
const premiers = document.getElementById('premiers') as HTMLElement;
const title = document.getElementById('title') as HTMLElement;
const search = document.getElementById('search') as HTMLInputElement;
const searchLabel = document.querySelector('.header__label') as HTMLElement;
const following = document.getElementById('following') as HTMLElement;

// менеджер для localStorage

const store = new Store();
// eventListeners
document.addEventListener('DOMContentLoaded', async () => {
    const premiersList = await premieresMovies();
    renderMovies(premiersList.data.items.splice(0, 10), 'Преьмеры Месяца');
});

premiers.addEventListener('click', async () => {
    const premiersList = await premieresMovies();
    renderMovies(premiersList.data.items.splice(0, 10), 'Преьмеры Месяца');
});

releases.addEventListener('click', async () => {
    const releasesList = await releasesMovies();
    renderMovies(releasesList.data.releases, 'Релизы Месяца');
});

best.addEventListener('click', async () => {
    const bestMoviesList = await bestMovies();
    renderMovies(bestMoviesList.data.items.splice(0, 10), 'Лучшие фильмы');
});

waiting.addEventListener('click', async () => {
    const waitingList = await waitingMovies();
    renderMovies(waitingList.data.items.splice(0, 10), 'Самые ожидаемые фильмы');
});

search.addEventListener('keypress', async (event) => {
    if (event.key == 'Enter') {

        const searchList = await searchMovies(1, search.value)
        search.value = ''
        renderMovies(searchList.data.films.splice(0, 10), 'Поиск Фильмов');
    }

})
searchLabel.addEventListener('click', async () => {
    const searchList = await searchMovies(1, search.value)
    search.value = ''
    renderMovies(searchList.data.films.splice(0, 10), 'Поиск Фильмов');
})

following.addEventListener('click', () => {
    const followingList = store.movies;
    renderMovies(followingList, 'Избранные');
})

const renderMovies = (movies: IMovie[] | IReleasesMovies[] | IFollowingMovies[], titleText: string) => {
    // очищяем элемент от старных объектов
    moviesList.innerHTML = '';
    title.innerHTML = '';
    title.textContent = titleText;

    movies.forEach((movie) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const card__header = document.createElement('div');
        card__header.classList.add('card__header');

        const card__top = document.createElement('div');
        card__top.classList.add('card__top');

        if (title.textContent != 'Поиск Фильмов') {
            if (movie.rating) {
                const card__rating = document.createElement('p');
                card__rating.classList.add('card__rating');
                card__rating.textContent = movie.rating ? `${movie?.rating?.toFixed(1)}` : '';
                card__top.appendChild(card__rating);
            }
        }


        const card__follow = document.createElement('div');
        card__follow.classList.add('card__follow');
        if ('kinopoiskId' in movie) {
            card__follow.setAttribute('id', `${movie.kinopoiskId}`)
        } else if ('filmId' in movie) {
            card__follow.setAttribute('id', `${movie.filmId}`)
        } else {
            card__follow.setAttribute('id', `${movie.id}`)
        }

        card__follow.addEventListener('click', (event) => {
            const currentElement = event.target as HTMLElement;
            const id = currentElement.getAttribute('id');
            if (id) {
                store.isFollow(id)
            }else{
                console.log('no')
            }
        })

        const card__img = document.createElement('img');
        card__img.classList.add('card__img');
        card__img.src = movie.posterUrl;
        card__img.alt = movie.nameRu ? `${movie.nameRu}` : `${movie.nameEn}`;

        const card__year = document.createElement('div');
        card__year.classList.add('card__year');
        const p = document.createElement('p');
        p.textContent = movie.year;
        card__year.appendChild(p);

        const card__footer = document.createElement('div');
        card__footer.classList.add('card__footer');

        const card__title = document.createElement('h3');
        card__title.textContent = movie.nameRu ? movie.nameRu : movie.nameEn;
        card__title.classList.add('card__title');

        card__footer.appendChild(card__title);
        const card__genres = document.createElement('ul');
        card__genres.classList.add('card__genres');

        movie.genres.forEach(genre => {
            const card__genre = document.createElement('li');
            card__genre.classList.add('card__genre');
            card__genre.textContent = genre.genre;
            card__genres.appendChild(card__genre);
        });

        card__top.appendChild(card__follow);
        card__header.appendChild(card__top);
        card__header.appendChild(card__img);
        card__header.appendChild(card__year);
        card__footer.appendChild(card__genres);
        card.appendChild(card__header);
        card.appendChild(card__footer);

        moviesList.appendChild(card);
    });
};
