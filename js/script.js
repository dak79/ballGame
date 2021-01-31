let canvas, ctx, w, h;
let balls = [];
let player = {
  x: 10,
  y: 10,
  width: 20,
  height: 20,
  color: 'red'
};

window.onload = function init() {
  canvas = document.querySelector('#myCanvas');
  w = canvas.width;
  h = canvas.height;
  ctx = canvas.getContext('2d');

  //draw 10 balls
  balls = createBalls(10);

  mainLoop();
};

function mainLoop() {
  // clear the canvas
  ctx.clearRect(0, 0, w, h);

  // draw
  drawFilledRectangle(player);
  drawAllBalls(balls);

  // move the objects
  moveAllBalls(balls);

  // call frame movement
  requestAnimationFrame(mainLoop);
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
  let colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
  ];

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
  ballArray.forEach(function(b) {
    b.x += b.speedX;
    b.y += b.speedY;

    testCollisionBallWithWalls(b);
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
