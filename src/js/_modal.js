function initModal() {
    let overlay = document.querySelector(".overlay_modal");
    let body = document.body;
    
    function showModal(id) {
        overlay.classList.add("visible");
        body.classList.add("hideScroll");
        document.querySelector(`#${id}`).classList.add("visible");
    }
    
    function closeModal() {
        overlay.classList.remove("visible");
        body.classList.remove("hideScroll");
        document.querySelector(".modal.visible").classList.remove("visible");
    }
    
    document.querySelectorAll("[data-modal]").forEach(item => {
        item.addEventListener("click", (e) => showModal(e.target.dataset.modal));
    });
    
    document.querySelectorAll("[data-closeModal]").forEach(item => {
        item.addEventListener("click", () => closeModal());
    });
}

initModal();