![Логотип](https://alimkhalilev.github.io/starterGulp/dist/img/old/logo.webp)
# [starterGulp v1.3.1](https://alimkhalilev.github.io/starterGulp/dist/)

## Данная разработка является стартовой сборкой для вёрстки и разработки сайтов на базе Gulp 4.
____

### Требования:

<br>

> + **Node JS**: от v16.13.0;
> + **Python**: 2.7;
> + **NPM**: от 8.3.0.

### Какой функционал содержит данная сборка? (обновление от 01.04.2022)

<br>

> + Переход с commonJS на ES6 Modules (с require на import) (webpack);
> + html компоненты в отдельной папке
> + Автоматическая генерация шрифтов и scss файла стиля шрифта
> + Режимы разработки (**npm run fonts** (компиляция шрифтов), **npm run zip** (создание архива созданного билда), **npm run dev** (запуск в режиме разработчика), **npm run build** (запуск в режиме продакшена))
> + Префикс версии **_v=** скриптов и стилей для отключения кэша при обновлении собранного сайта

<br>

> + Разработка происходит в папке **src**;
> + Содержит основные логические папки, такие как:
>> + **fonts** - тут содержатся папки с шрифтами;
>> + **img** - изображения;
>> + **js** - содержит модули с названием, которое начинается с нижнего подчеркивания, основного файла **script.js**, а также папки **scripts**, в которой хранятся уже готовые минифицированные скрипты-библиотеки;
>> + **scss** - содержит модули с названием, которое начинается с нижнего подчеркивания, основного файла **style.scss**, папки **lib**, в которой хранятся обобщенные стили (**_colors.scss, grid.scss, fonts.scss** и так далее), а также папки **components**, где хранятся стили компонентов;
>> + **svg** - сюда закидываются иконки в формате **.svg**, которые в дальнейшем конвертируются в спрайты;
> + Используется компонентный подход верстки, а именно методология **БЭМ** в ее нотации **Two Dashes**, где модификатор отделяется двумя дефисами. Компоненты лежат [тут](https://alimkhalilev.github.io/starterGulp/starterGulp/components.html);
> + При вставке изображений они автоматически вставляются в тэг **picture**, в который вставляется дубликат изображения, однако в формате **webp**. *Пояснение: вы как обычно вставляете изображение в папку **img**, после чего Gulp сам автоматически сгенерирует **webp** версию изображения, которая в зависимости от поддержки браузера будет отображаться у пользователя*;
> + Используется модуль **gulp-file-include**, позволяющий вставлять отдельные модули через **@@include** в html, и **--include** в js;
> + Продакшн папка с файлами создается на одном уровне с **src** и именуется как сам проект;
> + Продакшн папка пересоздается в процессе перекомпиляции проекта

<br>

### CSS блок

<br>

> + Стили прописываются на языке **SCSS**, компилируются, минифицируются;
> + Файлы подключений начинаются с префикса. Прим. **_header.scss**;
> + Главный файл стилей, где собираются все стили проекта: **style.scss**;
> + Подключения производятся с помощью директивы SCSS **@import**;
> + Библиотеки SCSS лежат в *src/scss/lib* и подключаются в **style.scss**. Некоторые из них:
>> + **_mixins.scss** содержит в себе общие стили сайта;
>> + **_grid.scss** содержит в себе стили сетки для разных разрешений;
>> + **_colors.scss** содержит в себе все цвета, используемые на сайте;
>> + **_fonts.scss** содержит в себе функционал создания font-family различных шрифтов;
> + Отдельные компоненты SCSS лежат в *src/scss/components* и подключаются в **style.scss**

<br>

### JavaScript блок

<br>

> + Скрипты компилируются, минифицируются: **Uglify ES**;
> + Файлы подключений начинаются с префикса. Прим. **_webpsup.js**;
> + Вставка подключений в js применяется с помощью плагина **gulp-file-include (--include)**;
> + Главный файл скриптов, где собираются все скрипты проекта: **script.js**;
> + Исходный файлы **.min** скриптов хранятся в папке **scripts**. Из них:
>> + Используется **jquery.min.js v3.2.1**;
>> + Используется **lightslider.min.js** (библиотека для слайдеров);
>> + Используется **jquery-ui.min.js v1.12.1** (библиотека для ui компонентов);
>> + Используется **jquery.maskedinput.min.js** (библиотека для маски ввода в input);
>> + Используется **dropzone.min.js** (библиотека drag & drop input:file);
> + Из основных модулей используются:
>> + Используется **_burger.js** (плагин для использования бургер-меню);
>> + Используется **_modal.js** (плагин для создания модальных окон);
>> + Используется **_scroll.js** (плагин для скролла к якорю);
>> + Используется **_customSelect.js** (плагин для создания кастомного селест *(идет как компонент)*);
>> + Используется **_dropdown.js** (плагин для использования выпадающего меню (по клику или по наведению) *(идет как компонент)*);
>> + Используется **_details.js** (плагин для открывающегося списка *(идет как компонент)*);
>> + Используется **_passwordSwitcher.js** (плагин для переключателя *input:password* селест *(идет как компонент)*)

<br>

### HTML блок

<br>

> + Файлы подключений начинаются с префикса. Прим. **_header.html**;
> + Вставка кусков HTML производится с помощью плагина **gulp-file-include (@@include)**;
> + Основные шаблоны: head **_head.html**, шапка **_header.html**, подвал **_footer.html**, модальные окна **_modal.html**

<br>

### Изображения

<br>

> + Изображения минифицируются, оптимизируются, конвертируются в **webp**;
> + Поддержка гибкой системы изображений: **picture** тэг и CSS класс **.webp**;
> + *SVG* иконки вставляются в одноименную папку, а далее автоматически генерируются в спрайт. Он генерируется в папке **img** под названием **sprite.svg**.
> + Как его использовать? К примеру, если спрайт называется **arrow**, его можно использовать как:
``` HTML
<svg class="icon icon-arrow"><use xlink:href="img/sprite.svg#arrow"></use></svg>
```
> + Стилизовать такой спрайт можно через **font-size** (размер иконки), а также **fill** (её цвет). Желательно использовать иконки, которые при изменении свойства fill полностью ёё перекрашивают;
> + Если в дизайне такого не предусмотрено (если в дизайне нет таких иконок), то они вставляются вручную в файл **main.svg**, который основ на тэге **symbol**. Вставка svg иконок происходит с помощью тэга: **svg > use**

<br>

### Шрифты

<br>

> + Все исходные шрифты конвертируются в **woff** и **woff2**;
> + Подключаются с помощью миксина в файле **_fonts.scss**;
> + Шрифты желательно подключать именно таким образом, а не к примеру с *google.fonts*, так как это гарантируют автономность шрифтов на сайте

<br>

### Как работают модальные окна?

<br>

> + Создаем кнопку в любом месте html файла, далее задаем кнопке data атрибут **data-modal**, к примеру: **data-modal="modal_success"**
В файле **_modal.html** добавляем html структуру модального окна .modal с id, указанным в атрибуте **data-modal**
> + На элементах закрытия модального окна добавляем data атрибут **data-closeModal**
> + Если нужно открыть другое модальное окно, когда активно текущее, нужно воспользоваться data атрибутом **data-changeModal**, 
в аргумент которого вписать id окна, которого нужно открыть. Его нужно вписать в кнопку активации смены модального окна
> + В данной сборке используются 2 вида **.overlay**, один для модальных окон, другой для бургерного меню в моб. версии, дабы избежать конфликты

<br>

### Как работают слайдеры?

<br>

> + Чтобы создать слайдер, вам нужно создать контейнер для слайдера в html с дата атрибутом: прим. **data-slider="4,2,1"**
Числа внутри атрибута: кол-во элементов слайдера на различных разрешениях **(full hd, планшет, смартфон)**;
> + Более подробная информация в файле **_slider.js**

<br>

### Как работают кастомные select?

<br>
       
> + При добавлении на сайт тэга **select** с атрибутом **data-customSelect**, сборка автоматически создает новый экземпляр кастомного select. Однако стоит обернуть данный select в обертку с классом **c-select**. Более подробно можно посмотреть тут: [Ссылка на страницу компонентов starterGulp](https://alimkhalilev.github.io/starterGulp/starterGulp/components.html)
> + Стили к нему хранятся в **src/scss/components/_c-select.scss**
> + Скрипт с данной настройкой лежит в файле **_customSelect.js**

<br>

### Как работают якорные ссылки?

<br>

> + Для добавления необходимо прописать тэгу ссылки data атрибут, прим. **data-scroll=".section-scroll"**, внутри которого указатель селектор, куда нужно скроллить
> + В моб. адаптиве при открытом бургерном меню при клике на скролл элемент меню будет закрыто автоматически
> + В ссылке скролла ге обязательно убирать атрибут **href**, так как там все равно сработает **e.preventDefault()**
> + Для отключения того или иного плагина (к примеру selectric), 
нужно закомментировать подключение **@import в style.scss**, подключение **--include в script.js**,
а также при необходимости отключить подключение библиотеке в **_footer.html**

<br>

### Как работать в данной сборке?

<br>

> + При возможности везде использовать единицу **rem**, 
а в файле **_mixins.scss** регулировать базовый размер всех элементов на сайте через *media* запросы;
> + Везде использовать цвета исключительно из **_colors.scss**, также желательно и градиенты;
> + Стараться выносить общие стили в файл **_mixins.scss**, 
там прописываются стили в виде **.class-name**, в блоках использовать **.block__element--modificator**;
> + Анализ макета должен происходить не конвеерным способом *(верстаем все подряд сверху вниз)*, а должен разбиваться на отдельные компоненты для его повторного использования и модификации

____
<br>

### История обновлений:
> **1.2.1**
> + В медиа-запросах (_grid.scss) добавлен медиа **media_not_sm**
> + Добавлен модуль **adaptImg.js** для задания ширина изображений в **rem**
> + Добавлено ограничение по высоте в модальных окнах
> + Модули **(_modal.js, _burger.js, _scroll.js)** переписаны на классы
> + Убрана опция **document.ready() by jquery**, теперь в футере скрипты подключаются вместе с атрибутом **defer**, а все классы доступны прямо в консоли ( прим. **BurgerMenu.toggle();** )
> + Модуль **_details.js** доработан. Событие клика вешается на **.details__header**
> + Добавлена история обновлений в ReadMe
> + Изменен функционал модальных окон, теперь используется исключительно метод **show**, независимо от того, показано ли модальное окно на странице в момент его вызова, или нет (если показано, то оно закроет текущее и вызовет новое, если не показано, просто вызовет необходимое)
> + Доработан функционал бургер-меню, теперь при вызове на десктопе (когда не видно кнопки бургер-меню), метод **.toggle** покажет сообщение, что вызвать в текущем положении бургерное меню нельзя

> **1.2.2**
> + Переработана система анимаций, подключен модуль [animate.css](https://github.com/animate-css/animate.css). Подключение идет в основном файле "**style.scss**". Все основные анимации разбиты на модули и подключаются по мере использования из папки "**scss/animations**"
> + **%dev%**: версия разработки теперь прописывается в одном месте: **script.js**, и распространяется там, где есть класс **.version**
> + Добавлена система добавления анимация к проскролленным блокам через data атрибут animation (прим. **data-animation="bounce"**). Для реализации добавлен новый класс **Intersection** в **_intersection.js**. Система построена на API **IntersectionObserver**. Используется полифилл данного API, чтобы была более широкая кроссбраузерная поддержка. Пример использования на главно странице.

> **1.2.3**
> + В компоненты добавлен дополнительный вид инпута - **textarea** и его демо
> + Переработан **customSelect**, теперь его статус открытия содержится не в модификаторе класса (прим. &--open), а в отдельном атрибуте **open**.
> + В **_globals.js** добавлено событие по клику вне наблюдаемого элемента, привязка к атрибуту **[data-mouseLeave]**. На данный момент используется в основном на кастомных селектах, при потере фокуса на меню селекта.
> + Добавлен новый **contentSelect**, который в дальнейшем может заменить стандартный **customSelect**. Новый же в свою очередь не завсит от тэга **select**, и базируется на псевдо-радиокнопках, что даёт огромную гибкость в использовании. К примеру, в него можно помимо текста вставлять картинки и прочий контент. Новый contentSelect является аналогом customSelect, но более мощным инструментом.
> + Обновлён **_dropdown.js**, остался только один его вид - на клик, однако добавился функционал потери фокуса (использование **[data-mouseLeave]**. Упрощён код и переписан на чистый js)
> + Обновлён **contentSelect** и **customSelect**, добавлено состояние **selected disabled**

> **1.2.4**
> + Новый слайдер - **swiper**. Библиотека находится в папке **/js/scripts/swiper.min.js**, файл скрипта: **/js/_swiper.js**, стили: **/scss/lib/_swiper.scss**. Пример показан на главном экране. Слайдер взят с модуля [Swiper](https://swiperjs.com)
> + Обновлен файл **/scss/lib/fonts.scss**, добавлена ссылка на скачивание шрифтов, + демонстрация начертания шрифтов на примере шрифта **Gilroy**

> **1.3.0 (Крупное обновление)**
> + Полный переход на новую структуру Gulp сборщика, обновление пакетов
> + Добавлена возможность импортирования JS при помощи **webpack** (**es6 modules**)
> + Теперь html компоненты лежат в отдельной папке **html**
> + Пути до сурсов указываются через **@** (прим. **@img/cat.png**)
> + Добавлен префикс версии **_v=** скриптов и стилей для отключения кэша при обновлении собранного сайта
> + Автоматическая генерация шрифтов и scss файла стиля шрифта
> + Добавлены режимы разработки (**npm run fonts** (компиляция шрифтов), **npm run zip** (создание архива созданного билда), **npm run dev** (запуск в режиме разработчика), **npm run build** (запуск в режиме продакшена))
> + Добавлена карта scss при дебаге в браузере
> + Переход с авто спрайтов на старый **main.svg** и ручное добавление спрайтов (для полного контроля)

> **Доработка Select (1.3.0)**
> + добавлен autosize по самому большому элементу
> + z-index при открывании (накладывание)
> + title attr для элементов
> + overflow: hidden и text-overflow: ellipsis
> + добавлена max ширина
> + фикс кривого выбора ContentSelect при наличии нескольких элементов на странице

> **Прочие доработки (1.3.0)**
> + В кнопках и полях теперь **box-shadow: inset** вместо **border**
> + Переработана сетка, теперь состоит из **xl**, **md**, **sm**, **xs**
> + Для демонстрации сетки добавлена страница **Сетка, (gridDemo.html)**
> + Добавлен файл **/js/modules/plugins/gridSizes.js**, который должен быть идентичен размерам сетки из **/scss/lib/grid.scss**
> + Фикс выявленных недоработок в прошлых версиях, оптимизация модальных окон, иконок в инпутах (ховер), а также убраны тени в radio и checkbox

> **Доработки (1.3.1) (01.04.2022)**
> + Обновление данного файла **readme**, корректировка всех необходимых ссылок
> + Обновлена система высоты **body vh**, теперь берется адаптивная высота для учета url шторки в мобильных браузерах (прим. андроид браузеры, где при 100vh скроллится верхнее меню)
> + Фикс easterEgg, теперь у него **width: unset** чтобы не съезжала надпись
> + Изменены надписи в демо странице сетки **Сетка, (gridDemo.html)**, добавлены точные брейкпоинты в пикселях
> + Добавлена библиотека **fancybox**, позволяющая удобно выводить галереи. Добавлена новая секция **gallery** на главной странице с 3 изображениями.

## © 2022 TheChampGuess / starterGulp v1.3.1