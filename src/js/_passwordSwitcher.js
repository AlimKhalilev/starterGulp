function inputChangeTypePassword() {
    let pathSvg = "img/sprite.svg";
    let iconsNames = ["#eye_open", "#eye_close"];

    document.querySelectorAll("[data-passwordSwitcher]").forEach(item => {
        let icon = item.querySelector(".c-field__icon");
        let input = item.querySelector(".c-field__input");
        let icon_use = item.querySelector(".c-field__icon use");

        icon.addEventListener("click", (e) => {
            if (input.getAttribute("type") == "password") {
                input.setAttribute("type", "text");
                icon_use.setAttribute("xlink:href", pathSvg + iconsNames[0])
            }
            else {
                input.setAttribute("type", "password");
                icon_use.setAttribute("xlink:href", pathSvg + iconsNames[1]);
            }
        });
    });
}

inputChangeTypePassword();