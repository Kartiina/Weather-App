# Weather App

### Создание веб-приложения прогноз погоды ###
Проект был написан в процессе изучения языка JS. 
Для реализации данной идеи было использовано API прогноза погоды, собственный макет Figma и JS.
##
![First Screen](https://github.com/Kartiina/ScreenShots/blob/main/first.png "Start page")
>В зависимости от описания погоды в прогнозе подключается соответствующая иконка или иконка "Облачно" по умолчанию
>- Представление даты в виде: "23.06.2022" мне не нравилось, поэтому я решила переделать его в виде: "Четверг 23 Июня". Реализация с помощью функции:
```js
const getDate = () => {
    var now = new Date();
    var days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months =["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return days[now.getDay()] + " " + now.getDate() + " " + months[now.getMonth()];
}
```
>- Так как бесплатный API не предоставляет прогноз погоды на будущее, я реализовала рандомный подсчет градусов незначительно отличающийся от текущих и вставила различные картинки


#
![2nd Screen](https://github.com/Kartiina/ScreenShots/blob/main/change.png "If you want to change city")
Чтобы изменить место прогноза нужно нажать на название города и ввести новое в строку. 
>Если город введен неверно или не введен вовсе, прогноз останется тем же.
