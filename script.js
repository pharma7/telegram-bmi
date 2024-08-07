// script.js
document.addEventListener("DOMContentLoaded", function() {
    // Telegram Mini App Initialization
    const tg = window.Telegram.WebApp;
    tg.ready();

    // Greet user with their Telegram username
    const greetingDiv = document.getElementById("greeting");
    const username = tg.initDataUnsafe?.user?.first_name || "Пользователь";
    greetingDiv.textContent = `Привет, ${username}!`;

    const calculateBtn = document.getElementById("calculateBtn");
    const resetBtn = document.getElementById("resetBtn");
    const resultDiv = document.getElementById("result");

    calculateBtn.addEventListener("click", function() {
        const height = parseFloat(document.getElementById("height").value) / 100;
        const weight = parseFloat(document.getElementById("weight").value);

        if (height >= 1 && height <= 2.3 && weight >= 30 && weight <= 300) {
            const bmi = (weight / (height * height)).toFixed(2);
            let category = "";

            if (bmi < 18.5) {
                category = "Недостаточный вес";
            } else if (bmi >= 18.5 && bmi < 24.9) {
                category = "Нормальный вес";
            } else if (bmi >= 25 && bmi < 29.9) {
                category = "Избыточный вес";
            } else {
                category = "Ожирение";
            }

            resultDiv.textContent = `Ваш ИМТ: ${bmi} (${category})`;
        } else {
            resultDiv.textContent = "Пожалуйста, введите корректные рост и вес.";
        }
    });

    resetBtn.addEventListener("click", function() {
        document.getElementById("height").value = "";
        document.getElementById("weight").value = "";
        resultDiv.textContent = "";
    });
});
