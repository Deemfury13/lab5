// --- ЗАВДАННЯ 1: ВАЛІДАЦІЯ ФОРМИ ---
const form = document.getElementById('infoForm');
const resultBox = document.getElementById('result');
const output = document.getElementById('outputContent');

const patterns = {
    pib: /^[А-ЯІЄЇ][а-яієї']+\s[А-ЯІЄЇ]\.[А-ЯІЄЇ]\.$/, // Прізвище І.О.
    phone: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,           // (000)-000-00-00
    idCard: /^[А-ЯІЄЇ]{2}\s№\d{6}$/,                  // ТТ №000000
    faculty: /^[А-ЯІЄЇ]{2,4}$/,                       // ФІОТ
    birthday: /^\d{2}\.\d{2}\.\d{4}$/                 // 00.00.0000
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    let dataHtml = "";

    for (let key in patterns) {
        const input = document.getElementById(key);
        if (!patterns[key].test(input.value)) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
            dataHtml += `<p><b>${input.placeholder}:</b> ${input.value}</p>`;
        }
    }

    if (isValid) {
        output.innerHTML = dataHtml;
        resultBox.style.display = 'block';
    } else {
        resultBox.style.display = 'none';
        alert("Будь ласка, перевірте правильність заповнення полів.");
    }
});

// --- ЗАВДАННЯ 2: ТАБЛИЦЯ ---
const table = document.getElementById('myTable');
const variant = 5; // Ваш варіант
let counter = 1;

// Генерація таблиці 6x6
for (let i = 0; i < 6; i++) {
    let row = table.insertRow();
    for (let j = 0; j < 6; j++) {
        let cell = row.insertCell();
        cell.innerText = counter;
        
        if (counter === variant) {
            setupVariantCell(cell);
        }
        counter++;
    }
}

function getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function setupVariantCell(cell) {
    // 1. Наведення (випадковий колір)
    cell.addEventListener('mouseover', () => {
        cell.style.backgroundColor = getRandomColor();
    });

    // 2. Клік (колір з палітри)
    cell.addEventListener('click', () => {
        const color = document.getElementById('colorPicker').value;
        cell.style.backgroundColor = color;
    });

    // 3. Подвійний клік (головна діагональ)
    cell.addEventListener('dblclick', () => {
        const rows = table.rows;
        for (let i = 0; i < 6; i++) {
            // Головна діагональ: індекс рядка дорівнює індексу клітинки
            rows[i].cells[i].style.backgroundColor = cell.style.backgroundColor;
        }
    });
}