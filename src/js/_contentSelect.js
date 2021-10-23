class ContentSelect {
    static selectList = document.querySelectorAll("[data-contentSelect]");
    static activeId = 0; // id активного пункта

    static filterRadioAttributes(attributes) { // из NamedNodeMap возвращает массив имен атрибутов, кроме class
        return [...attributes].map(elem => elem.name).filter(elem => elem !== "class"); // возвращает 
    }

    static createElemContainer(elemName) {
        let elem = document.createElement("div");

        elem.classList.add(`contentSelect__${elemName}`);
        elem.classList.add("contentSelect__container");
        return elem;
    }

    static createRadioInput(name, attributes) {
        let input = document.createElement("input");

        input.setAttribute("type", "radio");
        input.setAttribute("name", name);
        
        input.classList.add("contentSelect__radio");
        input.classList.add("visually-hidden");

        attributes.forEach(attr => {
            input.setAttribute(attr, "")
        });

        return input;
    }

    static createMarkup() {
        this.selectList.forEach(select => {
            let body = this.createElemContainer("body");
            let header = this.createElemContainer("header");

            let itemList = select.querySelectorAll(".contentSelect__item");
            let icon = select.querySelector(".contentSelect__icon");

            header.appendChild(icon);

            select.innerHTML = "";

            itemList.forEach((item, id) => {
                let itemClone = item.cloneNode(true);

                let label = document.createElement("label");
                label.classList.add("contentSelect__label");

                if (item.hasAttribute("checked")) { // по атрибуту checked получает id активного выделенного пункта
                    this.activeId = id;
                }

                let input = this.createRadioInput(select.dataset.contentselect, this.filterRadioAttributes(item.attributes));

                label.appendChild(input);
                label.appendChild(item);

                header.appendChild(itemClone);
                body.appendChild(label);
            })

            select.appendChild(header);
            select.appendChild(body);

            placeElemPositionY(body, "contentSelect__body--top"); // ставим менюшку сверху или снизу


        });
    }

    static initEvents() {
        this.selectList.forEach(select => {

            let selectHeader = select.querySelector(".contentSelect__header");
            let radioList = select.querySelectorAll(".contentSelect__radio");
            let contentList = selectHeader.querySelectorAll(".contentSelect__item");

            radioList.forEach((radio, id) => {
                radio.addEventListener("change", () => {
                    contentList[this.activeId].removeAttribute("checked");
                    this.activeId = id;
                    contentList[id].setAttribute("checked", "");
                    select.toggleAttribute("open");
                });
            });

            selectHeader.addEventListener("click", () => {
                select.toggleAttribute("open");
            });
            
        });
    }
}

ContentSelect.createMarkup();
ContentSelect.initEvents();