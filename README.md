![Логотип](https://alimkhalilev.github.io/starterGulp/starterGulp/img/logo.webp)
# [starterGulp v1.2.1](https://alimkhalilev.github.io/starterGulp/starterGulp/)

## Данная разработка является стартовой сборкой для вёрстки и разработки сайтов на базе Gulp 4.
____

### Какой функционал содержит данная сборка?

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

## © 2021 TheChampGuess / starterGulp v1.2.1