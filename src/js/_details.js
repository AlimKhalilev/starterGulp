function initDetails() {
    document.querySelectorAll("[data-details]").forEach(item => {
        let d_header = item.querySelector(".details__header");

        d_header.addEventListener("click", function(e) {
            item.classList.toggle("details--opened");
        });
    });
}

initDetails();