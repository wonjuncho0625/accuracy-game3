const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const timerBar = document.getElementById('timerBar');
const gameOverDiv = document.getElementById('gameOver');
const finalScore = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');

let score = 0;
let time = 30;
let timerInterval;

function spawnTarget() {
    if (time <= 0) return;

    const target = document.createElement('div');
    target.classList.add('target');

    const maxX = window.innerWidth - 50;
    const maxY = window.innerHeight - 50;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    target.style.left = x + 'px';
    target.style.top = y + 'px';

    target.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = `점수: ${score}`;
        gameArea.removeChild(target);
        spawnTarget();
    });

    gameArea.appendChild(target);
}

function updateTimerBar() {
    const percent = (time / 30) * 100;
    timerBar.style.width = percent + '%';
    if (percent > 50) {
        timerBar.style.backgroundColor = 'green';
    } else if (percent > 20) {
        timerBar.style.backgroundColor = 'orange';
    } else {
        timerBar.style.backgroundColor = 'red';
    }
}

function startGame() {
    score = 0;
    time = 30;
    scoreDisplay.textContent = `점수: ${score}`;
    timerDisplay.textContent = time;
    gameArea.innerHTML = '';
    gameOverDiv.style.display = 'none';

    spawnTarget();

    timerInterval = setInterval(() => {
        time--;
        timerDisplay.textContent = time;
        updateTimerBar();
        if (time <= 0) endGame();
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    gameArea.innerHTML = '';
    finalScore.textContent = `최종 점수: ${score}`;
    gameOverDiv.style.display = 'block';
}

restartBtn.addEventListener('click', startGame);

// 게임 시작
startGame();
