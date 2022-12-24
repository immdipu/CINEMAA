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
const menuulLI = document.querySelectorAll(".menu_ul li");
const Trailer_section = document.querySelector(".Trailer_section");

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

menuulLI.forEach((item) => {
  item.addEventListener("click", function () {
    menuulLI.forEach((i) => i.classList.remove("hovered"));
    item.classList.add("hovered");
  });
});
menuulLI[2].classList.add("hovered");

arrowLeft.addEventListener("click", function () {
  document.body.classList.remove("minimize_siderbar");
});

hamburger.addEventListener("click", function () {
  document.body.classList.add("minimize_siderbar");
});

const myApi = "6b2dec73b6697866a50cdaef60ccffcb";

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

const dateFormatter = function (date) {
  let currdate = date;
  let newDate = currdate.slice(0, 4);
  return newDate;
};

const averagVoteformat = function (receivedVote) {
  let currVote = receivedVote.toString();
  const newVote = currVote.slice(0, 3);
  return newVote;
};

const Castfun = (castee) => {
  let url = "./personDetail.html?id=" + encodeURIComponent(castee.id);
  return `<div class="Now_playing_movies castdiv" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${castee.id}" src="https://image.tmdb.org/t/p/w500/${castee.profile_path}" loading="lazy" 
        onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
        alt="${castee.original_name}"></a>
        <div class="name_character_container">
         <p class="movie_title">${castee.original_name}</p>
         <div class="date_rating casteecharacter" >
         ${castee.character}
             </div>
             </div>
         </div>`;
};

const Trailerfunc = function (id) {
  return `<iframe class="youtubePlayer" src="https://autoembed.to/trailer/tv/${id}" width="100%" height="100%" loading="lazy"  frameborder="0" allowfullscreen></iframe>`;
};

/*  CLCIKED*/

const html2 = function (tvshow) {
  let url = `./SeasonEpisode.html?/Z${+encodeURIComponent(
    tvshow.number_of_seasons
  )}-id=${+encodeURIComponent(tvshow.id)}`;
  document.title = `${
    tvshow.name +
    " " +
    "(" +
    dateFormatter(tvshow.first_air_date) +
    ")" +
    " " +
    "|" +
    " " +
    "Cinemaa"
  }`;

  let cate = "";
  tvshow.genres.forEach((item) => {
    cate += `<li class="movie_details_category_ul_li">${item.name}</li>`;
  });
  return `<div class="movie_details">
    <img class="movie_details_poster" src="https://image.tmdb.org/t/p/w500/${
      tvshow.poster_path
    }" alt="title">
    <div class="movie_details_about">
        <h2 class="movie_details_title">${tvshow.name}</h2>
        <div class="movie_details_about_category">
            <ul class="movie_details_about_category_ul">
            ${cate}
            </ul>
        </div>
        <div class="date_rating tvshowdetail_date_rating">
            <p class="time">${
              tvshow.number_of_seasons
            } Seasons</p><span class="dot dot2 dot3"></span>
            <p class="time">${
              tvshow.episode_run_time[0]
            } minutes per episode</p><span class="dot dot2 dot3"></span>
            <p class="time">${
              tvshow.status
            }</p><span class="dot dot2 dot3"></span>
            <p class="date">${dateFormatter(
              tvshow.first_air_date
            )} - ${dateFormatter(
    tvshow.last_air_date
  )}</p><span class="dot dot2 dot3"></span>
            <p class="rating">${averagVoteformat(
              tvshow.vote_average
            )}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                        height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg></span></p>
        </div>
        <a class="playLink" href="${url}"><button class="play_btn"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19"
                fill="currentColor" class="path_btn bi-play-fill" viewBox="0 0 16 16">
                <path class="path_btnn"
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z">
                </path>
            </svg>seasons</button></a> 
    </div>

</div> `;
};

const Bigposter = function (movieee) {
  return `<img class="poster_big_img" src="https://image.tmdb.org/t/p/original/${movieee.backdrop_path}" alt="">`;
};

const CurrTvshow = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${myApi}&append_to_response=credits,recommendations,similar`
  );
  const data = await res.json();
  return data;
};

let url = document.location.href;
let fetcid = url.slice(url.indexOf("=") + 1);
function tvload() {
  CurrTvshow(fetcid).then((dat) => {
    let trailerHtml = Trailerfunc(fetcid);
    Trailer_section.innerHTML = trailerHtml;
    let htm = "";
    console.log(dat);
    htm = html2(dat);
    movieDetails.innerHTML = htm;
    let BigPoster = Bigposter(dat);
    posterBBig.innerHTML = BigPoster;
    sectionStory.textContent = dat.overview;
    let castarr = dat.credits.cast;

    // CAST FOR TV SHOWS

    if (castarr.length == 0) {
      document.querySelector(".movie_caste_container").style.display = "none";
    } else {
      castarr.forEach((item) => {
        if (item.profile_path !== null) {
          const castehtml = Castfun(item);
          Casdiv.insertAdjacentHTML("beforeend", castehtml);
        }
      });
      const castdiv = document.querySelectorAll(".castdiv");
      castdiv.forEach(
        (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
      );
    }

    // forEach to call recommendation of tv shows

    let recommarr = dat.recommendations.results;
    if (dat.recommendations.results.length == 0) {
      document.getElementById("recommenn").style.display = "none";
    } else {
      recommarr.forEach((item) => {
        const html3 = recommTvshowFun(item);
        recommendationMoviesDiv.insertAdjacentHTML("beforeend", html3);
      });

      const recommenMovies = document.querySelectorAll(".recommenMovies");
      recommenMovies.forEach(
        (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
      );
    }

    // function to get similar to tv shows

    let similararr = dat.similar.results;
    similararr.forEach((item) => {
      const htmll = simimarTvshowfun(item);
      SimilarMoviesDiv.insertAdjacentHTML("beforeend", htmll);
    });
    const similarMovies = document.querySelectorAll(".similarMovies");
    similarMovies.forEach(
      (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
    );
  });
}
tvload();

const recommTvshowFun = (mov) => {
  let url = "./TvshowsDetails.html?id=" + encodeURIComponent(mov.id);
  return `<div class="Now_playing_movies recommenMovies" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${
    mov.id
  }" src="https://image.tmdb.org/t/p/w500/${mov.poster_path}" loading="lazy"
  onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
  alt="${mov.name}"></a>
         <p class="movie_title">${mov.name}</p>
         <div class="date_rating">
             <p class="date recommendTvShow_date">${dateFormatter(
               mov.first_air_date
             )}</p><span class="dot dot2 recommendTvShow_date_dot"></span>
             <p class="rating recommendTvShow_date">${averagVoteformat(
               mov.vote_average
             )}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category recommendTvShow_category">TV Show</div>
             </div>
         </div>`;
};

const simimarTvshowfun = (movie) => {
  let url = "./TvshowsDetails.html?id=" + encodeURIComponent(movie.id);
  return `<div class="Now_playing_movies similarMovies" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${
    movie.id
  }" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" loading="lazy" 
  onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
  alt="${movie.name}"></a>
         <p class="movie_title">${movie.name}</p>
         <div class="date_rating">
             <p class="date recommendTvShow_date">${dateFormatter(
               movie.first_air_date
             )}</p><span class="dot dot2 recommendTvShow_date_dot"></span>
             <p class="rating recommendTvShow_date">${averagVoteformat(
               movie.vote_average
             )}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category recommendTvShow_category">TV Show</div>
             </div>
         </div>`;
};

searchbox.addEventListener("click", function () {
  location.replace("./search.html");
});
