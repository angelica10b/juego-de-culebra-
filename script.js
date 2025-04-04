document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
  
    const modal = document.getElementById("gameOverModal");
    const restartBtn = document.getElementById("restartBtn");
  
    const gridSize = 20;
    let snake, direction, food, gameInterval;
  
    function iniciarJuego() {
      snake = [{ x: 160, y: 200 }];
      direction = "RIGHT";
      food = spawnFood();
      modal.style.display = "none";
      clearInterval(gameInterval);
      gameInterval = setInterval(update, 100);
    }
  
    document.addEventListener("keydown", changeDirection);
    restartBtn.addEventListener("click", iniciarJuego);
  
    function update() {
      const head = { ...snake[0] };
  
      switch (direction) {
        case "UP": head.y -= gridSize; break;
        case "DOWN": head.y += gridSize; break;
        case "LEFT": head.x -= gridSize; break;
        case "RIGHT": head.x += gridSize; break;
      }
  
      snake.unshift(head);
  
      if (head.x === food.x && head.y === food.y) {
        food = spawnFood();
      } else {
        snake.pop();
      }
  
      if (checkCollision(head)) {
        clearInterval(gameInterval);
        modal.style.display = "block"; // Mostrar el cuadro
      }
  
      draw();
    }
  
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      ctx.fillStyle = "red";
      ctx.fillRect(food.x, food.y, gridSize, gridSize);
  
      ctx.fillStyle = "lime";
      snake.forEach(segment =>
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize)
      );
    }
  
    function changeDirection(e) {
      const key = e.key;
      if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
      else if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
      else if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
      else if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    }
  
    function spawnFood() {
      const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
      const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
      return { x, y };
    }
  
    function checkCollision(head) {
      if (
        head.x < 0 || head.y < 0 ||
        head.x >= canvas.width || head.y >= canvas.height
      ) return true;
  
      return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
    }
  
    // Inicia el juego la primera vez
    iniciarJuego();
  });
  