// Создаем фиксированный элемент с номером 1
const firstRecordDiv = document.createElement("div");
firstRecordDiv.className = "record";

// Создаем блок для отображения номера записи
const firstRecordNumber = document.createElement("div");
firstRecordNumber.className = "record-number";
firstRecordNumber.textContent = "1"; 
firstRecordNumber.style.borderRadius = "8px 0 0 0"; 

// Создаем текст на кириллице
const firstCyrillicText = document.createElement("div");
firstCyrillicText.className = "cyrillic-text";
firstCyrillicText.textContent = "Привет👋🏻";


// Создаем текст на латинице
const firstLatinText = document.createElement("div");
firstLatinText.className = "latin-text";
firstLatinText.textContent = "Privet";

// Создаем блок для кнопки удаления
const deleteButtonBlock = document.createElement("div");
deleteButtonBlock.className = "img-delete";
deleteButtonBlock.style.borderRadius = "0 8px 0 0";  

// Создаем изображение для кнопки удаления
const deleteButtonImg = document.createElement("img");
deleteButtonImg.src = "./images/delete.svg";
// deleteButtonImg.className = "img-delete";

// Собираем элементы в родительский блок для фиксированной записи
firstRecordDiv.appendChild(firstRecordNumber);  
firstRecordDiv.appendChild(firstCyrillicText);
firstRecordDiv.appendChild(firstLatinText);
firstRecordDiv.appendChild(deleteButtonBlock);
deleteButtonBlock.appendChild(deleteButtonImg);



// Функция для пересчета номеров записей 
function updateRecordNumbers() {
    const records = recordsContainer.querySelectorAll(".record");

    records.forEach((record, index) => {
        // Игнорируем фиксированный элемент (с номером 1)
        if (record === firstRecordDiv) return;

        const recordNumber = record.querySelector(".record-number");
        const deleteButtonContainer = record.querySelector(".delete-button-container");

        if (recordNumber) {
            recordNumber.textContent = index + 1;  
          
            if (index === records.length - 1) {
                recordNumber.style.borderRadius = "0 0 0 8px "; 
            } else {
                recordNumber.style.borderRadius = "0 ";  
            }
        }

        if (deleteButtonContainer) {
            
            if (index === records.length - 1) {
                deleteButtonContainer.style.borderRadius = "0 0 8px 0";  
            } else {
                deleteButtonContainer.style.borderRadius = "0";  
            }
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

        const fullCyrillicText = inputValue;
        const fullLatinText = transliterated;

        const cyrillicText = document.createElement("div");
        cyrillicText.className = "cyrillic-text";
        const isCyrillicTruncated = truncateText(cyrillicText, fullCyrillicText);

        const latinText = document.createElement("div");
        latinText.className = "latin-text";
        const isLatinTruncated = truncateText(latinText, fullLatinText);

        const tooltipCyrillic = document.createElement("span");
        tooltipCyrillic.className = "tooltip";
        tooltipCyrillic.textContent = fullCyrillicText;

        const tooltipLatin = document.createElement("span");
        tooltipLatin.className = "tooltip";
        tooltipLatin.textContent = fullLatinText;

        if (isCyrillicTruncated) {
            cyrillicText.appendChild(tooltipCyrillic);
        }

        if (isLatinTruncated) {
            latinText.appendChild(tooltipLatin);
        }

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

        const numberElement = document.createElement("div");
        numberElement.className = "record-number";
        numberElement.textContent = recordsContainer.childElementCount + 1;

        recordDiv.appendChild(numberElement);
        recordDiv.appendChild(cyrillicText);
        recordDiv.appendChild(latinText);
        recordDiv.appendChild(deleteButtonContainer);

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

// Функция для обрезки текста
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
