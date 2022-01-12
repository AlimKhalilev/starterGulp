import { Modal } from "./modal.js";

export class EasterEgg {
    static myName = "";

    static initEvents() {
        document.addEventListener("keydown", function(e) {
            if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
                this.myName += e.code.substr(3, 1);
                if (this.myName.substr(this.myName.length - 6, 6) == "FORMYS") {
                    document.documentElement.requestFullscreen();
                    Modal.show("easterEgg");
                    this.myName = "";
                }
            }
        });
    }
}