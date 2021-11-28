const cardContent = document.getElementById("card-content").content;
const cardList = document.querySelector(".cards-container");

const dailyBtn = document.querySelector(".daily-btn");
const weeklyBtn = document.querySelector(".weekly-btn");
const monthlyBtn = document.querySelector(".monthly-btn");

async function fetchCardData(timeFrame) {
  const request = await fetch("./scripts/data.json");
  if (!request.ok) {
    throw new Error("faild to fetch data");
  }
  const response = await request.json();

  for (let card of response) {
    createCard(card, timeFrame);
  }
}

function createCard(card, timeFrame) {
  let crr = card.timeframes[timeFrame].current;
  let prev = card.timeframes[timeFrame].previous;

  const newCard = cardContent.cloneNode(true);
  newCard.querySelector("img").src = card.imgsrc;
  newCard.querySelector("#title").textContent = card.title;
  newCard.querySelector("#current").textContent = crr;
  newCard.querySelector("#previous").textContent = prev;

  cardList.appendChild(newCard);
}

dailyBtn.addEventListener("click", () => {
  fetchCardData("daily");
});

monthlyBtn.addEventListener("click", () => {
  fetchCardData("monthly");
});

weeklyBtn.addEventListener("click", () => {
  fetchCardData("weekly");
});
