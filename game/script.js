score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("key code is:", e.keyCode);

    if (e.keyCode === 38) {
        const dino = document.querySelector('.dino');
        dino.classList.add('animatedino');

        setTimeout(() => {
            dino.classList.remove('animatedino');
        }, 700);
    }

    if (e.keyCode === 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX + 112) + "px";
    }

    if (e.keyCode === 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    if (offsetX < 115 && offsetY < 50) {
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('animateobs');
        audiogo.play();
        audio.pause();
        setTimeout(() => {
            audiogo.pause();
        }, 1000);
    }
    else if (offsetX < 150 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            animaDuration = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDuration = animaDuration - 0.1;
            obstacle.style.animaDuration = newDuration + 's';
        }, 500);
    }
}, 10);

function updateScore(score) {
    scorecount.innerHTML = "Your score: " + score
}