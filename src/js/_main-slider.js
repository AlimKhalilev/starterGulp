$('.main-slider').lightSlider({
    item: 5,
    slideMove: 1,
    slideMargin: "",
    controls: true,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    speed: 600,
    responsive: [
        {
            breakpoint: 780,
            settings: {
                item: 2,
                slideMove: 1
            }
        },
        {
            breakpoint: 578,
            settings: {
                item: 1,
                slideMove: 1
            }
        }
    ]
}); 