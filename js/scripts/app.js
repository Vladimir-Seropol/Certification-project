// Объявляем переменные в глобальной области видимости
let input, recordsContainer;

// Функция для рендеринга приложения
function renderApp() {
  const app = document.getElementById("app");

  const container = document.createElement("div");
  container.className = "container";

  const addDiv = document.createElement("div");
  addDiv.className = "add";

  const title = document.createElement("h1");
  title.textContent = "T.R.A.N.S.L.I.T.";
  addDiv.appendChild(title);

  const inputContainer = document.createElement("div");
  inputContainer.className = "input-container";

  input = document.createElement("input");
  input.type = "text";
  input.id = "cyrillicInput";
  input.placeholder = "Начните вводить текст";

  const button = document.createElement("button");
  button.className = "add-button";
  button.id = "addButton";
  button.textContent = "Добавить";
  inputContainer.appendChild(input);
  inputContainer.appendChild(button);
  addDiv.appendChild(inputContainer);

  recordsContainer = document.createElement("div");
  recordsContainer.id = "recordsContainer";
  recordsContainer.className = "records-container";

  recordsContainer.appendChild(firstRecordDiv);

  addDiv.appendChild(recordsContainer);

  container.appendChild(addDiv);
  app.appendChild(container);

  // Обработчик события для кнопки добавления
  button.addEventListener("click", function () {
    addRecord();
  });

  // Обработчик события для нажатия клавиши
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addRecord();
    }
  });

  // Создаем изображение для удаления всех записей
const deleteAllImage = document.createElement("img");
deleteAllImage.src = "./images/delete.svg";
deleteAllImage.style.width = "20px";
deleteAllImage.style.height = "20px";
deleteAllImage.style.marginRight = "5px";

// Вставляем изображение после латинского текста
firstLatinText.appendChild(deleteAllImage);

// Создаем кнопку "Удалить все"
const deleteAllButton = document.createElement("button");
deleteAllButton.className = "delete-all-button";
deleteAllButton.textContent = "Удалить все";
deleteAllButton.id = "deleteAllButton";


// Вставляем изображение перед кнопкой
deleteAllButton.prepend(deleteAllImage);

// Добавляем обработчик события для кнопки "Удалить все"
deleteAllButton.addEventListener("click", function () {
  // Удаляем все записи из контейнера
  recordsContainer.innerHTML = "";
  recordsContainer.appendChild(firstRecordDiv);

});

// Добавляем кнопку в div для добавления записей
addDiv.appendChild(deleteAllButton);

// Добавляем div в основной контейнер приложения
container.appendChild(addDiv);
app.appendChild(container);
}

