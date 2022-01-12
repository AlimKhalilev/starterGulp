import Swiper, { Navigation, Pagination } from 'swiper';
import { screen_xs_breakpoint, screen_sm_breakpoint, screen_md_breakpoint, screen_base_space } from './plugins/gridSizes.js';
Swiper.use([Navigation, Pagination]);

export const catSwiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 0,
    grabCursor: true,
    pagination: {
        el: ".main__slider .swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".main__slider .swiper-button-next",
        prevEl: ".main__slider .swiper-button-prev",
    },
    breakpoints: {
        // when window width is >= 0px (размеры идут от большего к меньшему)
        0: {
            slidesPerView: 1
        },
        [screen_xs_breakpoint]: {
            slidesPerView: 2
        },
        [screen_sm_breakpoint + screen_base_space]: {
            slidesPerView: 3
        },
        [screen_md_breakpoint + screen_base_space]: {
            slidesPerView: 4
        }
    }
});