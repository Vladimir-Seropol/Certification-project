// Создаем фиксированный элемент с номером 1
const firstRecordDiv = document.createElement("div");
firstRecordDiv.className = "record";
const firstCyrillicText = document.createElement("div");
firstCyrillicText.className = "cyrillic-text title-cyrillic-text ";
firstCyrillicText.textContent = "1 Привет👋🏻";
firstCyrillicText.style.borderRadius = "8px 0 0 0";

const firstLatinText = document.createElement("div");
firstLatinText.className = "latin-text title-latin-text";
firstLatinText.textContent = "Privet";

const deleteButtonBlock = document.createElement("div");
deleteButtonBlock.className = "img-delete title-img-delete";
deleteButtonBlock.style.borderRadius = "0 8px 0 0";

// Изображение
const deleteButtonImg = document.createElement("img");
deleteButtonImg.src = "./images/delete.svg";
deleteButtonImg.className = "img-delete";

firstRecordDiv.appendChild(firstCyrillicText);
firstRecordDiv.appendChild(firstLatinText);
firstRecordDiv.appendChild(deleteButtonBlock);
deleteButtonBlock.appendChild(deleteButtonImg);



// Функция для пересчета номеров записей
function updateRecordNumbers() {
    const records = recordsContainer.querySelectorAll(".record");

    // Обновляем порядковые номера
    records.forEach((record, index) => {
        const recordNumber = record.querySelector(".record-number");
        
        // Обновляем порядковый номер
        if (recordNumber) {
            recordNumber.textContent = index + 1;  
        }
    });
}

// Функция для добавления записи
function addRecord() {
    const inputValue = input.value.trim();

    if (inputValue) {
        const transliterated = transliterate(inputValue);

        const recordDiv = document.createElement("div");
        recordDiv.className = "record";

        // Полный текст для отображения в tooltip
        const fullCyrillicText = inputValue; 
        const fullLatinText = transliterated;

        // Обрезаем тексты
        const cyrillicText = document.createElement("div");
        cyrillicText.className = "cyrillic-text";
        const isCyrillicTruncated = truncateText(cyrillicText, fullCyrillicText);

        const latinText = document.createElement("div");
        latinText.className = "latin-text";
        const isLatinTruncated = truncateText(latinText, fullLatinText);

        // Создаем tooltip для каждого текста, если он обрезан
        const tooltipCyrillic = document.createElement("span");
        tooltipCyrillic.className = "tooltip";
        tooltipCyrillic.textContent = fullCyrillicText; 

        const tooltipLatin = document.createElement("span");
        tooltipLatin.className = "tooltip";
        tooltipLatin.textContent = fullLatinText; 

        // Добавляем tooltip, если текст обрезан
        if (isCyrillicTruncated) {
           
            cyrillicText.appendChild(tooltipCyrillic);     
        } 

        if (isLatinTruncated) {
            
            latinText.appendChild(tooltipLatin);        
        } 

        // Создаем кнопку для удаления
        const deleteButtonContainer = document.createElement("div");
        deleteButtonContainer.className = "delete-button-container";

        const deleteButton = document.createElement("img");
        deleteButton.src = "./images/delete.svg";
        deleteButton.alt = "Удалить";
        deleteButton.style.cursor = "pointer";
        deleteButton.addEventListener("click", function () {
            handleDeleteButtonClick(recordDiv);
        });

        deleteButtonContainer.appendChild(deleteButton);

        // Добавляем порядковый номер в record
        const numberElement = document.createElement("div");
        numberElement.className = "record-number";
        numberElement.textContent = recordsContainer.childElementCount + 1;  

        // Добавляем все элементы в recordDiv
        recordDiv.appendChild(numberElement); 
        recordDiv.appendChild(cyrillicText);
        recordDiv.appendChild(latinText);
        recordDiv.appendChild(deleteButtonContainer);

        // Добавляем запись в контейнер
        recordsContainer.appendChild(recordDiv);

        input.value = "";

        updateRecordNumbers(); 
    }
}

// Функция для удаления записи
function handleDeleteButtonClick(recordDiv) {
    recordsContainer.removeChild(recordDiv);
    updateRecordNumbers();  
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
