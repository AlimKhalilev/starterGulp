function initDropdown() {
    // document.querySelectorAll(".dropdown--click").forEach(item => {
    //     item.addEventListener("click", () => {
    //         item.classList.toggle("dropdown--active");
    //     });
    // });
    $(".dropdown").each(function () {
        let header = $(this).find(".dropdown__header");
        let body = $(this).find(".dropdown__body");

        placeElemPositionY(body[0], "dropdown__body--top"); // позиционируем сверху, если он смещает контент
        body.hide();

        if ($(this).hasClass("dropdown--click")) { // если имеет модификатор клика, вешаем событие на клик (тип dropdown)
            header.click(function () {
                body.fadeToggle("slow");
            });
        }
        else if ($(this).hasClass("dropdown--hover")) { // если нет, вешаем событие на наведение (тип tooltip)
            header.hover(
                function () {
                    body.fadeToggle("slow");
                }, function () {
                    body.fadeToggle("slow");
                }
            );
        }
    });


}

initDropdown();