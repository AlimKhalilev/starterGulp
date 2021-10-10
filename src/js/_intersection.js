--include("./polyfills/intersection-observer.js") // подключаем полифилл для полной работоспособности данного API

class Intersection {
    static observerOptions = {
        threshold: 0.5 // при каком объеме обхвата блока будет сработан слушатель
    };

    static animObserverCallback(entries) { // callback функция с настройками
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!entry.target.classList.contains(entry.target.dataset.animation)) {
                    entry.target.classList.add(entry.target.dataset.animation);
                }
            }
        });
    }

    static animObserver = new IntersectionObserver(this.animObserverCallback, this.observerOptions);

    static initAnimEvents() {
        document.querySelectorAll("[data-animation]").forEach(item => {

            this.animObserver.observe(item); // закидываем слушателя на все необходимые элементы

            item.addEventListener("mouseenter", function(e) { // вешаем событие на наведение мыши (доп. функционал)
                item.classList.remove(item.dataset.animation);
                setTimeout(() => {
                    item.classList.add(item.dataset.animation);
                }, 70);
            });
        });
    }
}

Intersection.initAnimEvents();