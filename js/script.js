let canvas, ctx, w, h;
let balls = [];
let player = {
  x: 10,
  y: 10,
  width: 20,
  height: 20,
  color: 'red'
};
let mousePos;

window.onload = function init() {
  canvas = document.querySelector('#myCanvas');
  w = canvas.width;
  h = canvas.height;
  ctx = canvas.getContext('2d');

  //draw 10 balls
  balls = createBalls(10);

  //event listener for moving player with mouse
  canvas.addEventListener('mousemove', mouseMoved);

  mainLoop();
};

function mainLoop() {
  // clear the canvas
  ctx.clearRect(0, 0, w, h);

  // draw
  drawFilledRectangle(player);
  drawAllBalls(balls);
  drawNumberOfBallsAlive(balls);

  // move the objects
  moveAllBalls(balls);
  movePlayerWithMouse();

  // call frame movement
  requestAnimationFrame(mainLoop);
}

function mouseMoved(evt) {
  mousePos = getMousePos(canvas, evt);
}

function getMousePos(canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function movePlayerWithMouse() {
  if (mousePos !== undefined) {
    player.x = mousePos.x - player.width / 2;
    player.y = mousePos.y - player.height / 2;

  }
}

function createBalls(n) {
  let ballArray = [];

  for (let i = 0; i < n; i++) {
    let b = {
      x: w / 2,
      y: h / 2,
      radius: 5 + 30 * Math.random(), // 5 / 35
      speedX: -5 + 10 * Math.random(), // -5 / +5
      speedY: -5 + 10 * Math.random(), // -5 / +5
      color: getARandomColor(),
    };

    ballArray.push(b); //add random balls to array
  }
  return ballArray;
}

function getARandomColor() {
  let colors = ['red', 'blue', 'cyan', 'purple', 'pink', 'green', 'yellow'];

  let colorIndex = Math.round((colors.length - 1) * Math.random());

  let c = colors[colorIndex];
  return c;
}

function drawAllBalls(ballArray) {
  ballArray.forEach(function(b) {
    drawFilledCircle(b);
  });
}

function moveAllBalls(ballArray) {
  ballArray.forEach(function(b, index) {
    b.x += b.speedX;
    b.y += b.speedY;

    testCollisionBallWithWalls(b);
    testCollisionWithPlayer(b, index);
  });
}

function testCollisionBallWithWalls(b) {
  // horizontal bouncing
  if ((b.x + b.radius) > w) {
    b.speedX = -b.speedX;
    b.x = w - b.radius;
  } else if ((b.x - b.radius) < 0) {
    b.speedX = -b.speedX;
    b.x = b.radius;
  }

  // vertical bouncing
  if ((b.y + b.radius) > h) {
    b.speedY = -b.speedY;
    b.y = h - b.radius;
  } else if ((b.y - b.radius) < 0) {
    b.speedY = -b.speedY;
    b.y = b.radius;
  }
}

// Detecting collision between circle and rectangle

function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
  let testX = cx;
  let testY = cy;

  if (testX < x0) {
    testX = x0;
  }
  if (testX > (x0 + w0)) {
    testX = (x0 + w0);
  }
  if (testY < y0) {
    testY = y0;
  }
  if (testY > (y0 + h0)) {
    testY = (y0 + h0);
  }
  return (((cx - testX) * (cx - testX) + (cy - testY) * (cy - testY)) < r * r);
}

// Detecting collision between balls and player and remouve the ball which collided

function testCollisionWithPlayer(b, index) {
  if (circRectsOverlap(player.x, player.y, player.width, player.height, b.x, b.y, b.radius)) {
    balls.splice(index, 1);
  }
}

//Point counter - number of balls still in game. At 0 you win.

function drawNumberOfBallsAlive(balls) {
  ctx.save();
  ctx.font = '30px Arial';
  if (balls.length === 0) {
    ctx.fillText('YOU WIN', 20, 30);
  } else {
    ctx.fillText(balls.length, 20, 30);
  }
  ctx.restore();
}


function drawFilledRectangle(r) {
  ctx.save();
  // draw relative
  ctx.translate(r.x, r.y);
  ctx.fillStyle = r.color;
  ctx.fillRect(0, 0, r.width, r.height);
  ctx.restore();
}

function drawFilledCircle(c) {
  ctx.save();
  ctx.translate(c.x, c.y);
  ctx.fillStyle = c.color;
  ctx.beginPath();
  ctx.arc(0, 0, c.radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
}
