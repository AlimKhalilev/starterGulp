import { placeElemPosY } from "./plugins/placeElemPosY.js";

export function initCustomSelect() {
    document.querySelectorAll("[data-customSelect]").forEach(item => {
        let select = item.querySelector("select");
        let optionNodeList = select.querySelectorAll("option");
        let icon = item.querySelector("svg");

        select.classList.add("visually-hidden");
        renderCustomSelect(item, optionNodeList, icon);
    });

    function getActiveTitle(nodeList) {
        let activeTitle = "";
        nodeList.forEach((option, i) => {
            if (i == 0) {
                activeTitle = option.innerHTML;
            }
            if (option.hasAttribute("selected")) {
                activeTitle = option.innerHTML;
            }
        });
        return activeTitle;
    }

    function renderCustomSelectItems(nodeList, itemsList) {
        itemsList.innerHTML = "";

        nodeList.forEach((option, id) => {
            let c_select__item = document.createElement("li");
            c_select__item.classList.add("c-select__item");
            c_select__item.setAttribute("data-id", id);
            c_select__item.setAttribute("title", option.innerHTML);
            c_select__item.innerHTML = `<span class="c-select__itemText">${option.innerHTML}</span>`;

            option.getAttributeNames().forEach(attr => {
                c_select__item.setAttribute(attr, option.getAttribute(attr));
            });

            itemsList.appendChild(c_select__item);
        });
    }

    function setAutoSize(header, body, icon) {
        body.style.border = "none";
        body.style.height = "0";
        body.style.position = "initial";
        icon.style.display = "none";

        setTimeout(() => {
            let width = 0;

            if (body.offsetWidth === 0) { // если размер равен 0 (у родителя возможно display: none)
                let cloneBody = body.cloneNode(true); // создаем клон элемента, берем у него размер и удаляем
                let cover = document.createElement("div");
                cover.classList.add("c-select");
                cover.style.display = "flex";

                cover.appendChild(cloneBody);
                document.body.appendChild(cover);
                width = `calc(${cloneBody.offsetWidth}px + 2rem)`;
                document.body.removeChild(cover);
            }
            else {
                width = `calc(${body.offsetWidth}px + 2rem)`;
            }
            body.removeAttribute("style");
            icon.removeAttribute("style");
            
            body.style.width = width;
            header.style.width = width;
        }, 150);
    }

    function renderCustomSelect(parent, nodeList, icon) {
        let c_select__inner = document.createElement("div");
        c_select__inner.classList.add("c-select__inner");

        let c_select__header = document.createElement("div");
        c_select__header.classList.add("c-select__header");

        let c_select__title = document.createElement("span");
        c_select__title.classList.add("c-select__title");
        c_select__title.innerHTML = getActiveTitle(nodeList);
        c_select__title.setAttribute("title", getActiveTitle(nodeList));

        c_select__header.appendChild(c_select__title);
        if (icon !== null) {
            c_select__header.appendChild(icon);
        }

        let c_select__body = document.createElement("div");
        c_select__body.classList.add("c-select__body");

        c_select__header.classList.add("c-select__container");
        c_select__body.classList.add("c-select__container");

        let c_select__items = document.createElement("ul");
        c_select__items.classList.add("c-select__items");

        renderCustomSelectItems(nodeList, c_select__items);

        c_select__body.appendChild(c_select__items);

        c_select__inner.appendChild(c_select__header);
        c_select__inner.appendChild(c_select__body);

        parent.appendChild(c_select__inner);

        placeElemPosY(c_select__body, "c-select__body--top");

        parent.addEventListener("click", function(e) {
            parent.toggleAttribute("open");
        });

        c_select__items.addEventListener("click", function(e) {
            const target = e.target.classList.contains("c-select__item") ? e.target : e.target.parentNode;
            if (target.classList.contains("c-select__item")) {
                if (target.hasAttribute("disabled")) { // если у пункта стоит disabled, запрещаем его выбор
                    console.log("disabled");
                    return false;
                }
                nodeList.forEach(elem => {
                    elem.removeAttribute("selected");
                });
                nodeList[+target.dataset.id].setAttribute("selected", "");
                renderCustomSelectItems(nodeList, c_select__items);
                c_select__title.innerHTML = getActiveTitle(nodeList);
            }
        });

        // ЗАКОММЕНТИТЬ, ЕСЛИ НЕ НУЖНА АВТОШИРИНА ПО САМОМУ ДЛИННОМУ ЭЛЕМЕНТУ СПИСКА (и добавить min-width в scss)
        setAutoSize(c_select__header, c_select__body, icon);
    }
}