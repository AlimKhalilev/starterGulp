--include("./polyfills/intersection-observer.js") // подключаем полифилл для полной работоспособности данного API

class Intersection {
    static observerOptions = {
        threshold: 0.5 // при каком объеме обхвата блока будет сработан слушатель
    };

    static animObserverCallback(entries) { // callback функция с настройками
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!entry.target.classList.contains("animated")) {
                    entry.target.classList.add("animated");
                    entry.target.classList.add(entry.target.dataset.animation);
                }
            }
        });
    }

    static animObserver = new IntersectionObserver(this.animObserverCallback, this.observerOptions);

    static initAnimEvents() {
        document.querySelectorAll("[data-animation]").forEach(item => {
            this.animObserver.observe(item);
        });
    }
}

Intersection.initAnimEvents();