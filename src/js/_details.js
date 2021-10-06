function initDetails() {
    $("[data-details]").each(function() {
        $(this).find(".details__header").click(() => {
            $(this).find(".details__body").slideToggle('normal'); // плавно открываем или закрываем body details
            $(this).toggleClass("details--opened"); // по необходимости добавляем модификатор открытого details
        });
    });
}

initDetails();

/*
// код был написан, дабы избежать использования jquery, однако он хуже и менее читабельный
// желательно доработь код и сделать более читабельным

function moveDetailsBody(body, height, state) {
    let counterHeight = (state === 1 ? 0 : height);
    let counterStep = 2;
    let counterDelay = 5;

    let interval = setInterval(() => {
        counterHeight += counterStep * +state;
        body.style.height = counterHeight + "px";

        if ((state === 1 && counterHeight >= height) || (state === -1 && counterHeight <= 0)) {
            clearTimeout(interval);
            body.style.height = (state === 1 ? height : 0) + "px";
        }

    }, counterDelay);
}

document.querySelectorAll("[data-details]").forEach(item => {
    let d_header = item.querySelector(".details__header");
    let d_body = item.querySelector(".details__body");
    let d_body_height = d_body.offsetHeight;
    d_body.style.height = 0;

    d_header.addEventListener("click", function() {
        item.classList.toggle("details--opened");
        moveDetailsBody(d_body, d_body_height, (d_body.offsetHeight === 0 ? 1 : -1));
    });
});

*/