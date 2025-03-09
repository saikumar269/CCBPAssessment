let timer;
let isRunning = false;
let timeLeft = 0;


const timerDisplay = document.getElementById('timer-display');
const alertSound = document.getElementById('alert-sound');

document.getElementById('start-btn').addEventListener('click', startTimer);

document.getElementById('stop-btn').addEventListener('click', stopTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);

document.getElementById('short-break-btn').addEventListener('click', () => setMode(5 * 60));
document.getElementById('long-break-btn').addEventListener('click', () => setMode(15 * 60));

function setMode(minutes) {
    timeLeft = minutes * 60;
    updateDisplay();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                
                isRunning = false;
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 0;
    updateDisplay();
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = mode === 'pomodoro' ? 25 * 60 : (mode === 'short-break' ? 5 * 60 : 15 * 60);
    updateDisplay();
}

function updateDisplay() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
