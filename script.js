const canvas = document.getElementById("test1");
const ctx = canvas.getContext("2d");
const particalArray = [];
let hue = 0;

const mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.addEventListener("click", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  //   drawCircle();
  for (let i = 0; i < 5; i++) {
    particalArray.push(new Partical());
  }
});

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  //   drawCircle();
  for (let i = 0; i < 2; i++) {
    particalArray.push(new Partical());
  }
});

// function drawCircle(e) {
//   ctx.fillStyle = "pink";
//   ctx.strokeStyle = "white";
//   ctx.lineWidth = 5;
//   ctx.beginPath();
//   ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
//   ctx.fill();
//   ctx.stroke();
// }

class Partical {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = "hsl(" + hue + ",100%, 50%)";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size -= 0.05;
  }
  draw() {
    ctx.fillStyle = this.color;
    // ctx.strokeStyle = "white";
    // ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    // ctx.stroke();
  }
}

// function init() {
//   for (let i = 0; i < 100; i++) {
//     particalArray.push(new Partical());
//   }
// }
// init();

function handlePartical() {
  for (let i = 0; i < particalArray.length; i++) {
    particalArray[i].update();
    particalArray[i].draw();

    for (let j = i; j < particalArray.length; j++) {
      const dx = particalArray[i].x - particalArray[j].x;
      const dy = particalArray[i].y - particalArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particalArray[i].color;
        ctx.lineWidth = particalArray[i].size/2;
        ctx.moveTo(particalArray[i].x, particalArray[i].y);
        ctx.lineTo(particalArray[j].x, particalArray[j].y);
        ctx.stroke();
      }
    }

    if (particalArray[i].size <= 0.2) {
      particalArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   drawCircle();
  //   ctx.fillStyle = "rgba(0,0,0,0.1)";
  //   ctx.fillRect (0, 0, canvas.width, canvas.height);
  handlePartical();
  hue++;
  requestAnimationFrame(animate);
}
animate();

console.log({ ctx });
