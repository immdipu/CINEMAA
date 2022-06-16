const arrowLeft = document.querySelector(".arrow_left");
const hamburger = document.querySelector(".hamburger");
const NowPlayingMoviesDiv = document.querySelector(".Now_playing_movies_div");
const leftArrow = document.querySelector(".leftarrow");
const rightarrow = document.querySelector(".rightarrow");
const lightDarkmode = document.querySelector(".light_darkmode");
const movieDetails = document.querySelector(".movie_details");
const sectionStory = document.querySelector(".section_story");
const posterBig = document.querySelector(".poster_big");
const hamburgerPhone = document.querySelector(".hamburgerphone");
const sidenavContainer = document.querySelector(".sidenav_container");
const overlaySideNavabar = document.querySelector(".overlay_side_navabar");
const sidenav = document.querySelector(".sidenav");

lightDarkmode.addEventListener("click", function () {
    document.body.classList.toggle("light");
});

arrowLeft.addEventListener("click", function () {
    document.body.classList.remove("minimize_siderbar");
});

hamburger.addEventListener("click", function () {
    document.body.classList.add("minimize_siderbar");
});

hamburgerPhone.addEventListener("click", function () {
    sidenavContainer.classList.add("sidenav_container_active");
    overlaySideNavabar.classList.add("sidenav_container_active");
});
overlaySideNavabar.addEventListener("click", function () {
    sidenavContainer.classList.remove("sidenav_container_active");
    overlaySideNavabar.classList.remove("sidenav_container_active");
    document.body.classList.remove("minimize_siderbar");
});

const myApi = "6b2dec73b6697866a50cdaef60ccffcb";

const NowPlaying = async () => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${myApi}&language=en-US&page=1`
    );
    const data = await res.json();
    console.log(data);
    const NowPlayingmovies = data.results;
    return NowPlayingmovies;
};

//<a class="posterlink" href="./movieDetail.html"></a>//
const NowPlayingfun = (movie) => {
    let url = "./movieDetail.html?id=" + encodeURIComponent(movie.id);
    return `<div class="Now_playing_movies" >
    <a class="posterlink" href=${url}> <img class="poster" data-id="${movie.id
        }" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title
        }"></a>
         <p class="movie_title">${movie.title}</p>
         <div class="date_rating">
             <p class="date">${dateFormatter(
            movie.release_date
        )}</p><span class="dot dot2"></span>
             <p class="rating">${movie.vote_average
        }<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category">Movie</div>
             </div>
         </div>`;
};

const dateFormatter = function (date) {
    let currdate = date;
    const newDate = currdate.slice(0, 4);
    return newDate;
};

NowPlaying().then((movies) => {
    movies.forEach((moviee) => {
        const htmll = NowPlayingfun(moviee);
        NowPlayingMoviesDiv.insertAdjacentHTML("beforeend", htmll);
    });

    const NowPlayingMovies = document.querySelectorAll(".Now_playing_movies");
    NowPlayingMovies.forEach(
        (ele, i) => (ele.style.transform = `TranslateX(${i * 122}%)`)
    );
});

// MOVIES SLIDER

let currSlide = 0;
const maxSlide = 20;

const gotoSlide = function (slides) {
    const NowPlayingMovies = document.querySelectorAll(".Now_playing_movies");
    NowPlayingMovies.forEach(
        (ele, i) => (ele.style.transform = `TranslateX(${122 * (i - slides)}%)`)
    );
};

const nextSlide = function () {
    if (currSlide === maxSlide - 6) {
        rightarrow.classList.add("disablemouse");
        leftArrow.classList.remove("disablemouse");
        //currSlide = 0;
    } else {
        rightarrow.classList.remove("disablemouse");
        leftArrow.classList.remove("disablemouse");
        currSlide++;
    }
    gotoSlide(currSlide);
};

const prevSlide = function () {
    if (currSlide === 0) {
        rightarrow.classList.remove("disablemouse");
        leftArrow.classList.add("disablemouse");
        /* currSlide = maxSlide - 6;*/
    } else {
        leftArrow.classList.remove("disablemouse");
        rightarrow.classList.remove("disablemouse");
        currSlide--;
    }
    gotoSlide(currSlide);
};

leftArrow.addEventListener("click", prevSlide);
rightarrow.addEventListener("click", nextSlide);

/* MOVIE CLCIKED*/

const html2 = function (movie) {
    return ` <div class="movie_details">
    <img class="movie_details_poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">
    <div class="movie_details_about">
        <h2 class="movie_details_title">${movie.title}</h2>
        <div class="movie_details_about_category">
            <ul class="movie_details_about_category_ul">
                <li class="movie_details_category_ul_li">Fantasy</li>
                <li class="movie_details_category_ul_li">Adventure</li>
                <li class="movie_details_category_ul_li">Action</li>
            </ul>
        </div>
        <div class="date_rating">
            <p class="time">${movie.runtime}</p><span class="dot dot2"></span>
            <p class="date">${movie.release_date}</p><span class="dot dot2"></span>
            <p class="rating">${movie.vote_average}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                        height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg></span></p>
        </div>
        <button class="play_btn"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19"
                fill="currentColor" class="path_btn bi-play-fill" viewBox="0 0 16 16">
                <path class="path_btnn"
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z">
                </path>
            </svg>Play</button>
    </div>

</div> `;
};
