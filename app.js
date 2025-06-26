/**
    
    Дж С - при нажатии на кнопку меняется текст
    это как с тоглом при переключении тарифных планов
    событие - change

    То есть при клике на день - появляется данные  дня
    неделя - данные недели
    месяц - данные месяца

    то есть переключение - как переключение пунктов меню по очереди 
    то есть в одном добавляется класс active - в другом убирается

    попробуем сделать перелючение кнопок по очереди

    -->
 */

async function loadJson(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error loading JSON ${error.message}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadJson("data.json")
    .then((data) => {
      // console.log(('JSON data loaded:', data));
      const dashboard = document.querySelector(".dashboard");
      data.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("dashboard__main");
        div.setAttribute("data-label", `${item.title}`);
        div.innerHTML = `
<div class="${item.title}">
        <div class="images"></div>
    <div class="content">
        <div class="content-up">
            <p>${item.title}</p>
            <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                  fill="#BBC0FF"
                  fill-rule="evenodd"
                />
            </svg>
        </div>
        <div class="content-down current-daily active">
            <h4>${item.timeframes.daily.current}hrs</h4>
            <p>Last Week - ${item.timeframes.daily.previous}hrs</p>
        </div>
        <div class="content-down current-weekly">
            <h4>${item.timeframes.weekly.current}hrs</h4>
            <p>Last Week - ${item.timeframes.weekly.previous}hrs</p>
        </div>
        <div class="content-down current-monthly">
            <h4>${item.timeframes.monthly.current}hrs</h4>
            <p>Last Week - ${item.timeframes.monthly.previous}hrs</p>
        </div>
    </div>
</div>                 
                `;
        dashboard.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Error loading data:", error);
    });
});

// переменная для кнопок переключения день-неделя-месяц
const timeframes = document.querySelectorAll(".dashboard-avatar-nav button");


timeframes.forEach((timeframe, index) => {
  timeframe.addEventListener("click", (event) => {
    timeframes.forEach((timeF) => timeF.classList.remove("active"));
    timeframe.classList.add("active");

    const period = timeframe.getAttribute("data-period");

    document.querySelectorAll(".content-down").forEach((item) => {
      item.classList.remove("active");
    });
    document.querySelectorAll(`.current-${period}`).forEach((block) => {
      block.classList.add("active");
    });
  });
});

/**
 * Есть три кнопки - День, Неделя, Месяц и при нажатии на каждую необходимо, есть три дива с данныем за День, Неделю и Месяц, и нобходимо, чтобы каждая выводила на экран данные за День, Неделю и Месяц соответственно
 */


