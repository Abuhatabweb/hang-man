// varaibles
let charts = [
  "ا",
  "ب",
  "ت",
  "ث",
  "ج",
  "ح",
  "خ",
  "د",
  "ذ",
  "ر",
  "ز",
  "س",
  "ش",
  "ص",
  "ض",
  "ط",
  "ظ",
  "ع",
  "غ",
  "ف",
  "ق",
  "ك",
  "ل",
  "م",
  "ن",
  "ه",
  "و",
  "ي",
  "space",
];
let apiData = [];
let category = [];
let title = "";
let items = [];
let mainItem = "";
let score = 0;
let mistake = 0;
let right = 0;

// elements
let scoreDiv = document.querySelector(".score");
let categoryText = document.querySelector(".category");
let answerContainer = document.querySelector(".answer");
let keyboard = document.querySelector(".keyboard");

function start() {
  let api = "apiar.json";
  let response = new XMLHttpRequest();
  response.open("GET", api);
  response.send();
  response.onreadystatechange = function () {
    if (this.status === 200 && this.readyState === 4) {
      apiData = JSON.parse(this.response);
      fromLocalStorage();
      changeAll();
      addScore();
    }
  };
}

start();

function changeAll() {
  answerContainer.innerHTML = "";
  keyboard.innerHTML = "";
  for (let j = 1; j <= 10; j++) {
    let man = document.getElementById(`man-${j}`);
    man.style.visibility = "hidden";
  }
  category = apiData[Math.floor(Math.random() * apiData.length)];
  title = category[0];
  categoryText.innerHTML = title;
  category.splice(0, 1);
  items = category;
  changeItem();
}

function changeItem() {
  check();
  fromLocalStorage();
  addScore();
  answerContainer.innerHTML = "";
  keyboard.innerHTML = "";
  for (let j = 1; j <= 10; j++) {
    let man = document.getElementById(`man-${j}`);
    man.style.visibility = "hidden";
  }
  mistake = 0;
  right = 0;
  addkeyboard();
  mainItem = items[Math.floor(Math.random() * items.length)];
  mainItem = mainItem.toLowerCase();
  for (let i = 0; i < mainItem.length; i++) {
    let div = document.createElement("div");
    div.className = `${mainItem[i]}`;
    if (div.className == " ") {
      div.className = "space";
    }
    answerContainer.appendChild(div);
  }
}

function addScore() {
  scoreDiv.innerHTML = score;
  toLocalStorage();
}

function resetScore() {
  score = 0;
  addScore();
}

function addkeyboard() {
  for (let i = 0; i < charts.length; i++) {
    let div = document.createElement("div");
    div.className = `${charts[i]}`;
    div.innerHTML = charts[i];

    keyboard.appendChild(div);
  }
}

keyboard.addEventListener("click", (e) => {
  let letter = e.target.className;
  if (letter == "space") {
    letter = " ";
  }
  if (e.target.className.includes("active")) {
  } else {
    if (mainItem.includes(letter)) {
      for (let i = 0; i < mainItem.length; i++) {
        if (letter == mainItem[i]) {
          if (letter == " ") {
            letter = "space";
          }
          right = right + 1;
          let divs = document.querySelectorAll(`.${letter}`);
          divs.forEach((div) => {
            if (letter == "space") {
              letter = " ";
            }
            div.innerHTML = letter;
            div.classList.add("active");
          });
        }
      }

      if (right == mainItem.length) {
        score = score + 1;
        toLocalStorage();
        addScore();
        changeItem();
      }
    } else {
      if (mistake == 10) {
        toLocalStorage();
        addScore();
        changeItem();
      } else {
        mistake = mistake + 1;
        for (let j = 1; j <= mistake; j++) {
          let man = document.getElementById(`man-${j}`);
          man.style.visibility = "visible";
        }
      }
    }
  }

  let click = e.target;
  click.classList.add("active");
});

function toLocalStorage() {
  window.localStorage.setItem("score", score);
}
function fromLocalStorage() {
  let nowScore = JSON.parse(window.localStorage.getItem("score"));
  score = nowScore;
  if (score == null) {
    score = 0;
  } else {
    score = nowScore;
  }
}

function check() {
  if (mistake >= 5 && right != mainItem.length) {
    score = score - 1;
    toLocalStorage();
  }
}

function english() {
  window.location = "https://abuhatabweb.github.io/hang-man";
}
