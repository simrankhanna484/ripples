
///////THIS IS W CIRCLESSSS RIPPLE

const canvas = document.getElementById("rippleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const clickSound = new Audio('water-drop-plop-betacut-1-00-01.mp3');

const ripples = [];


const colors = [
  "rgba(255, 99, 71, 0.7)", 
  "rgba(144, 238, 144, 0.7)", 
  "rgba(135, 206, 250, 0.7)", 
  "rgba(255, 223, 186, 0.7)"  
];


class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.alpha = 1.5; 
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = this.color.replace("0.9", this.alpha.toFixed(2)); 
    ctx.lineWidth = 1.5 + this.radius * 0.02; 
    ctx.stroke();
  }

  update() {
    this.radius += 2; 
    this.alpha -= 0.01; 
  }
}


function drawGrid() {
  ctx.beginPath();
  const gridSize = 30;

  for (let x = 0; x < canvas.width; x += gridSize) {
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.0)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x, y, gridSize, gridSize);
    }
  }
  ctx.closePath();
}


function generateRandomRipples() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  ripples.push(new Ripple(x, y));
}


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  ripples.forEach((ripple, index) => {
    ripple.draw();
    ripple.update();


    if (ripple.alpha <= 0) {
      ripples.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}


canvas.addEventListener("click", (event) => {
  ripples.push(new Ripple(event.clientX, event.clientY));
  clickSound.play();
});


setInterval(() => {
  generateRandomRipples();
}, 500);


window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


animate();

