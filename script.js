<script>
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");

    let timeInSeconds = 0;
    if (type === "soft") timeInSeconds = 5 * 60;       // 5 min
    else if (type === "medium") timeInSeconds = 7 * 60; // 7 min
    else if (type === "hard") timeInSeconds = 10 * 60;  // 10 min

    const timerDisplay = document.getElementById("timer");
    const container = document.getElementById("timerContainer");
    const content = document.getElementById("timerContent");
    let timerInterval;

    function startTimer() {
      updateDisplay();
      timerInterval = setInterval(() => {
        if (timeInSeconds <= 0) {
          clearInterval(timerInterval);
          showEggReadyMessage();
          return;
        }
        timeInSeconds--;
        updateDisplay();
      }, 1000);
    }

    function updateDisplay() {
      let minutes = Math.floor(timeInSeconds / 60);
      let seconds = timeInSeconds % 60;
      timerDisplay.textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // ✅ FIXED Cancel button function
    function cancelTimer() {
      clearInterval(timerInterval);
      timerDisplay.textContent = "00:00";

      // Safely go to home page
      if (window.location.origin === "null" || window.location.origin === "file://") {
        // If opened locally from your computer
        window.location.replace("./home.html");
      } else {
        // If hosted online
        window.location.href = "home.html";
      }
    }

    // ✨ Visual reminder when time finishes
    function showEggReadyMessage() {
      content.innerHTML = `
        <h1>🥚 Your Egg is Ready! 🥚</h1>
        <p>Time’s up! Enjoy your perfectly cooked egg.</p>
        <div style="margin-top: 20px;">
          <button class="home-btn" onclick="goHome()">Home</button>
          <button class="cancel-btn" onclick="restartTimer()">Restart</button>
        </div>
      `;

      // Flash background color
      let flash = true;
      const flashInterval = setInterval(() => {
        container.style.backgroundColor = flash ? "#FFD700" : "#FFF6C2";
        flash = !flash;
      }, 500);

      setTimeout(() => clearInterval(flashInterval), 10000);
    }

    function goHome() {
      window.location.href = "home.html";
    }

    function restartTimer() {
      window.location.reload();
    }

    startTimer();
  </script>
