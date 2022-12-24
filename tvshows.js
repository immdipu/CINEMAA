const hamburgerPhone = document.querySelector(".hamburgerphone");
const hamburger = document.querySelector(".hamburger");
const overlaySideNavabar = document.querySelector(".overlay_side_navabar");
const lightDarkmode = document.querySelector(".light_darkmode");
const arrowLeft = document.querySelector(".arrow_left");
const sidenavChildContainer = document.querySelector(
  ".sidenav_child_container"
);
const searchResultDiv = document.querySelector(".search_result_div");
const menuulLI = document.querySelectorAll(".menu_ul li");
const categoLi = document.querySelectorAll(".tvshowcatrgory_ul li");
const categoUl = document.querySelector(".tvshowcatrgory_ul");
const movieDetailnavContainer = document.querySelector(
  ".movieDetailnavContainer"
);
const NextBtn = document.querySelector(".Next_btn");
const previousBtn = document.querySelector(".previous_btn");
const pageCount = document.querySelector(".pageCount");
const searchbox = document.querySelector(".search");
const tvshowscatogryGenre = document.querySelector(".tvshowscatogry_genre");
const paginationBtn = document.querySelectorAll(".paginationBtn");

paginationBtn.forEach((item) => item.classList.add("Categorymode"));

window.addEventListener("scroll", function () {
  let intiCon = categoUl.getBoundingClientRect();
  if (window.scrollY > intiCon.height + 100) {
    movieDetailnavContainer.classList.add("bgadd");
  } else {
    movieDetailnavContainer.classList.remove("bgadd");
  }
});

menuulLI.forEach((item) => {
  item.addEventListener("click", function () {
    menuulLI.forEach((i) => i.classList.remove("hovered"));
    item.classList.add("hovered");
  });
});
menuulLI[2].classList.add("hovered");

categoLi[0].classList.add("actv");

let category = "airing_today";

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

let airingToday = "airing_today";
let onTheAir = "on_the_air";
let Popular = "popular";
let topRated = "top_rated";

const myApi = "6b2dec73b6697866a50cdaef60ccffcb";

const firstpage = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${category}?api_key=6b2dec73b6697866a50cdaef60ccffcb&page=${intialPage}`
  );
  const data = await res.json();
  const airingtoday = data.results;
  let htmll = " ";
  airingtoday.forEach((item) => {
    if (item.poster_path !== null && "first_air_date" in item) {
      htmll += searchfun(item);
      searchResultDiv.innerHTML = htmll;
    }
  });
};

const Secondpage = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=6b2dec73b6697866a50cdaef60ccffcb&language=en-US&page=${intialPage}&with_genres=${categoryId}`
  );
  const data = await res.json();
  const airingtoday = data.results;
  let htmll = " ";
  airingtoday.forEach((item) => {
    if (item.poster_path !== null && "first_air_date" in item) {
      htmll += searchfun(item);
      searchResultDiv.innerHTML = htmll;
    }
  });
};

const airingTodayfun = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${category}?api_key=6b2dec73b6697866a50cdaef60ccffcb`
  );
  const data = await res.json();
  let totalPages = data.total_pages;
  return totalPages;
};

const airingTodayfun2 = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=6b2dec73b6697866a50cdaef60ccffcb&sort_by=popularity.desc&include_adult=false&with_genres=${categoryId}`
  );
  const data = await res.json();
  let totalPages = data.total_pages;
  return totalPages;
};

let intialPage = 1;
firstpage();
airingTodayfun().then((totalpage) => {
  pageCount.innerText = `${intialPage} of ${totalpage}`;
});

const btnactive = function (intial, totalpage) {
  if (intial == 1) {
    previousBtn.classList.add("btnDeactive");
    NextBtn.classList.remove("btnDeactive");
  }

  if (intial > 1) {
    previousBtn.classList.remove("btnDeactive");
    NextBtn.classList.remove("btnDeactive");
  }

  if (intial == totalpage) {
    previousBtn.classList.remove("btnDeactive");
    NextBtn.classList.add("btnDeactive");
  }
};

previousBtn.classList.add("btnDeactive");

NextBtn.addEventListener("click", function () {
  if (NextBtn.classList.contains("Categorymode")) {
    airingTodayfun().then((totalpage) => {
      if (intialPage < totalpage) {
        intialPage += 1;
        firstpage();
        pageCount.innerText = `${intialPage} of ${totalpage}`;
        btnactive(intialPage, totalpage);
      }
    });
  } else {
    airingTodayfun2().then((totalpage) => {
      if (intialPage < totalpage) {
        intialPage += 1;
        Secondpage();
        pageCount.innerText = `${intialPage} of ${totalpage}`;
        btnactive(intialPage, totalpage);
      }
    });
  }
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

previousBtn.addEventListener("click", function () {
  if (NextBtn.classList.contains("Categorymode")) {
    airingTodayfun().then((totalpage) => {
      if (intialPage > 1) {
        intialPage -= 1;
        pageCount.innerText = `${intialPage} of ${totalpage}`;
        firstpage();
        btnactive(intialPage, totalpage);
      }
    });
  } else {
    airingTodayfun2().then((totalpage) => {
      if (intialPage > 1) {
        intialPage -= 1;
        pageCount.innerText = `${intialPage} of ${totalpage}`;
        Secondpage();
        btnactive(intialPage, totalpage);
      }
    });
  }
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

const searchfun = (movie) => {
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

const dateFormatter = function (date) {
  let currdate = date;
  let newDate = currdate.slice(0, 4);
  return newDate;
};

categoLi.forEach((item) => {
  item.addEventListener("click", function () {
    paginationBtn.forEach((item) => item.classList.add("Categorymode"));
    categoLi.forEach((i) => i.classList.remove("actv"));
    document
      .querySelectorAll(".tvGenrelist")
      .forEach((item) => item.classList.remove("actv"));
    item.classList.add("actv");
    if (item.innerText == "Airing Today") {
      category = "airing_today";
    }
    if (item.innerText == "On The Air") {
      category = "on_the_air";
    }
    if (item.innerText == "Popular") {
      category = "popular";
    }
    if (item.innerText == "Top Rated") {
      category = "top_rated";
    }
    intialPage = 1;
    firstpage();
    airingTodayfun().then((totalpage) => {
      pageCount.innerText = `${intialPage} of ${totalpage}`;
    });
  });
});

searchbox.addEventListener("click", function () {
  location.replace("./search.html");
});

//Loading tv shows genre list/

const genreList = async () => {
  let genreHtml = "";
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/tv/list?api_key=6b2dec73b6697866a50cdaef60ccffcb"
  );
  const data = await res.json();
  const tvshowsGenrelist = data.genres;
  tvshowsGenrelist.forEach((item) => {
    genreHtml += `<li class="tvGenrelist" data-id=${item.id}>${item.name}</li>`;
  });
  tvshowscatogryGenre.innerHTML = genreHtml;
};

genreList();

tvshowscatogryGenre.addEventListener("click", function (e) {
  let element = e.target;
  if (element.classList.contains("tvGenrelist")) {
    paginationBtn.forEach((item) => item.classList.remove("Categorymode"));
    document
      .querySelectorAll(".tvGenrelist")
      .forEach((item) => item.classList.remove("actv"));
    categoLi.forEach((i) => i.classList.remove("actv"));
    element.classList.add("actv");
    categoryId = element.dataset.id;
    intialPage = 1;
    Secondpage();
    airingTodayfun2().then((totalpage) => {
      pageCount.innerText = `${intialPage} of ${totalpage}`;
    });
  }
});
