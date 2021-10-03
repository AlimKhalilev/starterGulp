// link: http://sachinchoolur.github.io/lightslider/

function initSlider() {
    // data-slider="4,3,2,1" (СТРОКА, ГДЕ ЧИСЛА ЧЕРЕЗ ЗАПЯТУЮ БЕЗ ПРОБЕЛОВ: число элементов на компе, на ноуте, на планшете, на мобилках)

    let screen_sm = 768; // mobile
    let screen_md = 992; // planshet
    let screen_lg = 1280; // notebooks

    $("[data-slider]").each(function(_, elem) {
        let items = elem.dataset.slider.split(",");
        if (items.length != 4) { // если в dataset слайдера нет 3 количеств элементов для 3 разрешений 
            items = [1, 1, 1, 1]; // на всех разрешениях будет по 1 элементу
        }
        else {
            items = items.map(e => +e); // преобразуем строки в числа
        }

        $(elem).lightSlider({
            item: items[0],
            slideMove: 1,
            slideMargin: "",
            controls: true,
            easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
            speed: 600,
            responsive: [
                {
                    breakpoint: screen_lg,
                    settings: {
                        item: items[1],
                    }
                },
                {
                    breakpoint: screen_md,
                    settings: {
                        item: items[2],
                    }
                },
                {
                    breakpoint: screen_sm,
                    settings: {
                        item: items[3],
                    }
                }
            ]
        }); 
    });

}

initSlider();