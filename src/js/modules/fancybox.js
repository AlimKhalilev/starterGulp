import { Fancybox } from "@fancyapps/ui";

export function initFancyBox() {
    let header = document.querySelector(".header");
    if (header !== null) {
        header.classList.add("compensate-for-scrollbar"); // добавляем также padding-right от скролла для header (т.к. pos fixed)
    }

    Fancybox.bind("[data-fancybox]", {
        on: {
            load: (fancybox, slide) => {
                // console.log(`#${slide.index} slide is loaded!`);
                // console.log(`This slide is selected: ${fancybox.getSlide().index === slide.index}`);
            },
        },
    });
}