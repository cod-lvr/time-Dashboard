let i = 0;
const colors = ["FF8C66", "56C2E6", "FF5C7C", "4ACF81", "7536D3", "F1C65B"];

const cardContent = document.getElementById("card-content").content;
const cardList = document.querySelector(".cards-container");

const dailyBtn = document.querySelector(".daily-btn");
const weeklyBtn = document.querySelector(".weekly-btn");
const monthlyBtn = document.querySelector(".monthly-btn");

async function fetchCardData(timeFrame) {
  if (cardList.querySelector("li")) {
    cardList.querySelectorAll("li").forEach((card) => {
      card.style.display = "none";
    });
    i = 0;
  }

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
  newCard.querySelector("li").id = "active";
  newCard.querySelector("img").src = card.imgsrc;
  newCard.querySelector("#title").textContent = card.title;
  newCard.querySelector("#current").textContent = `${crr}hrs`;
  newCard.querySelector("#previous").textContent = `Last Week- ${prev}hrs `;
  newCard.querySelector("li").style["background-color"] = `#${colors[i]}`;
  cardList.appendChild(newCard);
  i++;
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
