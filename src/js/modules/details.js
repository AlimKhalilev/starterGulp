import $ from "jquery";

export function initDetails() {
    $("[data-details]").each(function() {
        $(this).find(".details__header").click(() => {
            $(this).find(".details__body").slideToggle('normal'); // плавно открываем или закрываем body details
            $(this).toggleClass("details--opened"); // по необходимости добавляем модификатор открытого details
        });
    });
}