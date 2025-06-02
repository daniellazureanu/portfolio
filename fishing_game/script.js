document.addEventListener("DOMContentLoaded", function () {
  const catchButton = document.querySelector(".fish button");
  const progressBar = document.getElementById("progressBar");
  const catchMessage = document.querySelector(".fish p");
  const sellButton = document.getElementById("sellButton");
  const inventoryList = document.getElementById("inventoryList");
  const balanceDisplay = document.getElementById("balanceDisplay");
  const fishImage = document.getElementById('fishImage');
  const fishUpgradeButton = document.getElementById('upgrade-button-1');

  let inventory = {};
  let balance = 0;

  const fishValues = {
    Anchovy: 5,
    Clownfish: 10,
    Crab: 8,
    Pufferfish: 30,
    Surgeonfish: 20
  };

  let duration = 5000;

  catchButton.addEventListener("click", () => {
    catchMessage.style.opacity = 0;
    fishImage.style.opacity = 0;
    catchButton.disabled = true;
    progressBar.value = 0;

    let interval = 30;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      progressBar.value = (elapsed / duration) * 100;

      if (elapsed >= duration) {
        clearInterval(timer);
        progressBar.value = 0;
        catchButton.disabled = false;
        getRandomFish();
      }
    }, interval);
  });

  fishUpgradeButton.addEventListener("click", buyUpgrade1);

  function getRandomFish() {
    const fishTypes = Object.keys(fishValues);
    const randomFish = fishTypes[Math.floor(Math.random() * fishTypes.length)];

    if (inventory[randomFish]) {
      inventory[randomFish]++;
    } else {
      inventory[randomFish] = 1;
    }

    updateInventoryDisplay();

    catchMessage.innerHTML = `You've caught a ${randomFish}!`;
    catchMessage.style.opacity = 1;

    fishImage.src=`resources/${randomFish}.png`
    fishImage.style.opacity = 1;
  }

  function updateInventoryDisplay() {
    inventoryList.innerHTML = '';

    for (let fish in inventory) {
      const count = inventory[fish];
      const listItem = document.createElement("li");
      listItem.textContent = `${fish} x${count} ($${fishValues[fish] * count})`;
      inventoryList.appendChild(listItem);
    }
  }

  let bought=false;

  function buyUpgrade1(){
    if(bought==false && balance>=100){
      bought=true;
      duration = 3000;
      fishUpgradeButton.style.opacity = 0.7;
      fishUpgradeButton.style.cursor = unset;
    }
  }

  sellButton.addEventListener("click", () => {

    let total = 0;

    for (let fish in inventory) {
      total += (fishValues[fish] || 0) * inventory[fish];
    }

    balance += total;
    balanceDisplay.textContent = balance;

    inventory = {};
    updateInventoryDisplay();

    catchMessage.innerHTML = `You sold all your fish for $${total}!`;
    catchMessage.style.opacity = 1;
  });
});
