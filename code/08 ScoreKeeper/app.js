// p1 和 p2 直接做为两个object, 分别为button和display的number!
const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}
const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}
// reset button 也需要click event
const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');
let winningScore = 3;
let isGameOver = false;

// 必须传入两个param, 才能做到同时改变, 或者把opponent也作为一个object property
function updateScores(player, opponent) {
    // isGameOver的情况下, 虽然disable了, 但是click还是有反应的
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            // disable false能够让两个button都失效
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
}


p1.button.addEventListener('click', function () {
    updateScores(p1, p2)
})
p2.button.addEventListener('click', function () {
    updateScores(p2, p1)
})

// 不管什么时候, change winning score, 会直接开始
winningScoreSelect.addEventListener('change', function () {
    // 这个score不用显示, 只在js里改变即可
    winningScore = parseInt(this.value);
    reset();
})

// reset button 只要reset to 0, 移除button的disabled, 颜色改回来即可
resetButton.addEventListener('click', reset)

function reset() {
    isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}
