function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener("DOMContentLoaded", (event) => {
  let canvas = document.querySelector("#playground");
  let ctx = canvas.getContext("2d");

  // functions loop
  // array obj
  let towers = [];
  towers[0] = new Tower(200, rnd(50, 250));
  towers[1] = new Tower(400, rnd(50, 250));
  towers[2] = new Tower(600, rnd(50, 250));
  towers[3] = new Tower(800, rnd(50, 250));
  towers[4] = new Tower(1000, rnd(50, 250));
  //
  const flappy = new Flappy(50, 200);
  animate();
  flappy.move();

  // loop
  function animate() {
    // clear
    ctx.clearRect(0, 0, 500, 400);
    //update
    flappy.flapupdate(towers);
    for (let i = 0; i < towers.length; i++) {
      towers[i].move();
    }

    for (let i = 0; i < towers.length; i++) {
      towers[i].update();
    }

    // draw
    for (let i = 0; i < towers.length; i++) {
      towers[i].draw(ctx);
    }
    flappy.draw(ctx);
    // timeout
    setTimeout(animate, 30);
  }
});

class Tower {
  #height;
  #x;
  #y = 0;
  #gap = 100;
  #speed;

  constructor(x, height, speed = 1) {
    this.#height = height;
    this.#x = x;
    this.#speed = speed;
  }

  get x() {
    return this.#x;
  }
  get y() {
    return this.#y;
  }
  get gap() {
    return this.#gap;
  }
  get height() {
    return this.#height;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.#x, this.#y, 10, this.#height);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();

    // onder
    ctx.beginPath();
    ctx.rect(
      this.#x,
      this.#height + this.#gap,
      10,
      400 - this.#height - this.#gap
    );
    // ctx.rect(x,y,w,h);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
  //
  move() {
    this.#x = this.#x - 1 * this.#speed;
  }

  update() {
    if (this.#x <= 0) {
      // voorbij de edge
      let a = Tower.counter;
      this.#x = a;
    }
  }

  static counter = 1000;
  incrcount() {
    Tower.counter = Tower.counter + 200;
    console.log(Tower.counter);
  }
}

class Flappy {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.#x, this.#y, 10, 0, 360, false);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }

  move() {
    document.addEventListener("keydown", (event) => {
      //
      if (event.key == "ArrowUp") {
        // up
        this.#y = this.#y - 30;
      }
    });
  }

  flapupdate(towers) {
    this.#y = this.#y + 2;
    // collision
    if (this.#y >= 400) {
      // dead
      document.querySelector("#playground").style.display = "none";
      document.querySelector("#gameover").innerHTML = "GAME OVER NOOB";
    }
    for (let i = 0; i < towers.length; i++) {
      if (
        (this.#x == towers[i].x && this.#y < towers[i].height) ||
        (this.#x == towers[i].x && this.#y > towers[i].height + 100)
      ) {
        console.log("hit");
        document.querySelector("#playground").style.display = "none";
        document.querySelector("#gameover").innerHTML = "GAME OVER NOOB";
      } //
    }
  }
}
