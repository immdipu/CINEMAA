const arrowLeft = document.querySelector('.arrow_left');
const hamburger = document.querySelector('.hamburger');
const NowPlayingMoviesDiv = document.querySelector('.Now_playing_movies_div');
const leftArrow = document.querySelector('.leftarrow');
const rightarrow = document.querySelector('.rightarrow');



arrowLeft.addEventListener('click', function () {
    document.body.classList.remove('minimize_siderbar');
})


hamburger.addEventListener('click', function () {
    document.body.classList.add('minimize_siderbar');
})

const myApi = "6b2dec73b6697866a50cdaef60ccffcb"

const NowPlaying = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${myApi}&language=en-US&page=1`)
    const data = await res.json();
    const NowPlayingmovies = data.results;
    return NowPlayingmovies;
}





const NowPlayingfun = (movie) => {
    return `<div class="Now_playing_movies">
         <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
         <p class="movie_title">${movie.title}</p>
         <div class="date_rating">
             <p class="date">${dateFormatter(movie.release_date)}</p><span class="dot dot2"></span>
             <p class="rating">${movie.vote_average}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category">Movie</div>
         </div>`
}

const dateFormatter = function (date) {
    let currdate = date;
    const newDate = currdate.slice(0, 4)
    return newDate;
}



NowPlaying().then(movies => {
    movies.forEach(moviee => {
        const htmll = NowPlayingfun(moviee);
        NowPlayingMoviesDiv.insertAdjacentHTML("beforeend", htmll)

    })

    const NowPlayingMovies = document.querySelectorAll('.Now_playing_movies');
    NowPlayingMovies.forEach((ele, i) => (ele.style.transform = `TranslateX(${i * 130}%)`));

})

let currSlide = 0;
const maxSlide = 20;

const gotoSlide = function (slides) {
    const NowPlayingMovies = document.querySelectorAll('.Now_playing_movies');
    NowPlayingMovies.forEach((ele, i) => (ele.style.transform = `TranslateX(${130 * (i - slides)}%)`));

}

const nextSlide = function () {
    if (currSlide === maxSlide - 6) {
        currSlide = 0;
    }
    else {
        currSlide++
    }
    gotoSlide(currSlide);
}


const prevSlide = function () {
    if (currSlide === 0) {
        currSlide = maxSlide - 6;
    }
    else {
        currSlide--;
    }
    gotoSlide(currSlide)
};



leftArrow.addEventListener('click', prevSlide);
rightarrow.addEventListener('click', nextSlide);






