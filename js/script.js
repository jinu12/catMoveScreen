const movingGifs = document.getElementsByClassName('movingGif');
const gifPositions = [];
const moveSpeeds = [];
const catBoxes = [];

for (let i = 0; i < movingGifs.length; i++) {
  gifPositions[i] = { x: 0, y: 0 };
  moveSpeeds[i] = { x: 1 + Math.random() * 3, y: 1 + Math.random() * 3 };
}

for (let i = 0; i < movingGifs.length; i++) {
  const gif = movingGifs[i];
  catBoxes.push({
    x: gif.offsetLeft,
    y: gif.offsetTop,
    width: gif.clientWidth,
    height: gif.clientHeight
  });
}

for (let i = 0; i < movingGifs.length; i++) {
  const gif = movingGifs[i];
  let positionX = gif.offsetLeft;
  let positionY = gif.offsetTop;

  positionX += moveSpeeds[i].x;
  positionY -= moveSpeeds[i].y;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (positionX < 0 || positionX + gif.clientWidth > windowWidth) {
    moveSpeeds[i].x = -moveSpeeds[i].x;
    positionX += moveSpeeds[i].x * 2;
  }

  if (positionY < 0 || positionY + gif.clientHeight > windowHeight) {
    moveSpeeds[i].y = -moveSpeeds[i].y;
    positionY -= moveSpeeds[i].y * 2;
  }

  gif.style.left = positionX + 'px';
  gif.style.top = positionY + 'px';

  catBoxes[i].x = positionX;
  catBoxes[i].y = positionY;
}

function checkCollisions() {
  for (let i = 0; i < catBoxes.length; i++) {
    // 충돌 검사할 고양이 이미지의 충돌 박스
    const box1 = catBoxes[i];

    for (let j = i + 1; j < catBoxes.length; j++) {
      // 충돌 검사할 다른 고양이 이미지의 충돌 박스
      const box2 = catBoxes[j];

      if (isColliding(box1, box2)) {
        // 두 고양이 이미지가 충돌하면 방향을 바꾸어 튕겨냅니다.
        const tempX = moveSpeeds[i].x;
        const tempY = moveSpeeds[i].y;
        moveSpeeds[i].x = moveSpeeds[j].x;
        moveSpeeds[i].y = moveSpeeds[j].y;
        moveSpeeds[j].x = tempX;
        moveSpeeds[j].y = tempY;

        // 충돌한 고양이 이미지를 다시 위치시킵니다.
        let positionX = catImages[i].offsetLeft;
        let positionY = catImages[i].offsetTop;
        positionX += moveSpeeds[i].x * 2;
        positionY -= moveSpeeds[i].y * 2;

        catImages[i].style.left = positionX + 'px';
        catImages[i].style.top = positionY + 'px';

        catBoxes[i].x = positionX;
        catBoxes[i].y = positionY;
      }
    }
  }
}

function moveGifs() {
    for (let i = 0; i < movingGifs.length; i++) {
      const gif = movingGifs[i];
      let positionX = gifPositions[i].x;
      let positionY = gifPositions[i].y;
  
      positionX += moveSpeeds[i].x;
      positionY -= moveSpeeds[i].y;
  
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
  
      const gifRect = {
        x: positionX,
        y: positionY,
        width: gif.clientWidth,
        height: gif.clientHeight
      };
  
      if (positionX < 0 || positionX + gif.clientWidth > windowWidth) {
        moveSpeeds[i].x = -moveSpeeds[i].x;
        positionX += moveSpeeds[i].x * 2;
      }
  
      if (positionY < 0 || positionY + gif.clientHeight > windowHeight) {
        moveSpeeds[i].y = -moveSpeeds[i].y;
        positionY -= moveSpeeds[i].y * 2;
      }
  
      const otherGifRects = gifPositions
        .slice(0, i)
        .concat(gifPositions.slice(i + 1))
        .map((position, index) => {
          return {
            x: position.x,
            y: position.y,
            width: movingGifs[index < i ? index : index + 1].clientWidth,
            height: movingGifs[index < i ? index : index + 1].clientHeight
          };
        });
  
      while (isCollidingWithAny(gifRect, otherGifRects)) {
        moveSpeeds[i].x = -moveSpeeds[i].x;
        moveSpeeds[i].y = -moveSpeeds[i].y;
        positionX += moveSpeeds[i].x * 2;
        positionY -= moveSpeeds[i].y * 2;
        gifRect.x = positionX;
        gifRect.y = positionY;
      }
  
      gif.style.left = positionX + 'px';
      gif.style.top = positionY + 'px';
  
      gifPositions[i] = { x: positionX, y: positionY };
    }
  
    requestAnimationFrame(moveGifs);
  }
  
  moveGifs();
  