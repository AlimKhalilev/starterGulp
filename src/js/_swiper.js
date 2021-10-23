let swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 0,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        // when window width is >= 100px
        100: {
            slidesPerView: 1
        },
        // when window width is >= 576px
        576: {
            slidesPerView: 2
        },
        // when window width is >= 768px
        768: {
            slidesPerView: 4
        }
    }
});