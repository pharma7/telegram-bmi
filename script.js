// script.js
document.addEventListener("DOMContentLoaded", function() {
    const tg = window.Telegram.WebApp;
    tg.ready();

    const greetingDiv = document.getElementById("greeting");
    const username = tg.initDataUnsafe?.user?.first_name || "Пользователь";
    greetingDiv.textContent = `Привет, ${username}!`;

    const calculateBtn = document.getElementById("calculateBtn");
    const resetBtn = document.getElementById("resetBtn");
    const viewHistoryBtn = document.getElementById("viewHistoryBtn");
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");
    const backBtn = document.getElementById("backBtn");
    const resultDiv = document.getElementById("result");
    const historyList = document.getElementById("historyList");

    const calculatorScreen = document.getElementById("calculatorScreen");
    const historyScreen = document.getElementById("historyScreen");

    function updateHistory() {
        historyList.innerHTML = "";
        const history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
        history.forEach(entry => {
            const listItem = document.createElement("li");
            listItem.textContent = entry;
            historyList.appendChild(listItem);
        });
    }

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

            const resultText = `Ваш ИМТ: ${bmi} (${category})`;
            resultDiv.textContent = resultText;

            // Save to history
            const history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
            history.push(resultText);
            localStorage.setItem("bmiHistory", JSON.stringify(history));
        } else {
            resultDiv.textContent = "Пожалуйста, введите корректные рост и вес.";
        }
    });

    resetBtn.addEventListener("click", function() {
        document.getElementById("height").value = "";
        document.getElementById("weight").value = "";
        resultDiv.textContent = "";
    });

    viewHistoryBtn.addEventListener("click", function() {
        updateHistory();
        calculatorScreen.style.display = "none";
        historyScreen.style.display = "block";
    });

    clearHistoryBtn.addEventListener("click", function() {
        localStorage.removeItem("bmiHistory");
        updateHistory();
    });

    backBtn.addEventListener("click", function() {
        historyScreen.style.display = "none";
        calculatorScreen.style.display = "block";
    });
});
