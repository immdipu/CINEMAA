
const posterBig = document.querySelector('.poster_big')
const movieDetailnavContainer = document.querySelector('.movieDetailnavContainer')
const gradient = document.querySelector('.gradient')
const posterBigImg = document.querySelector('.poster_big_img')
const posterBBig = document.querySelector('.posterbig');

const arrowLeft = document.querySelector('.arrow_left');
const hamburger = document.querySelector('.hamburger');
const NowPlayingMoviesDiv = document.querySelector('.Now_playing_movies_div');
const leftArrow = document.querySelector('.leftarrow');
const rightarrow = document.querySelector('.rightarrow');
const lightDarkmode = document.querySelector('.light_darkmode');
const movieDetails = document.querySelector('.movie_details');
const sectionStory = document.querySelector('.section_story');
const movieDetailsAboutCategoryUl = document.querySelector('.movie_details_about_category_ul');


window.addEventListener('scroll', function () {
    let intiCon = posterBBig.getBoundingClientRect();
    if (window.scrollY > intiCon.height - 150) {
        movieDetailnavContainer.classList.add('bgadd');
    }
    else {
        movieDetailnavContainer.classList.remove('bgadd');
    }
})


lightDarkmode.addEventListener('click', function () {
    document.body.classList.toggle('light');
})

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

//<a class="posterlink" href="./movieDetail.html"></a>//
const NowPlayingfun = (movie) => {
    return `<div class="Now_playing_movies" >
    <a class="posterlink" href="#sideNavCon"> <img class="poster" data-id="${movie.id}" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}"></a>
         <p class="movie_title">${movie.title}</p>
         <div class="date_rating">
             <p class="date">${dateFormatter(movie.release_date)}</p><span class="dot dot2"></span>
             <p class="rating">${movie.vote_average}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category">Movie</div>
             </div>
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
    NowPlayingMovies.forEach((ele, i) => (ele.style.transform = `TranslateX(${i * 122}%)`));

})



// MOVIES SLIDER

let currSlide = 0;
const maxSlide = 20;

const gotoSlide = function (slides) {
    const NowPlayingMovies = document.querySelectorAll('.Now_playing_movies');
    NowPlayingMovies.forEach((ele, i) => (ele.style.transform = `TranslateX(${122 * (i - slides)}%)`));

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


/* MOVIE CLCIKED*/

const html2 = function (moviee) {

    let cate = ""
    moviee.genres.forEach(item => {
        cate += `<li class="movie_details_category_ul_li">${item.name}</li>`
    })
    console.log(cate);
    return `<div class="movie_details">
    <img class="movie_details_poster" src="https://image.tmdb.org/t/p/w500/${moviee.poster_path}" alt="title">
    <div class="movie_details_about">
        <h2 class="movie_details_title">${moviee.title}</h2>
        <div class="movie_details_about_category">
            <ul class="movie_details_about_category_ul">
            ${cate}
            </ul>
        </div>
        <div class="date_rating">
            <p class="time">${moviee.runtime}</p><span class="dot dot2"></span>
            <p class="date">${moviee.release_date}</p><span class="dot dot2"></span>
            <p class="rating">${moviee.vote_average}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                        height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg></span></p>
        </div>
        <a class="playLink" href="https://www.2embed.ru/embed/imdb/movie?id=${moviee.imdb_id}"><button class="play_btn"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19"
                fill="currentColor" class="path_btn bi-play-fill" viewBox="0 0 16 16">
                <path class="path_btnn"
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z">
                </path>
            </svg>Play</button></a> 
    </div>

</div> `
}

const Bigposter = function (movieee) {
    return `<img class="poster_big_img" src="https://image.tmdb.org/t/p/original/${movieee.backdrop_path}" alt="">`
}



const CurrMovie = async (id) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${myApi}`)
    const data = await res.json();
    return data;
}


let cath = ""


const movieId = function (e) {
    let ele = e.target;
    if (ele.classList.contains('poster')) {
        let id = ele.dataset.id;
        CurrMovie(id).then((dat) => {
            let htm = ""
            htm = html2(dat)
            movieDetails.innerHTML = htm;
            let BigPoster = Bigposter(dat);
            posterBBig.innerHTML = BigPoster;
            sectionStory.textContent = dat.overview;
        })

    }
}

NowPlayingMoviesDiv.addEventListener('click', movieId)


/*let myurl = "./movieDetail.html"
window.location.replace(myurl)*/