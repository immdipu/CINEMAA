const posterBig = document.querySelector(".poster_big");
const movieDetailnavContainer = document.querySelector(
  ".movieDetailnavContainer"
);
const gradient = document.querySelector(".gradient");
const posterBigImg = document.querySelector(".poster_big_img");
const posterBBig = document.querySelector(".posterbig");
const arrowLeft = document.querySelector(".arrow_left");
const hamburger = document.querySelector(".hamburger");
const NowPlayingMoviesDiv = document.querySelector(".Now_playing_movies_div");
const leftArrow = document.querySelectorAll(".leftarrow");
const rightarrow = document.querySelectorAll(".rightarrow");
const lightDarkmode = document.querySelector(".light_darkmode");
const movieDetails = document.querySelector(".movie_details");
const sectionStory = document.querySelector(".section_story");
const movieDetailsAboutCategoryUl = document.querySelector(
  ".movie_details_about_category_ul"
);
const hamburgerPhone = document.querySelector(".hamburgerphone");
const sidenavChildContainer = document.querySelector(
  ".sidenav_child_container"
);
const overlaySideNavabar = document.querySelector(".overlay_side_navabar");
const sidenav = document.querySelector(".sidenav");
const searchbox = document.querySelector(".search");
const recommendationMoviesDiv = document.querySelector(
  ".recommendation_movies_div"
);
const SimilarMoviesDiv = document.querySelector(".Similar_movies_div");
const Casdiv = document.querySelector(".Casdiv");
const preLoader = document.querySelector(".preloader");
const Trailer_section = document.querySelector(".Trailer_section");
const reccomendation = document.querySelector(".reccomendation");

window.addEventListener("load", function () {
  preLoader.style.display = "none";
});

const Castfun = (castee) => {
  let url = "./personDetail.html?id=" + encodeURIComponent(castee.id);
  return `<div class="Now_playing_movies castdiv" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${castee.id}" src="https://image.tmdb.org/t/p/w500/${castee.profile_path}"
        onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
         loading="lazy" alt="${castee.original_name}"></a>
        <div class="name_character_container">
         <p class="movie_title">${castee.original_name}</p>
         <div class="date_rating casteecharacter" >
         ${castee.character}
             </div>
             </div>
         </div>`;
};

const Trailerfunc = function (id) {
  return `<iframe class="youtubePlayer" src="https://autoembed.to/trailer/movie/${id}" width="100%" height="100%" loading="lazy" frameborder="0" allowfullscreen></iframe>`;
};

let url = document.location.href;
let fetcid = url.slice(url.indexOf("=") + 1);
const movieLoad = function () {
  let trailerHtml = Trailerfunc(fetcid);
  Trailer_section.innerHTML = trailerHtml;
  CurrMovie(fetcid).then((dat) => {
    let htm = "";
    htm = html2(dat);
    movieDetails.innerHTML = htm;
    let BigPoster = Bigposter(dat);
    posterBBig.innerHTML = BigPoster;
    sectionStory.textContent = dat.overview;
    let castarr = dat.credits.cast;
    if (castarr.length > 10) {
      let NewCastarr = castarr.slice(0, 10);
      NewCastarr.forEach((item) => {
        if (item.profile_path !== null) {
          const castehtml = Castfun(item);
          Casdiv.insertAdjacentHTML("beforeend", castehtml);
        }
      });
    } else {
      castarr.forEach((item) => {
        if (item.profile_path !== null) {
          const castehtml = Castfun(item);
          Casdiv.insertAdjacentHTML("beforeend", castehtml);
        }
      });
    }

    const castdiv = document.querySelectorAll(".castdiv");
    castdiv.forEach(
      (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
    );
  });
};

searchbox.addEventListener("click", function () {
  location.replace("./search.html");
});

hamburgerPhone.addEventListener("click", function () {
  sidenavChildContainer.classList.add("sidenav_container_active");
  overlaySideNavabar.classList.add("sidenav_container_active");
  hamburgerPhone.classList.add("hamburgerphonedeactive");
});
overlaySideNavabar.addEventListener("click", function () {
  sidenavChildContainer.classList.remove("sidenav_container_active");
  overlaySideNavabar.classList.remove("sidenav_container_active");
  document.body.classList.remove("minimize_siderbar");
  hamburgerPhone.classList.remove("hamburgerphonedeactive");
});

window.addEventListener("scroll", function () {
  let intiCon = posterBBig.getBoundingClientRect();
  if (window.scrollY > intiCon.height - 150) {
    movieDetailnavContainer.classList.add("bgadd");
  } else {
    movieDetailnavContainer.classList.remove("bgadd");
  }
});

lightDarkmode.addEventListener("click", function () {
  document.body.classList.toggle("light");

  if (document.body.classList.contains(`light`)) {
    localStorage.setItem(`theme`, `light`);
  } else {
    localStorage.setItem(`theme`, `dark`);
  }
});

function settheme() {
  let currtheme = localStorage.getItem("theme");
  if (currtheme == "light") {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }
}

settheme();

arrowLeft.addEventListener("click", function () {
  document.body.classList.remove("minimize_siderbar");
});

hamburger.addEventListener("click", function () {
  document.body.classList.add("minimize_siderbar");
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
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${
    movie.id
  }" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
        onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
         loading="lazy"  alt="${movie.title}"></a>
         <p class="movie_title">${movie.title}</p>
         <div class="date_rating">
             <p class="date">${dateFormatter(
               movie.release_date
             )}</p><span class="dot dot2"></span>
             <p class="rating">${
               movie.vote_average
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

const averagVoteformat = function (receivedVote) {
  let currVote = receivedVote.toString();
  const newVote = currVote.slice(0, 3);
  return newVote;
};

NowPlaying().then((movies) => {
  movies.forEach((moviee) => {
    const htmll = NowPlayingfun(moviee);
    NowPlayingMoviesDiv.insertAdjacentHTML("beforeend", htmll);
  });

  const NowPlayingMovies = document.querySelectorAll(".Now_playing_movies");
  NowPlayingMovies.forEach(
    (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
  );
});

const Sidescroll = function (element, direction, speed, distance, step) {
  scrollAmount = 0;
  let slideTimer = setInterval(function () {
    if (direction == "left") {
      element.scrollLeft -= step;
    } else {
      element.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
};

leftArrow.forEach((item) =>
  item.addEventListener("click", function () {
    if (item.parentElement.id == "nowplayin") {
      Sidescroll(NowPlayingMoviesDiv, "left", 2, 500, 15);
    }
    if (item.parentElement.id == "recommenn") {
      Sidescroll(recommendationMoviesDiv, "left", 2, 500, 15);
    }
    if (item.parentElement.id == "Similarovie") {
      Sidescroll(SimilarMoviesDiv, "left", 2, 500, 15);
    }
    if (item.parentElement.id == "cast_con") {
      Sidescroll(Casdiv, "left", 2, 500, 15);
    }
  })
);

rightarrow.forEach((item) =>
  item.addEventListener("click", function () {
    if (item.parentElement.id == "nowplayin") {
      Sidescroll(NowPlayingMoviesDiv, "right", 2, 500, 15);
    }
    if (item.parentElement.id == "recommenn") {
      Sidescroll(recommendationMoviesDiv, "right", 2, 500, 15);
    }
    if (item.parentElement.id == "Similarovie") {
      Sidescroll(SimilarMoviesDiv, "right", 2, 500, 15);
    }
    if (item.parentElement.id == "cast_con") {
      Sidescroll(Casdiv, "right", 2, 500, 15);
    }
  })
);

/* MOVIE CLCIKED*/

const html2 = function (moviee) {
  document.title = `${
    moviee.title +
    " " +
    "(" +
    dateFormatter(moviee.release_date) +
    ")" +
    " " +
    "|" +
    " " +
    "Cinemaa"
  }`;

  let cate = "";
  moviee.genres.forEach((item) => {
    cate += `<li class="movie_details_category_ul_li">${item.name}</li>`;
  });
  return `<div class="movie_details">
    <img class="movie_details_poster" src="https://image.tmdb.org/t/p/w500/${
      moviee.poster_path
    }"
    onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
     alt="title">
    <div class="movie_details_about">
        <h2 class="movie_details_title">${moviee.title}</h2>
        <div class="movie_details_about_category">
            <ul class="movie_details_about_category_ul">
            ${cate}
            </ul>
        </div>
        <div class="date_rating">
            <p class="time">${
              moviee.runtime
            } minutes</p><span class="dot dot2"></span>
            <p class="date">${
              moviee.release_date
            }</p><span class="dot dot2"></span>
            <p class="rating">${averagVoteformat(
              moviee.vote_average
            )}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                        height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg></span></p>
        </div>
        <div class="playButtonContainer"> 
       
        <a class="playLink" href="https://www.2embed.to/embed/imdb/movie?id=${
          moviee.imdb_id
        }"><button class="play_btn"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19"
                fill="currentColor" class="path_btn bi-play-fill" viewBox="0 0 16 16">
                <path class="path_btnn"
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z">
                </path>
            </svg>Play</button></a> 
            <span > <a class="GoogleButton" href="https://www.google.com/search?q=${
              moviee.title +
              " " +
              "(" +
              dateFormatter(moviee.release_date) +
              ")"
            }" target="_blank">Google It!</a> </span> 
            </div>
            
    </div>

</div> `;
};

const Bigposter = function (movieee) {
  return `<img class="poster_big_img" src="https://image.tmdb.org/t/p/original/${movieee.backdrop_path}" alt="">`;
};

const CurrMovie = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=680c99274ddab12ffac27271d9445d45&append_to_response=credits`
  );

  const data = await res.json();
  return data;
};

movieLoad();

const recomMOvie = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${myApi}`
  );
  const data = await res.json();
  const recommendationMovies = data.results;

  return recommendationMovies;
};

const SimilarMOvie = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${myApi}`
  );
  const data = await res.json();
  const SimilarMovies = data.results;
  return SimilarMovies;
};

const recommMovieFun = (mov) => {
  let url = "./movieDetail.html?id=" + encodeURIComponent(mov.id);
  return `<div class="Now_playing_movies recommenMovies" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${
    mov.id
  }" src="https://image.tmdb.org/t/p/w500/${mov.poster_path}" 
        onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
        loading="lazy" alt="${mov.title}"></a>
         <p class="movie_title">${mov.title}</p>
         <div class="date_rating">
             <p class="date">${dateFormatter(
               mov.release_date
             )}</p><span class="dot dot2"></span>
             <p class="rating">${averagVoteformat(
               mov.vote_average
             )}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category">Movie</div>
             </div>
         </div>`;
};

const simimarMoviefun = (movie) => {
  let url = "./movieDetail.html?id=" + encodeURIComponent(movie.id);
  return `<div class="Now_playing_movies similarMovies" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${
    movie.id
  }" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" 
        onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
        loading="lazy" alt="${movie.title}"></a>
         <p class="movie_title">${movie.title}</p>
         <div class="date_rating">
             <p class="date">${dateFormatter(
               movie.release_date
             )}</p><span class="dot dot2"></span>
             <p class="rating">${averagVoteformat(
               movie.vote_average
             )}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category">Movie</div>
             </div>
         </div>`;
};

recomMOvie(fetcid).then((movies) => {
  if (movies.length == 0) {
    reccomendation.style.display = "none";
  } else {
    movies.forEach((moviee) => {
      const html3 = recommMovieFun(moviee);
      recommendationMoviesDiv.insertAdjacentHTML("beforeend", html3);
    });

    const recommenMovies = document.querySelectorAll(".recommenMovies");
    recommenMovies.forEach(
      (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
    );
  }
});

SimilarMOvie(fetcid).then((movies) => {
  movies.forEach((moviee) => {
    const htmll = simimarMoviefun(moviee);
    SimilarMoviesDiv.insertAdjacentHTML("beforeend", htmll);
  });

  const similarMovies = document.querySelectorAll(".similarMovies");
  similarMovies.forEach(
    (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
  );
});

const movieId = function (e) {
  let ele = e.target;
  if (ele.classList.contains("poster")) {
    let id = ele.dataset.id;
    CurrMovie(id).then((dat) => {
      let htm = "";
      htm = html2(dat);
      movieDetails.innerHTML = htm;
      let BigPoster = Bigposter(dat);
      posterBBig.innerHTML = BigPoster;
      sectionStory.textContent = dat.overview;
    });
  }
};

NowPlayingMoviesDiv.addEventListener("click", movieId);
