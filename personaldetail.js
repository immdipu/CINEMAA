const movieDetailnavContainer = document.querySelector(
  ".movieDetailnavContainer"
);

const arrowLeft = document.querySelector(".arrow_left");
const hamburger = document.querySelector(".hamburger");
const leftArrow = document.querySelectorAll(".leftarrow");
const rightarrow = document.querySelectorAll(".rightarrow");
const lightDarkmode = document.querySelector(".light_darkmode");
const hamburgerPhone = document.querySelector(".hamburgerphone");
const sidenavChildContainer = document.querySelector(
  ".sidenav_child_container"
);
const overlaySideNavabar = document.querySelector(".overlay_side_navabar");
const sidenav = document.querySelector(".sidenav");
const searchbox = document.querySelector(".search");
const personMoviesDiv = document.querySelector(".person_movies_div");
const profilePictureContainer = document.querySelector(
  ".profile_picture_container"
);
const personName = document.querySelector(".person_name");
const biography = document.querySelector(".biography");
const birthPlace = document.querySelector(".birth_place");
const DoB = document.querySelector(".DoB");
const searchResultDiv = document.querySelector(".search_result_div");
const CategoriesContainer = document.querySelector(".CategoriesContainer");
const categories_btn = document.querySelectorAll(".categories_btn");

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
  let intiCon = profilePictureContainer.getBoundingClientRect();
  if (window.scrollY > intiCon.height - 150) {
    movieDetailnavContainer.classList.add("bgadd");
  } else {
    movieDetailnavContainer.classList.remove("bgadd");
  }
});

lightDarkmode.addEventListener("click", function () {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("dark");
  }
});

arrowLeft.addEventListener("click", function () {
  document.body.classList.remove("minimize_siderbar");
});

hamburger.addEventListener("click", function () {
  document.body.classList.add("minimize_siderbar");
});

const myApi = "6b2dec73b6697866a50cdaef60ccffcb";

function settheme() {
  let currtheme = localStorage.getItem("theme");
  if (currtheme == "light") {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }
}

settheme();

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

const personMoivesfun = (movie) => {
  let url = "./movieDetail.html?id=" + encodeURIComponent(movie.id);
  return `<div class="item" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${
    movie.id
  }" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
  loading="lazy" 
        onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
         alt="${movie.title}"></a>
         <p class="movie_title movie_title_search" >${movie.title}</p>
         <div class="date_rating">
             <p class="date date_search">${dateFormatter(
               movie.release_date
             )}</p><span class="dot dot2"></span>
             <p class="rating rating_search">${averagVoteformat(
               movie.vote_average
             )}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category category_search">Movie</div>
             </div>
         </div>`;
};

const personTvShowfun = (movie) => {
  let url = "./TvShowsDetails.html?id=" + encodeURIComponent(movie.id);
  return `<div class="item" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${
    movie.id
  }" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${
    movie.name
  }
  loading="lazy" 
  onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
  "></a>
         <p class="movie_title movie_title_search" >${movie.name}</p>
         <div class="date_rating tvshows_date_rating">
             <p class="date date_search">${dateFormatter(
               movie.first_air_date
             )}</p><span class="dot dot2 recommendTvShow_date_dot"></span>
             <p class="rating rating_search">${averagVoteformat(
               movie.vote_average
             )}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category category_search recommendTvShow_category">TV show</div>
             </div>
         </div>`;
};

const personMOvies = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=6b2dec73b6697866a50cdaef60ccffcb&append_to_response=combined_credits`
  );
  const data = await res.json();
  const NowPlayingmovies = data;
  return NowPlayingmovies;
};

let pp = "";

let url = document.location.href;
let fetcid = url.slice(url.indexOf("=") + 1);
function personallcat() {
  let htmll = " ";
  personMOvies(fetcid).then((dat) => {
    profilep(dat);
    let moviecrdits = dat.combined_credits.cast;
    moviecrdits.sort((cast1, cast2) => cast2.vote_average - cast1.vote_average);

    if (CategoriesContainer.textContent == "All Categories") {
      moviecrdits.forEach((item) => {
        if (item.media_type == "tv" && item.poster_path != null) {
          htmll += personTvShowfun(item);
        }
        if (
          item.media_type == "movie" &&
          item.release_date !== "" &&
          item.poster_path !== null
        ) {
          htmll += personMoivesfun(item);
        }
        searchResultDiv.innerHTML = htmll;
      });
    } else if (CategoriesContainer.textContent == "Movies Only") {
      moviecrdits.forEach((item) => {
        if (
          item.media_type == "movie" &&
          item.release_date !== "" &&
          item.poster_path !== null
        ) {
          htmll += personMoivesfun(item);
        }
        searchResultDiv.innerHTML = htmll;
      });
    } else if (CategoriesContainer.textContent == "TV Only") {
      moviecrdits.forEach((item) => {
        if (item.media_type == "tv" && item.poster_path != null) {
          htmll += personTvShowfun(item);
        }
        searchResultDiv.innerHTML = htmll;
      });
    }
  });
}
personallcat();

const profilep = function (person) {
  personName.textContent = person.name;
  biography.textContent = person.biography;
  birthPlace.textContent = person.place_of_birth;
  DoB.textContent = person.birthday;
  let pp = `<img class="pp" src="https://image.tmdb.org/t/p/w500/${person.profile_path}" alt="">`;
  profilePictureContainer.innerHTML = pp;
};

categories_btn[0].classList.add("categories_btn_active");

categories_btn.forEach((item) =>
  item.addEventListener("click", function () {
    categories_btn.forEach((i) => i.classList.remove("categories_btn_active"));
    item.classList.add("categories_btn_active");
    CategoriesContainer.textContent = item.textContent;
    personallcat();
  })
);
