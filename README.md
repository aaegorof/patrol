This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Сборка проекта Локально и Продакшен

Находясь внутри папки запустить, установит все зависимости:
### `yarn install`
<br />

Для тестирования запускаем локально [http://localhost:3000](http://localhost:3000)
### `yarn start`
<br />

Для продакшена – запустить, это соберет папку `build`.
### `yarn build`


## Интеграция с Вашей Темой В WordPress

По дефолту стоит путь для продакшен сборки `/wp-content/themes/twentyseventeen/build` <br>

Его можно менять в `package.json:home` 

Это значит, что надо положить папку build (Если папки нет, то собрать проект, смотри выше) в активную тему WordPress <br>

После чего надо заменить файл `front-page.php` в корне вашей темы (Если нет, то создать) 
на файл `index.html` ,который собирается после `yarn build` или `npm run build` 
