function main() {
  const canvas = document.getElementById("myCanvas"); // Assuming 'myCanvas' is the ID of your canvas
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);
  class Bar {
    constructor(x, y, width, height, color, index) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.index = index;
    }

    update(micInput) {
      this.height = micInput * 1000;
    }

    draw(context) {
      context.strokeStyle = this.color;
      context.save();

      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(this.index);
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(10, this.height);
      context.stroke();

      context.restore();
    }
  }

  const bars = []; // Changed 'Bars' to start with an empty array
  let barsWidth = canvas.width / 256;

  function createBars() {
    for (let i = 0; i < 256; i++) {
      let color = "hsl(" + i * 2 + ",100%,50%)";
      bars.push(new Bar(i * barsWidth, canvas.height / 2, 1, 20, color, i)); // Adjusted position and size of bars
    }
  }
  createBars();
  console.log(bars);

  function animate() {
    if (microphone.initialized) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Generates audio samples from microphone
      const samples = microphone.getSamples();
      // Animates bars based on microphone data
      bars.forEach(function (bars, i) {
        bars.update(samples[i]);
        bars.draw(ctx);
      });
    }
    requestAnimationFrame(animate);
  }
  animate();
}

window.onload = main;