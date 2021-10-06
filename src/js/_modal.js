class Modal {
    static overlay = document.querySelector(".overlay--modal");
    static header = document.querySelector(".header");
    static paddingElems = [g_body, this.header];
    static isModalVisible = false; // открыто ли какое-либо модальное окно

    static toggleOverlay() {
        this.overlay.classList.toggle("visible");
        g_body.classList.toggle("hideScroll");
        this.paddingElems.forEach(elem => { // все элементы, куда нужно добавить padding - добавляем
            elem.style.paddingRight = (elem.style.paddingRight === "" ? `${g_scrollBarWidth}px` : "");
        });
    }

    static show(id) {
        if (!this.isModalVisible) {
            this.toggleOverlay();
            document.querySelector(`#${id}`).classList.add("visible");
            this.isModalVisible = true;
        }
        else {
            return "Модальное окно уже открыто!";
        }
    }

    static change(id) { // закрыть текущее модальное окно, и открыть новое через 700 мс
        this.close();
        setTimeout(() => this.show(id), 700);
    }

    static close() {
        if (this.isModalVisible) {
            document.querySelector(".modal.visible").classList.remove("visible");
            setTimeout(() => {
                this.toggleOverlay();
                this.isModalVisible = false;
            }, 150); // так как 0.3s ease-in-out, это нужно чтобы окно модальное не прыгало резко влево во время закрытия
        }
        else {
            return "Активное модальное окно отсутствует!";
        }
    }

    static initEvents() {
        document.querySelectorAll("[data-modal]").forEach(item => {
            item.addEventListener("click", () => {
                this.show(item.dataset.modal)
            });
        });
    
        document.querySelectorAll("[data-changeModal]").forEach(item => {
            item.addEventListener("click", () => this.change(item.dataset.changemodal));
        });
        
        document.querySelectorAll("[data-closeModal]").forEach(item => {
            item.addEventListener("click", () => this.close());
        });
    }
}

Modal.initEvents();