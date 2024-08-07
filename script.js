// script.js
document.addEventListener("DOMContentLoaded", function() {
    const tg = window.Telegram.WebApp;
    tg.ready();

    // Set isExpanded to true
    tg.expand();

    const greetingDiv = document.getElementById("greeting");
    const username = tg.initDataUnsafe?.user?.first_name || "Пользователь";
    const avatarUrl = tg.initDataUnsafe?.user?.photo_url || "";

    greetingDiv.innerHTML = `
        <div class="text">
            <span role="img" aria-label="wave">👋</span> Привет, ${username}!
        </div>
        <div class="avatar">
            ${avatarUrl ? `<img src="${avatarUrl}" alt="Avatar">` : ""}
        </div>
    `;


    const calculateBtn = document.getElementById("calculateBtn");
    const resetBtn = document.getElementById("resetBtn");
    const viewHistoryBtn = document.getElementById("viewHistoryBtn");
    const viewUserInfoBtn = document.getElementById("viewUserInfoBtn");
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");
    const backBtn = document.getElementById("backBtn");
    const backToCalcBtn = document.getElementById("backToCalcBtn");
    const resultDiv = document.getElementById("result");
    const historyList = document.getElementById("historyList");
    const userInfoList = document.getElementById("userInfoList");

    const calculatorScreen = document.getElementById("calculatorScreen");
    const historyScreen = document.getElementById("historyScreen");
    const userInfoScreen = document.getElementById("userInfoScreen");

    function updateHistory() {
        historyList.innerHTML = "";
        const history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
        history.forEach(entry => {
            const listItem = document.createElement("li");
            listItem.textContent = entry;
            historyList.appendChild(listItem);
        });
    }

    function updateUserInfo() {
        userInfoList.innerHTML = "";
        const user = tg.initDataUnsafe.user;
        const userInfo = [
            `Имя пользователя: ${user?.username || 'N/A'}`,
            `ID: ${user?.id || 'N/A'}`,
            `Полное имя: ${user?.first_name || ''} ${user?.last_name || ''}`,
            `Язык: ${tg.initDataUnsafe.language || 'N/A'}`,
            `Платформа: ${tg.initDataUnsafe.platform || 'N/A'}`
        ];

        userInfo.forEach(info => {
            const listItem = document.createElement("li");
            listItem.textContent = info;
            userInfoList.appendChild(listItem);
        });
    }

    // Handle mobile keyboard input and hide when done
    const inputFields = document.querySelectorAll('input[type="number"]');
    inputFields.forEach(input => {
        input.addEventListener("blur", function() {
            window.scrollTo(0, 0);  // Scroll to the top after input to hide keyboard
        });
    });

    calculateBtn.addEventListener("click", function() {
        const height = parseFloat(document.getElementById("height").value);
        const weight = parseFloat(document.getElementById("weight").value);

        if (height < 100 || height > 230 || weight < 30 || weight > 300) {
            tg.showPopup({
                title: "Ошибка ввода",
                message: "Пожалуйста, введите корректные значения для роста (100-230 см) и веса (30-300 кг).",
                buttons: [{
                    text: "Закрыть",
                    type: "close"
                }]
            });
            return;
        }

        const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
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

    viewUserInfoBtn.addEventListener("click", function() {
        updateUserInfo();
        calculatorScreen.style.display = "none";
        userInfoScreen.style.display = "block";
    });

    clearHistoryBtn.addEventListener("click", function() {
        localStorage.removeItem("bmiHistory");
        updateHistory();
    });

    backBtn.addEventListener("click", function() {
        historyScreen.style.display = "none";
        calculatorScreen.style.display = "block";
    });

    backToCalcBtn.addEventListener("click", function() {
        userInfoScreen.style.display = "none";
        calculatorScreen.style.display = "block";
    });
});
