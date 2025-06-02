let fish = 0;
let fishermans = 0;
let fishPerSecond = 0;
let fishingProgress = 0;

let fishermanCost = 1;
const fishermanMultiplier = 1;
const fishermanTime = 1000; //10 seconds

let money = 0;

function catchAFish(){
  fish++;
  document.getElementById("totalFish").innerHTML = fish;
}

function fishermansCatchFish(){
  fish = fish + (fishermans * fishermanMultiplier);
  document.getElementById("totalFish").innerHTML = fish;
  fishingProgress = 0;
}

function buyFisherman(){
  if(money >= fishermanCost){
    money = Math.round((money - fishermanCost)*100)/100;
    fishermans++;
    fishermanCost = fishermanCost * 1.15;
    fishermanCost = Math.round(fishermanCost*100)/100;

    fishPerSecond = fishermans * fishermanMultiplier;

console.log("Bought! New money:", money, "New cost:", fishermanCost);

    document.getElementById("totalMoney").innerHTML = money;
    document.getElementById("totalFishermans").innerHTML = fishermans;
    document.getElementById("fishPerSecond").innerHTML = fishPerSecond;
    document.getElementById("fishermanCost").innerHTML = fishermanCost;
    }
}

function sellFish(){
  if(parseInt(fish/10, 10) * 10 >= 10){
    let fishToSell = parseInt(fish/10, 10) * 10;
    fish -= fishToSell;
    money += (fishToSell / 10);
    money = Math.round(money*100)/100;
    document.getElementById("totalFish").innerHTML = fish;
    document.getElementById("totalMoney").innerHTML = money;
  }
}

window.setInterval(function(){
  fishermansCatchFish();
}, fishermanTime);