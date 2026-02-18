const TARGET_DATE = new Date(2026, 3, 2); // 2 de abril de 2026
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const countEl = document.querySelector(".count");
const dayWordEl = document.getElementById("dayWord");

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function daysUntil(targetDate) {
  const today = startOfToday();
  const target = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );

  const diffMs = target.getTime() - today.getTime();
  return Math.max(0, Math.round(diffMs / MS_PER_DAY));
}

function buildTiles(digits) {
  countEl.innerHTML = "";
  for (const ch of digits) {
    const tile = document.createElement("div");
    tile.className = "tile";

    const span = document.createElement("span");
    span.textContent = ch;

    tile.appendChild(span);
    countEl.appendChild(tile);
  }
}

function animateTile(tile) {
  tile.classList.remove("pulse");
  void tile.offsetWidth; // reinicia la animación
  tile.classList.add("pulse");
}

function render() {
  const days = daysUntil(TARGET_DATE);
  const digits = String(days).padStart(2, "0").slice(-2);

  if (countEl.children.length !== digits.length) {
    buildTiles(digits);
  }

  [...countEl.children].forEach((tile, idx) => {
    const span = tile.querySelector("span");
    const ch = digits[idx];

    if (span.textContent !== ch) {
      animateTile(tile);
      span.textContent = ch;
    }
  });

  dayWordEl.textContent = days === 1 ? "día" : "días";
}

render();
setInterval(render, 60 * 60 * 1000);
