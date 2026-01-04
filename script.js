const btnEl = document.getElementById("btn");
const stopBtn = document.getElementById("stop");
const birthdayEl = document.getElementById("birthday");
const resultEl = document.getElementById("result");
const updatedEl = document.getElementById("updated");

let intervalId = null;

function pad(n){return n<10? '0'+n : n}

function getPreciseAge(birthdayValue){
  const now = new Date();
  const b = new Date(birthdayValue);
  if (isNaN(b)) return null;
  if (b > now) return {future:true};

  let years = now.getFullYear() - b.getFullYear();
  let months = now.getMonth() - b.getMonth();
  let days = now.getDate() - b.getDate();

  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return {years, months, days};
}

function renderAge() {
  const birthdayValue = birthdayEl.value;
  if (!birthdayValue) {
    alert('Please select your birth date');
    return;
  }

  const age = getPreciseAge(birthdayValue);
  if (!age) {
    resultEl.innerText = 'Invalid date';
    return;
  }
  if (age.future) {
    resultEl.innerText = 'You have selected a future date';
    return;
  }

  const yLabel = age.years === 1 ? 'year' : 'years';
  const mLabel = age.months === 1 ? 'month' : 'months';
  const dLabel = age.days === 1 ? 'day' : 'days';

  resultEl.innerText = `${age.years} ${yLabel}, ${age.months} ${mLabel}, ${age.days} ${dLabel} old`;

  const t = new Date();
  updatedEl.innerText = `Last updated: ${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}`;
}

function startLive() {
  if (!birthdayEl.value) { alert('Please select your birth date'); return; }
  renderAge();
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(renderAge, 1000);
  stopBtn.disabled = false;
}

function stopLive(){
  if (intervalId) { clearInterval(intervalId); intervalId = null; }
  stopBtn.disabled = true;
  updatedEl.innerText = 'Live update stopped';
}

btnEl.addEventListener('click', startLive);
stopBtn.addEventListener('click', stopLive);
birthdayEl.addEventListener('change', ()=>{ if (intervalId) { startLive(); } });

// initialize
stopBtn.disabled = true;