const DEFAULT_VALUES = {
  sizes: { player: 25, foodSize: 15 },
  moveSpeed: 12,
  bulletSpeed: 10
};

class Tank {
  moveSpeed = DEFAULT_VALUES.moveSpeed;
  position = {
    x: 100,
    y: 100
  };

  draw() {
    noStroke();
    fill("#27ae60");
    circle(this.position.x, this.position.y, 50, 50);
  }

  move() {
    let deltaX = 0,
      deltaY = 0;

    if (keyIsDown(65)) deltaX = -5;
    if (keyIsDown(68)) deltaX = 5;
    if (keyIsDown(87)) deltaY = -5;
    if (keyIsDown(83)) deltaY = 5;

    const { x, y } = this.position;

    this.position = {
      x: x + deltaX,
      y: y + deltaY
    };
  }

  shoot() {
    let lengthX = mouseX - this.position.x,
      lengthY = mouseY - this.position.y;

    const baseSpeed = Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2));
    const multiplier = baseSpeed / DEFAULT_VALUES.bulletSpeed;

    lengthX = lengthX / multiplier;
    lengthY = lengthY / multiplier;

    bullets.push(
      new Bullet(this.position.x, this.position.y, lengthX, lengthY)
    );
  }
}

class Bullet {
  position = {
    x: 0,
    y: 0
  };
  speed = {
    x: 0,
    y: 0
  };

  constructor(startX, startY, speedX, speedY) {
    this.position = { x: startX, y: startY };
    this.speed = { x: speedX, y: speedY };
  }

  update() {
    const { x, y } = this.position;

    this.position = {
      x: x + this.speed.x,
      y: y + this.speed.y
    };
  }

  draw() {
    const { x, y } = this.position;
    fill("#444");
    circle(x, y, 15, 15);
  }
}

let player = new Tank();
let bullets = [];

function setup() {
  createCanvas(600, 600);
  player = new Tank();
  bullets = [];
}

function draw() {
  background("#fff");

  bullets.forEach(b => {
    b.update();
    b.draw();
  });

  player.move();
  player.draw();
}

function keyIsPressed() {
  player.move(10, 10);
}

function mouseClicked() {
  player.shoot();
}
