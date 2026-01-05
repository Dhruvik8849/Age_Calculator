document.getElementById("btn").addEventListener("click", calculateAge);

let liveInterval = null;

document.getElementById("stop").addEventListener("click", () => {
  if (liveInterval) {
    clearInterval(liveInterval);
    liveInterval = null;
    document.getElementById("updated").textContent = "Live update stopped.";
  }
});

function calculateAge() {
  const input = document.getElementById("birthday").value;
  if (!input) {
    document.getElementById("result").textContent = "Please select a date!";
    return;
  }

  const birthDate = new Date(input);
  updateResult(birthDate);

  if (!liveInterval) {
    liveInterval = setInterval(() => updateResult(birthDate), 1000);
  }
}

function updateResult(birthDate) {
  const now = new Date();

  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  document.getElementById("result").textContent =
    `Age: ${years} years, ${months} months, ${days} days`;

  const totalDays = Math.floor((now - birthDate) / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor((now - birthDate) / (1000 * 60 * 60));
  const totalMinutes = Math.floor((now - birthDate) / (1000 * 60));
  const totalSeconds = Math.floor((now - birthDate) / 1000);

  document.getElementById("updated").textContent =
    `(${totalDays} days | ${totalHours} hrs | ${totalMinutes} min | ${totalSeconds} sec lived)`;
}
