// Создаем фиксированный элемент с номером 1
const firstRecordDiv = document.createElement("div");
firstRecordDiv.className = "record";
const firstCyrillicText = document.createElement("div");
firstCyrillicText.className = "cyrillic-text";
firstCyrillicText.textContent = "1 Привет👋🏻"; 
firstCyrillicText.style.borderRadius = "8px 0 0 0";

const firstLatinText = document.createElement("div");
firstLatinText.className = "latin-text";
firstLatinText.textContent = "Privet"; 


const deleteButtonBlock = document.createElement("div");
deleteButtonBlock.className = "img-delete";
deleteButtonBlock.style.borderRadius = "0 8px 0 0";

// Изображение
const deleteButtonImg = document.createElement("img");
deleteButtonImg.src = "./images/delete.svg";
deleteButtonImg.className = "img-delete";

firstRecordDiv.appendChild(firstCyrillicText);
firstRecordDiv.appendChild(firstLatinText);
firstRecordDiv.appendChild(deleteButtonBlock);
deleteButtonBlock.appendChild(deleteButtonImg);


// Функция для пересчета и обновления номеров всех записей
function updateRecordNumbers() {
    const records = recordsContainer.querySelectorAll(".record");
    records.forEach((record, index) => {
        const cyrillicText = record.querySelector(".cyrillic-text");
        const tooltipCyrillic = cyrillicText.querySelector(".tooltip");

        // Удаляем старый tooltip перед пересчётом
        if (tooltipCyrillic) {
            cyrillicText.removeChild(tooltipCyrillic);
        }

        // Обновляем текст и добавляем tooltip, если текст обрезан
        const updatedText = `${index + 1} ${cyrillicText.textContent.split(' ').slice(1).join(' ')}`;
        cyrillicText.textContent = updatedText;

        const isCyrillicTruncated = truncateText(cyrillicText, updatedText);
        if (isCyrillicTruncated) {
            const newTooltip = document.createElement("span");
            newTooltip.className = "tooltip";
            newTooltip.textContent = updatedText.split(' ').slice(1).join(' ');
            cyrillicText.appendChild(newTooltip);
        }
    });
}

// Обработчик события для удаления записи
function handleDeleteButtonClick(recordDiv) {
    recordsContainer.removeChild(recordDiv);
    updateRecordNumbers(); 
}

// Функция для добавления записи
function addRecord() {
    const inputValue = input.value.trim();

    if (inputValue) {
        const transliterated = transliterate(inputValue);

        const recordDiv = document.createElement("div");
        recordDiv.className = "record";

        
        const cyrillicText = document.createElement("div");
        cyrillicText.className = "cyrillic-text";
        cyrillicText.textContent = `${recordsContainer.childElementCount + 1} ${inputValue}`;

      
        const latinText = document.createElement("div");
        latinText.className = "latin-text";
        latinText.textContent = transliterated;

        // Обрезаем тексты
        const isCyrillicTruncated = truncateText(cyrillicText, `${recordsContainer.childElementCount + 1} ${inputValue}`);
        const isLatinTruncated = truncateText(latinText, transliterated);

       
        const tooltipCyrillic = document.createElement("span");
        tooltipCyrillic.className = "tooltip";
        tooltipCyrillic.textContent = inputValue;

      
        const tooltipLatin = document.createElement("span");
        tooltipLatin.className = "tooltip";
        tooltipLatin.textContent = transliterated;

        // Добавляем всплывающее окно в элементы текста, если они обрезаны
        if (isCyrillicTruncated) {
            cyrillicText.appendChild(tooltipCyrillic);
        }

        if (isLatinTruncated) {
            latinText.appendChild(tooltipLatin);
        }

        // Показываем tooltip при наведении на блок record
        recordDiv.addEventListener("mouseenter", function () {
            if (isCyrillicTruncated) {
                tooltipCyrillic.style.display = "block";
            }
            if (isLatinTruncated) {
                tooltipLatin.style.display = "block";
            }
        });

        recordDiv.addEventListener("mouseleave", function () {
            if (isCyrillicTruncated) {
                tooltipCyrillic.style.display = "none";
            }
            if (isLatinTruncated) {
                tooltipLatin.style.display = "none";
            }
        });

        // Создаем отдельный div для кнопки удаления
        const deleteButtonContainer = document.createElement("div");
        deleteButtonContainer.className = "delete-button-container";

        // Изображение для удаления
        const deleteButton = document.createElement("img");
        deleteButton.src = "./images/delete.svg";
        deleteButton.alt = "Удалить";
        deleteButton.style.cursor = "pointer";

        deleteButton.addEventListener("click", function () {
            handleDeleteButtonClick(recordDiv);
        });

        // Добавляем изображение в контейнер
        deleteButtonContainer.appendChild(deleteButton);

        // Добавляем все элементы в recordDiv
        recordDiv.appendChild(cyrillicText);
        recordDiv.appendChild(latinText);
        recordDiv.appendChild(deleteButtonContainer);

        // Добавляем запись в контейнер
        recordsContainer.appendChild(recordDiv);

        input.value = "";

        updateRecordNumbers(); 
    }
}

// Функция для обрезки текста и добавления многоточия
function truncateText(element, text) {
    const maxLength = 12; 
    if (text.length > maxLength) {
        element.textContent = text.substring(0, maxLength) + "...";
        return true;
    }
    element.textContent = text;
    return false;
}


renderApp();