window.onload = function () {

    const audio = document.getElementById("myAudio");
    const ikun = document.getElementsByClassName("person")[0]
    audio.src = "./back1.mp3"
    let Vitality = 100
    let timer = null
    let distance = 0


    // 进入游戏
    document.getElementsByClassName("play")[0].onclick = function () {
        document.getElementsByClassName("playBegin")[0].style.display = "none"
        audio.src = "./back" + (Math.floor(Math.random() * 3) + 1) + ".mp3"
        document.getElementsByClassName("playgame")[0].style.display = "block"
        Vitality = 100
        createLifeImg(Vitality)
        timer = setInterval(function () {
            let ballArray = createBallNum()
            for (let i = 0; i < ballArray.length; i++) {
                createBall(ballArray[i])
            }
            distance += 100
            document.getElementsByClassName("distance")[0].innerHTML = "得分：" + distance;
        }, 1500)
    }

    document.addEventListener("keydown", function (event) {
        let ikuntop = ikun.style.top == '' ? 163 : parseInt(ikun.style.top)
        let ikunLeft = ikun.style.left == '' ? 0 : parseInt(ikun.style.left)
        let steep = 40
        if (event.keyCode == 38 || event.keyCode == 87) {
            if (parseInt(ikuntop) > 1) {
                ikun.style.top = ikuntop - steep + "px"
            }
        } else if (event.keyCode == 40 || event.keyCode == 83) {
            if (parseInt(ikuntop) < 320) {
                ikun.style.top = ikuntop + steep + "px"
            }
        } else if (event.keyCode == 37 || event.keyCode == 65) {
            if (parseInt(ikunLeft) >= 0) {
                ikun.style.left = ikunLeft - steep + "px"
            }
        } else if (event.keyCode == 39 || event.keyCode == 68) {
            if (parseInt(ikunLeft) <= 820) {
                ikun.style.left = ikunLeft + steep + "px"
            }
        }
    })
    // 随机生成篮球
    function createBall(ballTop) {
        let ball = document.createElement("div")
        ball.className = "ball"
        let ballimg = document.createElement("img")
        ballimg.className = "ballimg"
        ballimg.src = "./image/篮球-removebg-preview.png"
        ball.appendChild(ballimg)
        ball.style.top = ballTop + "px"
        ball.style.left = "980px"
        document.getElementsByClassName("playgame")[0].appendChild(ball)
        ballAnimation(ball)
    }

    // 随机生成球的个数
    function createBallNum() {
        let i = Math.floor(Math.random() * 4) + 1
        let ballArray = []
        for (let index = 0; index < i; index++) {
            let ballTop = Math.floor(Math.random() * 5) * 80
            if (!ballArray.includes(ballTop)) {
                ballArray.push(ballTop)
            } else {
                index--
            }
        }
        return ballArray;
    }

    function ballAnimation(ball) {

        initialLeft = parseInt(ball.style.left);

        // 总的移动距离  
        let totalDistance = 1070;

        // 总时间（毫秒）  
        let totalTime = 3000;

        // 每帧移动的距离  
        let distancePerFrame = totalDistance / (totalTime / 16.667); // 假设每秒60帧  

        // 当前时间  
        var currentTime = 0;

        // 动画函数  
        function animate() {
            // 计算当前应该移动的距离  
            let distanceToMove = distancePerFrame * (currentTime / 16.667);

            // 如果已经移动了足够的距离，就停止动画  
            if (distanceToMove >= totalDistance) {
                // 如果小球的边碰到person则Vitality - 20
                ball.style.left = -80 + 'px';
                ball.parentNode.removeChild(ball); // 移除元素  
                return;
            }

            // 更新left值  
            ball.style.left = (initialLeft - distanceToMove) + 'px';

            // 更新当前时间  
            currentTime += 16.667;

            // 如果还有剩余时间，请求下一帧动画  
            if (currentTime < totalTime) {
                let ikun = document.getElementsByClassName("person")[0]
                if (areElementsColliding(ikun, ball)) {
                    Vitality -= 20;
                    createLifeImg(Vitality)
                    if (Vitality > 0) {
                        ball.parentNode.removeChild(ball); // 移除元素  
                    } else {
                        gameOver()
                    }
                }
                requestAnimationFrame(animate);
            }
        }

        // 开始动画  
        animate();
    }

    function gameOver() {
        audio.src = "./哎呦.mp3"
        audio.loop = false
        document.getElementsByClassName("playgame")[0].style.display = "none";
        clearInterval(timer);
        let gameoverDiv = document.createElement("div");
        gameoverDiv.className = "gameOver";
        let gameoverImg = document.createElement("img");
        gameoverImg.src = "./image/defeated.png";
        let gameoverBtn = document.createElement("button");
        gameoverBtn.className = "again";
        gameoverBtn.innerText = "重新开始";
        gameoverBtn.onclick = function () {
            window.location.reload();
        }
        let gameoverDistance = document.createElement("span");
        gameoverDistance.className = "distance";
        gameoverDistance.innerText = "分数：" + distance;
        gameoverDiv.appendChild(gameoverImg);
        gameoverDiv.appendChild(gameoverDistance);
        gameoverDiv.appendChild(gameoverBtn);
        document.getElementsByClassName("game-box")[0].appendChild(gameoverDiv);
    }

    function areElementsColliding(element1, element2) {
        let rect1 = element1.getBoundingClientRect();
        let rect2 = element2.getBoundingClientRect();

        // 检查rect1是否在rect2的左侧、右侧、顶部或底部之外  
        // 如果rect1在rect2的任何一边之外，则它们没有碰撞  
        return !(
            rect1.right < rect2.left - 5 ||
            rect1.left > rect2.right - 5 ||
            rect1.bottom < rect2.top - 5 ||
            rect1.top > rect2.bottom - 5
        );
    }

    // 生成生命值图片
    function createLifeImg(num) {
        num = num / 20
        document.getElementsByClassName("mark")[0].innerHTML = "";
        for (let i = 0; i < num; i++) {
            let img = document.createElement("img");
            img.src = "./image/tx.png"
            document.getElementsByClassName("mark")[0].appendChild(img);
        }
    }

}

