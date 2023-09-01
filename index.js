//Defining and initializing element
let box = document.querySelector(".box");
let scoreEl = document.getElementById("score");
let hScore = document.getElementById("hScore");
let resume = document.getElementById("resume");
let pause = document.getElementById("pause");
let toggle = document.querySelector(".toggle");
let reset = document.querySelector("#reset");
const apiUrl = " http://localhost:3000/obj";
// Initializing highScore value based on condition
if (localStorage.getItem("maxScore"))
  hScore.innerHTML = localStorage.getItem("maxScore");
else hScore.innerHTML = "0";
// Snake head,tail,body defining and initializing
let [head, tail, ...body] = [];
// To reset the color of tail to white again, we make a copy of previous tail
let initalTail;
let myInterval;
let previous;
let div;
let random = Math.ceil(Math.random() * 400);
let opposite = {
  ArrowRight: "ArrowLeft",
  ArrowLeft: "ArrowRight",
  ArrowUp: "ArrowDown",
  ArrowDown: "ArrowUp",
};
let newApple = () => {
  while ([head, tail, ...body].includes(random))
    random = Math.ceil(Math.random() * 400);
  return random;
};
let styleSnake = () => {
  document.querySelector(`.box :nth-child(${head})`).style.backgroundColor =
    "red";

  body.forEach(
    (i) =>
      (document.querySelector(`.box :nth-child(${i})`).style.backgroundColor =
        "orange")
  );
  document.querySelector(`.box :nth-child(${tail})`).style.backgroundColor =
    "green";
  document.querySelector(`.box :nth-child(${random})`).style.backgroundColor =
    "purple";
  if (initalTail)
    document.querySelector(
      `.box :nth-child(${initalTail})`
    ).style.backgroundColor = "rgb(206, 242, 242)";
};
let resetPage = () => {
  box.innerHTML = "";
  scoreEl.innerHTML = "0";
  for (let i = 0; i < 400; i++) {
    div = document.createElement("div");
    box.appendChild(div);
  }
  [head, tail, ...body] = [104, 102, 103];
  [1, 20, 381, 400].forEach((i) => {
    document.querySelector(`.box :nth-child(${i})`).style.borderRadius = "5px";
  });
  pause.classList.remove("hide");
  resume.classList.add("hide");
  reset.classList.add("hide");
  newApple();
  styleSnake();
};
let pauseGame = () => {
  resume.classList.remove("hide");
  pause.classList.add("hide");
  clearInterval(myInterval);
};
let resumeGame = () => {
  pause.classList.remove("hide");
  resume.classList.add("hide");
  document.onkeydown = function (pressed) {
    createInterval(pressed);
  };
};
let updateScore = () => {
  scoreEl.innerHTML -= -10;
};
let updateParts = () => {
  initalTail = tail;
  tail = body[0];
  body.push(head);
  body.shift();
};
// full update of snake body parts based upon direction
let moveRight = () => {
  updateParts();
  if (head % 20 === 0) head -= 19;
  else head++;
};
let moveLeft = () => {
  updateParts();
  if ((head - 1) % 20 === 0) head += 19;
  else head--;
};
let moveUp = () => {
  updateParts();
  if (head < 21) head += 380;
  else head -= 20;
};
let moveDown = () => {
  updateParts();
  if (head > 380) head -= 380;
  else head += 20;
};
// Condition to check whether at the next move there is an apple or not
let isEatingApple = (keys) => {
  if (keys === "ArrowRight")
    return head % 20 === 0 ? head - 19 === random : head + 1 === random;
  else if (keys === "ArrowLeft")
    return (head - 1) % 20 === 0 ? head + 19 === random : head - 1 === random;
  else if (keys === "ArrowUp")
    return head < 21 ? head + 380 === random : head - 20 === random;
  else if (keys === "ArrowDown")
    return head > 380 ? head - 380 === random : head + 20 === random;
};
// updating snake body parts if it eats an apple.
let eatApple = () => {
  body.push(head);
  head = random;
  newApple();
  updateScore();
  styleSnake();
};
// Function to check whether next move is eating body or not
let isEatingBody = (keys) => {
  if (keys === "ArrowRight")
    return head % 20 === 0
      ? [tail, ...body].includes(head - 19)
      : [tail, ...body].includes(head + 1);
  else if (keys === "ArrowLeft")
    return (head - 1) % 20 === 0
      ? [tail, ...body].includes(head + 19)
      : [tail, ...body].includes(head - 1);
  else if (keys === "ArrowUp")
    return head < 21
      ? [tail, ...body].includes(head + 380)
      : [tail, ...body].includes(head - 20);
  else if (keys === "ArrowDown")
    return head > 380
      ? [tail, ...body].includes(head - 380)
      : [tail, ...body].includes(head + 20);
};
// After eating body game over.
let eatBody = () => {
  box.innerHTML = "<h1 class='gameOver'>Game Over! </h1>";
  clearInterval(myInterval);
  // using local storage for storing highScore
  if (
    !localStorage.getItem("maxScore") ||
    Number(localStorage.getItem("maxScore")) < scoreEl.innerHTML
  ) {
    localStorage.setItem("maxScore", scoreEl.innerHTML);
    hScore.innerHTML = localStorage.getItem("maxScore");
  }

  pause.classList.add("hide");
  reset.classList.remove("hide");
  console.log("Body eaten");
};
let hasPressedValid = (pressed, previous) => {
  return (
    Object.keys(opposite).includes(pressed) && pressed !== opposite[previous]
  );
};
let moveSnake = (pressed) => {
  if (!hasPressedValid(pressed.key, previous.key))
    pressed = { key: previous.key };
  if (isEatingApple(pressed.key)) eatApple();
  else if (isEatingBody(pressed.key)) eatBody();
  else {
    eval(`move${pressed.key.slice(pressed.key.indexOf("w") + 1)}()`);
    styleSnake();
  }
  previous = { key: pressed.key };
};

// creating interval
let createInterval = (pressed) => {
  document.onkeydown = (events) => (pressed = events);
  previous = { key: pressed.key };
  if (!hasPressedValid(pressed.key, previous.key))
    pressed = { key: "ArrowRight" };
  myInterval = setInterval(() => moveSnake(pressed), 100);
};
resetPage();
// KeyDown event hadler to move snake
document.onkeydown = function (pressed) {
  createInterval(pressed);
};

pause.addEventListener("click", pauseGame);

resume.addEventListener("click", resumeGame);
reset.addEventListener("click", () => {
  resetPage();
  document.onkeydown = function (pressed) {
    createInterval(pressed);
  };
});
document.onkeyup = function (events) {
  if (events.key === " ") {
    if (pause.classList[0] && reset.classList[0]) resumeGame();
    else if (resume.classList[0] && reset.classList[0]) pauseGame();
    else {
      resetPage();
      document.onkeydown = function (pressed) {
        createInterval(pressed);
      };
    }
  }
};
