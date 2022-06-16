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
const alertMsg = document.querySelector(".alertMsg");
const okayBtn = document.querySelector(".okaybtn");

lightDarkmode.addEventListener("click", function () {

    document.body.classList.toggle("light");
    /* let themeName = this.dataset.theme;*/
    let bodyattr = document.body.getAttribute("class").split(" ");
    let currtheme = localStorage.getItem('currtheme')
    currtheme = null
    if (currtheme == null) {
        currthemeObj = [];
    }
    else {
        currthemeObj = JSON.parse(currtheme)
    }
    currthemeObj.push(bodyattr)
    localStorage.setItem("currtheme", JSON.stringify(currthemeObj));
});


function settheme() {
    let currtheme = localStorage.getItem('currtheme')
    if (currtheme == null) {
        currthemeObj = [];
    }
    else {
        currthemeObj = JSON.parse(currtheme)
    }

    if (currthemeObj[0].length === 2) {
        document.body.classList.add("light");
    }
    else {
        console.log("DarkMode");
        document.body.classList.remove("light");
    }
}

settheme()



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



const hideAlert = function () {
    alertMsg.classList.remove('alertactive');
}

okayBtn.addEventListener('click', hideAlert)

window.onload = function () {
    alertMsg.classList.add('alertactive');
    setTimeout(hideAlert, 7000)
}



