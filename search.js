const searchResultDiv = document.querySelector(".search_result_div");
const searchBtn = document.querySelector(".search");
const searchHeader = document.getElementById("search_header");
const hamburgerPhone = document.querySelector(".hamburgerphone");
const hamburger = document.querySelector(".hamburger");
const overlaySideNavabar = document.querySelector(".overlay_side_navabar");
const lightDarkmode = document.querySelector(".light_darkmode");
const arrowLeft = document.querySelector(".arrow_left");
const sidenavChildContainer = document.querySelector(
  ".sidenav_child_container"
);

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

arrowLeft.addEventListener("click", function () {
  document.body.classList.remove("minimize_siderbar");
});

lightDarkmode.addEventListener("click", function () {
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

hamburger.addEventListener("click", function () {
  document.body.classList.add("minimize_siderbar");
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

const myApi = "6b2dec73b6697866a50cdaef60ccffcb";

const searchitem = async (srchquery) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${myApi}&language=en-US&query=${srchquery}&page=1`
  );
  const data = await res.json();
  const NowPlayingmovies = data.results;
  return NowPlayingmovies;
};

const searchMoviefun = (movie) => {
  let url = "./movieDetail.html?id=" + encodeURIComponent(movie.id);
  return `<div class="item" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${
    movie.id
  }"
  src='./resources/D moviesand tv show.png'
  data-src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
  loading="lazy" 
  onload="this.src=this.getAttribute('data-src')"
        alt="${movie.title}"></a>
         <p class="movie_title movie_title_search" >${movie.title}</p>
         <div class="date_rating">
             <p class="date date_search">${dateFormatter(
               movie.release_date
             )}</p><span class="dot dot2"></span>
             <p class="rating rating_search">${
               movie.vote_average
             }<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category category_search">Movie</div>
             </div>
         </div>`;
};

const searchTVfun = (movie) => {
  let url = "./TvShowsDetails.html?id=" + encodeURIComponent(movie.id);
  return `<div class="item" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${
    movie.id
  }" 
  src='./resources/D moviesand tv show.png'
  data-src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
  loading="lazy" 
  onload="this.src=this.getAttribute('data-src')"
        alt="${movie.name}"></a>
         <p class="movie_title movie_title_search" >${movie.name}</p>
         <div class="date_rating tvshows_date_rating">
             <p class="date date_search">${dateFormatter(
               movie.first_air_date
             )}</p><span class="dot dot2 recommendTvShow_date_dot"></span>
             <p class="rating rating_search">${
               movie.vote_average
             }<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category category_search recommendTvShow_category">TV show</div>
             </div>
         </div>`;
};

const searchPersonFun = (Castee) => {
  let url = "./personDetail.html?id=" + encodeURIComponent(Castee.id);
  return `<div class="item" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${Castee.id}" 
    src='./resources/D moviesand tv show.png'
    data-src="https://image.tmdb.org/t/p/w500/${Castee.profile_path}" 
    loading="lazy" 
    onload="this.src=this.getAttribute('data-src')"
        alt="${Castee.name}"></a>
         <p class="movie_title movie_title_search" >${Castee.name}</p>
         <div class="date_rating tvshow</p><span class="dot dot2 recommendTvShow_date_dot"></span>
         <p class="rating rating_search"><span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                     height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                     <path
                         d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                 </svg></span></p>
             <div class="category category_search recommendTvShow_category">Person</div>
             </div>
         </div>`;
};

const dateFormatter = function (date) {
  let currdate = date;
  let newDate = currdate.slice(0, 4);
  return newDate;
};

searchBtn.addEventListener("keyup", function () {
  if (searchBtn.value != "") {
    let htmll = " ";
    searchResultDiv.innerHTML = "";
    let searchQuery = searchBtn.value;
    searchHeader.textContent = `Search results for ${searchQuery.toUpperCase()} :`;
    searchitem(searchQuery).then((movies) => {
      movies.forEach((moviee) => {
        if (moviee.media_type == "tv" && moviee.poster_path != null) {
          htmll += searchTVfun(moviee);
        }
        if (
          moviee.media_type == "movie" &&
          "release_date" in moviee &&
          moviee.poster_path != null
        ) {
          htmll += searchMoviefun(moviee);
        }

        if (moviee.media_type == "person" && moviee.profile_path != null) {
          htmll += searchPersonFun(moviee);
        }

        searchResultDiv.innerHTML = htmll;
      });
    });
  }
});

window.onload = function () {
  searchBtn.focus();
};
