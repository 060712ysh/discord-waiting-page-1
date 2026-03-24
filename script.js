// 1. 載入遮罩邏輯
let loadPercent = 0;
const loader = document.getElementById('loader');
const loadLabel = document.getElementById('loader-text');

const loadInt = setInterval(() => {
    loadPercent += Math.floor(Math.random() * 15) + 5;
    if (loadPercent >= 100) {
        loadPercent = 100;
        clearInterval(loadInt);
        setTimeout(() => loader.style.display = 'none', 600);
    }
    loadLabel.innerText = `正在嘗試與導航員聯繫... ${loadPercent}%`;
}, 200);

// 2. 無限排隊倒數邏輯 (安撫功能)
let timeLeft = 30;
const bar = document.getElementById('bar');
const countdownLabel = document.getElementById('countdown');
const waitingMsg = document.getElementById('waiting-msg');

const countdownInt = setInterval(() => {
    timeLeft--;
    
    if (timeLeft <= 0) {
        // 重設時間，讓它永遠跑不完 (當機模擬)
        timeLeft = Math.floor(Math.random() * 15) + 15; 
        waitingMsg.innerText = "連線超時，正在重新獲取 Token...";
        bar.style.transition = "none";
        bar.style.width = "0%";
        setTimeout(() => { bar.style.transition = "width 1s linear"; }, 50);
    } else if (timeLeft === 15) {
        waitingMsg.innerText = "正在確認 Wumpus 是否還在睡覺...";
    }

    countdownLabel.innerText = timeLeft;
    let progress = ((30 - timeLeft) / 30) * 100;
    bar.style.width = Math.max(0, progress) + '%';
}, 1000);

// 3. 傳送訊息互動
document.getElementById('send-btn').addEventListener('click', () => {
    const input = document.getElementById('wumpus-input');
    const response = document.getElementById('chat-response');
    if (input.value.trim() !== "") {
        response.innerText = "訊息已傳送至虛空，Wumpus 露出了一個尷尬的微笑。";
        input.value = "";
        setTimeout(() => { response.innerText = ""; }, 3000);
    }
});

// 4. 手動修復互動
const repairBtn = document.getElementById('repair-btn');
repairBtn.addEventListener('click', () => {
    repairBtn.classList.add('shake');
    waitingMsg.innerText = "修復嘗試中：正在拔掉插頭再插回去...";
    setTimeout(() => {
        repairBtn.classList.remove('shake');
        waitingMsg.innerText = "錯誤 404：找不到插座，請繼續等待。";
    }, 1000);
});