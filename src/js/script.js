--include("_webpsup.js");

let overlay = $(".overlay");
let body = $("body");

$(document).ready(function() {

    // КОД ДЛЯ БУРГЕР МЕНЮ
    
    // let button_burger = $(".burger");
    // let menu_burger = $(".menu-burger");
    // let body = $("body");

    // $(button_burger).click(function () {
    //     if (!menu_burger.is(':visible')) {
    //         menu_burger.slideDown('normal');
    //         body.css("overflow-y", "hidden");
    //     } 
    //     else {
    //         menu_burger.slideUp('normal');
    //         body.css("overflow-y", "");
    //     }
    // });

    /* 
    
    $("#open_modal").click(function() {
        overlay.css("visibility", "visible");
        overlay.css("opacity", "0.8");
        body.css("overflow-y", "hidden");

        if ($(window).width() <= '576') { // высота открытия модали на мобиле
            $(".modal-form").css("top", "50px");
        }
        
        if ($(window).width() > '576') { // высота открытия на экране больше 576
            $(".modal-form").css("top", "120px");
        }
    });

    $(".overlay").click(function() {

        $(".modal-form").css("top", "");
        body.css("overflow-y", "");
        overlay.css("visibility", "");
        overlay.css("opacity", "");
    });

    */

});