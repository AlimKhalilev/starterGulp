function initModal() {
    let overlay = document.querySelector(".overlay--modal");
    let header = document.querySelector(".header"); // ему тоже будем добавлять paddingRight, так как он fixed
    let withPaddingElems = [g_body, header]; // сюда добавляем все элементы, к которым хотим добавить padding 

    function toggleModal() {
        overlay.classList.toggle("visible");
        g_body.classList.toggle("hideScroll");
        withPaddingElems.forEach(elem => { // и тут этот padding
            elem.style.paddingRight = (elem.style.paddingRight === "" ? `${g_scrollBarWidth}px` : "");
        });
    }
    
    function showModal(id) {
        toggleModal();
        document.querySelector(`#${id}`).classList.add("visible");
    }

    function changeModal(id) { // закрыть текущее модальное окно, и открыть новое через 700 мс
        closeModal();
        setTimeout(() => showModal(id), 700);
    }
    
    function closeModal() {
        document.querySelector(".modal.visible").classList.remove("visible");
        setTimeout(() => {
            toggleModal();
        }, 150); // так как 0.3s ease-in-out, это нужно чтобы окно модальное не прыгало резко влево во время закрытия
    }
    
    document.querySelectorAll("[data-modal]").forEach(item => {
        item.addEventListener("click", () => {
            showModal(item.dataset.modal)
        });
    });

    document.querySelectorAll("[data-changeModal]").forEach(item => {
        item.addEventListener("click", () => changeModal(item.dataset.changemodal));
    });
    
    document.querySelectorAll("[data-closeModal]").forEach(item => {
        item.addEventListener("click", () => closeModal());
    });
}

initModal();