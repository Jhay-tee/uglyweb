let transactions = JSON.parse(localStorage.getItem('uglyBudget2026')) || [];

const balanceEl = document.getElementById('balance');
const listEl = document.getElementById('transactions');
const popupContainer = document.getElementById('popupContainer');
const trashContainer = document.getElementById('floatingTrash');

function showUglyPopup(message, bg = '#ffff00', color = '#f00') {
  const popup = document.createElement('div');
  popup.className = 'ugly-popup';
  popup.textContent = message.toUpperCase();
  popup.style.background = bg;
  popup.style.color = color;
  popupContainer.appendChild(popup);

  setTimeout(() => {
    popup.style.opacity = '0';
    popup.style.transform = 'translate(-50%, -80%) scale(0.5) rotate(20deg)';
    setTimeout(() => popup.remove(), 800);
  }, 2200);
}

function spawnTrash() {
  const phrases = [
    "SPEND LESS YOU IDIOT",
    "YOUR WALLET IS CRYING",
    "REGRET LOADING...",
    "MONEY GO BRRRR → GONE",
    "POOR LIFE CHOICES",
    "BUY MORE JUNK",
    "DEBT COLLECTOR INCOMING"
  ];
  const div = document.createElement('div');
  div.textContent = phrases[Math.floor(Math.random() * phrases.length)];
  div.style.top = Math.random() * 80 + 'vh';
  div.style.left = '-20%';
  div.style.color = `hsl(${Math.random()*360}, 100%, 60%)`;
  div.style.fontSize = (2 + Math.random() * 2.5) + 'rem';
  const dur = 12 + Math.random() * 18;
  div.style.animationDuration = dur + 's';
  trashContainer.appendChild(div);
  setTimeout(() => div.remove(), dur * 1000 + 1000);
}

setInterval(spawnTrash, 1800);

function updateUI() {
  localStorage.setItem('uglyBudget2026', JSON.stringify(transactions));

  const balance = transactions.reduce((sum, t) => sum + t.amount, 0);
  balanceEl.textContent = balance.toFixed(2);
  balanceEl.style.color = balance >= 0 ? '#00ff00' : '#ff0000';

  if (balance < -50) {
    showUglyPopup("YOU ARE IN DEEP TROUBLE", '#ff0000', '#ffff00');
  }

  listEl.innerHTML = '';
  transactions.forEach(t => {
    const li = document.createElement('li');
    li.textContent = `${t.desc} (${t.cat}): ${t.amount.toFixed(2)}`;
    li.className = t.amount >= 0 ? 'positive' : 'negative';
    listEl.appendChild(li);
  });
}

document.getElementById('add').onclick = () => {
  const desc = document.getElementById('desc').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const cat = document.getElementById('cat').value;

  if (!desc || isNaN(amount)) {
    showUglyPopup("FILL ALL FIELDS YOU MORON", '#ff0000', '#ffff00');
    return;
  }

  transactions.push({ desc, amount, cat });
  updateUI();

  document.getElementById('desc').value = '';
  document.getElementById('amount').value = '';

  showUglyPopup(`WASTED: ${desc}  →  ${amount.toFixed(2)}`, '#00ffff', '#000');
};

// Init
updateUI();