import { placeElemPosY } from "./plugins/placeElemPosY.js";

export class ContentSelect {
    static selectList = document.querySelectorAll("[data-contentSelect]");
    static activeId = []; // id активного пункта (массив селектов)

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

    static setAutoSize(header, body) {
        body.style.border = "none";
        body.style.height = "0";
        body.style.position = "initial";

        setTimeout(() => {
            let width = 0;

            if (body.offsetWidth === 0) { // если размер равен 0 (у родителя возможно display: none)
                let cloneBody = body.cloneNode(true); // создаем клон элемента, берем у него размер и удаляем
                let cloneHeader = header.cloneNode(true);
                let contentSelectCover = document.createElement("div");

                let cover = document.createElement("div");
                cover.classList.add("contentSelect");
                cover.appendChild(cloneHeader);
                cover.appendChild(cloneBody);

                contentSelectCover.appendChild(cover);
                document.body.appendChild(contentSelectCover);
                width = `calc(${cloneBody.offsetWidth}px + 0.75rem)`;
                document.body.removeChild(contentSelectCover);
            }
            else {
                width = `calc(${body.offsetWidth}px + 0.75rem)`;
            }
            body.removeAttribute("style");
            
            body.style.width = width;
            header.style.width = width;
        }, 150);
    }

    static createMarkup() {
        this.selectList.forEach((select, selectID) => {
            let body = this.createElemContainer("body");
            let header = this.createElemContainer("header");

            let itemList = select.querySelectorAll(".contentSelect__item");
            let icon = select.querySelector(".contentSelect__icon");

            header.appendChild(icon);

            select.innerHTML = "";

            itemList.forEach((item, id) => {
                let itemTextNode = item.querySelector(".contentSelect__text");
                if (itemTextNode !== null) {
                    item.setAttribute("title", itemTextNode.innerText);
                }

                let itemClone = item.cloneNode(true);

                let label = document.createElement("label");
                label.classList.add("contentSelect__label");

                if (item.hasAttribute("checked")) { // по атрибуту checked получает id активного выделенного пункта
                    this.activeId[selectID] = id;
                }

                let input = this.createRadioInput(select.dataset.contentselect, this.filterRadioAttributes(item.attributes));

                label.appendChild(input);
                label.appendChild(item);

                header.appendChild(itemClone);
                body.appendChild(label);
            })

            select.appendChild(header);
            select.appendChild(body);

            placeElemPosY(body, "contentSelect__body--top"); // ставим менюшку сверху или снизу

            // ЗАКОММЕНТИТЬ, ЕСЛИ НЕ НУЖНА АВТОШИРИНА ПО САМОМУ ДЛИННОМУ ЭЛЕМЕНТУ СПИСКА (и добавить min-width в scss)
            this.setAutoSize(header, body);

        });
    }

    static initEvents() {
        this.selectList.forEach((select, selectID) => {

            let selectHeader = select.querySelector(".contentSelect__header");
            let radioList = select.querySelectorAll(".contentSelect__radio");
            let contentList = selectHeader.querySelectorAll(".contentSelect__item");

            radioList.forEach((radio, id) => {
                radio.addEventListener("change", () => {
                    contentList[this.activeId[selectID]].removeAttribute("checked");
                    this.activeId[selectID] = id;
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