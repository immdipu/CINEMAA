const arrowLeft = document.querySelector(".arrow_left");
const hamburger = document.querySelector(".hamburger");
const lightDarkmode = document.querySelector(".light_darkmode");
const hamburgerPhone = document.querySelector(".hamburgerphone");
const sidenavContainer = document.querySelector(".sidenav_container");
const overlaySideNavabar = document.querySelector(".overlay_side_navabar");
const sidenav = document.querySelector(".sidenav");
const searchbox = document.querySelector(".search");
const menuulLI = document.querySelectorAll(".menu_ul li");
const cards = document.querySelectorAll(".card blockquote");
const AllCards = document.querySelectorAll(".card");
const biChevronDown = document.querySelectorAll("card .bi-chevron-down");


menuulLI.forEach(item => {
    item.addEventListener('click', function () {
        menuulLI.forEach(i => i.classList.remove('hovered'))
        item.classList.add('hovered');
    })

})

lightDarkmode.addEventListener("click", function () {
    document.body.classList.toggle("light");

    if (document.body.classList.contains(`light`)) {
        localStorage.setItem(`theme`, `light`)
    } else {
        localStorage.setItem(`theme`, `dark`);
    }
});

function settheme() {
    let currtheme = localStorage.getItem('theme');

    if (currtheme == 'light') {
        document.body.classList.add("light");
    } else {
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


AllCards.forEach(card => card.classList.add('hideCard'));


AllCards.forEach(eachCard => {
    eachCard.addEventListener('click', function () {
        if (!eachCard.classList.contains('hideCard')) {
            eachCard.classList.add('hideCard');
            eachCard.classList.remove('rotate');
        }

        else {



            AllCards.forEach(card => {
                card.classList.add('hideCard');
                card.classList.remove('rotate');
            });

            eachCard.classList.toggle('hideCard');
            eachCard.classList.toggle('rotate');
        }

    })


})


menuulLI.forEach(item => {
    item.addEventListener('click', function () {
        menuulLI.forEach(i => i.classList.remove('hovered'))
        item.classList.add('hovered');
    })

})
menuulLI[3].classList.add('hovered');




searchbox.addEventListener('click', function () {
    location.replace("./search.html")
})


