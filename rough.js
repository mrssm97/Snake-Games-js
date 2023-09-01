// document.onkeyup = (event) => {
//   console.log("Key Pressed");
//   console.log(event.code);
// };

// for (let i = 0; i < 10; i++) {
//   let random = Math.round(Math.random() * 100);
//   console.log(random);
// }
// // console.log(Math.ceil(93.3));
// let random = Math.round(Math.random() * 100);
// let snake;
// let [head, tail, ...body] = (snake = [4, 1, 2, 3]);
// console.log("head : ", head);
// console.log("tail : ", tail);
// console.log("body : ", body);
// console.log(snake);
// snake.push("Pushed in body");
// console.log(snake, body);
// body[3] = 4;
// console.log(body);
// body.shift();
// console.log(body);
// Without twisting snake code
/* let box = document.querySelector(".box");
for (let i = 0; i < 400; i++) {
  let div = document.createElement("div");
  box.appendChild(div);
}
let [head, tail, ...body] = [3, 1, 2];
let random = Math.ceil(Math.random() * 20);
while ([head, tail, ...body].includes(random))
  random = Math.ceil(Math.random() * 20);
document.querySelector(`.box :nth-child(${head})`).style.backgroundColor =
  "red";
document.querySelector(`.box :nth-child(${body[0]})`).style.backgroundColor =
  "orange";
document.querySelector(`.box :nth-child(${tail})`).style.backgroundColor =
  "green";
document.querySelector(`.box :nth-child(${random})`).style.backgroundColor =
  "purple";
document.onkeydown = (pressed) => {
  if (pressed.key === "ArrowRight") {
    if (head + 1 === random) {
      body.push(head);
      head++;
      while ([head, tail, ...body].includes(random))
        random = Math.ceil(Math.random() * 20);
    } else {
      head++;
      tail++;
      body = body.map((item) => item + 1);
    }
    document.querySelector(`.box :nth-child(${head})`).style.backgroundColor =
      "red";
    document.querySelector(`.box :nth-child(${tail})`).style.backgroundColor =
      "green";
    document.querySelector(
      `.box :nth-child(${tail - 1})`
    ).style.backgroundColor = "white";
    document.querySelector(`.box :nth-child(${random})`).style.backgroundColor =
      "purple";
  }
  body.forEach((item) => {
    document.querySelector(`.box :nth-child(${item})`).style.backgroundColor =
      "orange";
  });
}; */
// let random = Math.round(Math.random() * 100);
// let snake;
// let [head, tail, ...body] = (snake = [4, 1, 2, 3]);
// let names = ["Ajay", "Ajay", "Sanjay", "Sanjay", "Sanjay", "Ajay", "Ajay"];
// let m = 10;
// let i = 0;
// setInterval(() => {
//   console.log("interval is working.");
//   if (names[i] === "Sanjay") m = 0.5;
//   else m = 10;
//   i++;
//   console.log(this);
// }, 100 * m);
// let pressed = { key: "ArrowDown" };
// let previous = { key: pressed.key };
// pressed = { key: "ArrowUp" };
// let opposite = {
//   ArrowUp: "ArrowDown",
//   ArrowDown: "ArrowUp",
//   ArrowLeft: "ArrowRight",
//   ArrowRight: "ArrowLeft",
// };
// console.log(previous.key);
// console.log(opposite[pressed.key]);
// console.log(previous.key === opposite[pressed.key]);

//   <---------------------------------Snake v2.o-------------------------->
/* 

      .........JAVASCRIPT................

let box = document.querySelector(".box");
let end = document.createElement("p");
let scoreEl = document.getElementById("score");
let start = document.getElementById("start");
let pause = document.getElementById("stop");
end.innerHTML = "Game Over";
for (let i = 0; i < 400; i++) {
  let div = document.createElement("div");
  box.appendChild(div);
}
let [head, tail, ...body] = [3, 1, 2];
let initialTail = tail;
let previous = {};
let score = 0;
let random = Math.ceil(Math.random() * 40);
let opposite = {
  ArrowUp: "ArrowDown",
  ArrowDown: "ArrowUp",
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft",
};

let newApple = () => {
  while ([head, tail, ...body].includes(random))
    random = Math.ceil(Math.random() * 40);
  return random;
};
newApple();
let point;
document.querySelector(`.box :nth-child(${head})`).style.backgroundColor =
  "red";
document.querySelector(`.box :nth-child(${body[0]})`).style.backgroundColor =
  "orange";
document.querySelector(`.box :nth-child(${tail})`).style.backgroundColor =
  "green";
document.querySelector(`.box :nth-child(${random})`).style.backgroundColor =
  "purple";
scoreEl.innerHTML = score;
document.addEventListener("keydown", (events) => {
  pressed = events;
  console.log(`${events.key} is pressed`);
});
document.onkeydown = (pressed) => {
  console.log("Presssing key in Main");

  // Set interval start from here. for repetive call of arrows.

  let myInterval = setInterval(() => {
    initialTail = tail;
    previous = { key: pressed.key };
    document.onkeydown = (events) => {
      console.log("Pressing key in Events");
      pressed = events;
    };
    console.log(pressed.key);
    console.log(previous.key);
    if (previous.key === opposite[pressed.key]) {
      pressed = { key: previous.key };
      console.log("Opposite key has been pressed.");
    }

    if (pressed.key === "ArrowUp") {
      body.push(head);
      if (head > 20) head -= 20;
      else head += 380;
      if (head === random) {
        newApple();
        score += 10;
      } else {
        tail = body[0];
        body.shift();
      }
    } else if (pressed.key === "ArrowDown") {
      if ([tail, ...body].includes(head + 20)) {
        if (head + 20 !== body[body.length - 1]) {
          while (box.hasChildNodes) {
            box.removeChild(box.firstChild);
          }
        } else {
          pressed = { key: "ArrowUp" };
        }
      } else {
        body.push(head);
        if (head < 381) head += 20;
        else head -= 380;
        if (head === random) {
          newApple();
          score += 10;
        } else {
          tail = body[0];
          body.shift();
        }
      }
    } else if (pressed.key === "ArrowRight") {
      if (
        [tail, ...body].includes(head + 1) ||
        ((head - 1) % 20 === 0 && [tail, ...body].includes(head - 19))
      ) {
        if (
          [tail, ...body].includes(head + 1) &&
          body[body.length - 1] !== head + 1
        ) {
          while (box.hasChildNodes) {
            box.removeChild(box.firstChild);
          }
        } else pressed = { key: "ArrowLeft" };
      } else {
        body.push(head);
        if (head % 20 === 0) head -= 19;
        else head++;
        if (head === random) {
          newApple();
          score += 10;
        } else {
          tail = body[0];
          body.shift();
        }
      }
    } else if (pressed.key === "ArrowLeft") {
      if ([tail, ...body].includes(head - 1)) {
        if (head - 1 !== body[body.length - 1]) {
          while (box.hasChildNodes) {
            box.removeChild(box.firstChild);
          }
        } else pressed = { key: "ArrowRight" };
      } else {
        body.push(head);
        if ((head - 1) % 20 === 0) head += 19;
        else head--;
        if (head === random) {
          newApple();
          score += 10;
        } else {
          tail = body[0];
          body.shift();
        }
      }
    }
    document.querySelector(`.box :nth-child(${head})`).style.backgroundColor =
      "red";
    document.querySelector(`.box :nth-child(${tail})`).style.backgroundColor =
      "green";
    document.querySelector(`.box :nth-child(${random})`).style.backgroundColor =
      "purple";
    body.forEach((item) => {
      document.querySelector(`.box :nth-child(${item})`).style.backgroundColor =
        "orange";
    });
    if (tail != initialTail)
      document.querySelector(
        `.box :nth-child(${initialTail})`
      ).style.backgroundColor = "white";
    scoreEl.innerHTML = score;
  }, 200);
};


 ............CSS...............

 * {
  margin: 0;
  /* box-sizing: border-box; */
/*}
@import url("https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap");

.main {
  height: 100vh;
  width: 100vw;
  background-color: gray;
  display: grid;
  place-items: center;
}
.center {
  height: 415px;
  width: 70%;
  background-color: hotpink;
  display: flex;
  justify-content: space-between;
}
.info {
  color: rgb(50, 48, 48);
  font-family: "Black Ops One", cursive;
}
.box {
  height: 400px;
  width: 400px;
  padding: 6px;
  border: 2px solid black;
  background-color: wheat;
  display: flex;
  flex-wrap: wrap;
}
.box div {
  height: 20px;
  width: 20px;
  box-sizing: border-box;
  background-color: white;
  border: 0.02px solid black;
}
/* button {
  background-color: red;
  color: white;
  width: 415px;
  height: 50px;
  font-size: larger;
} */
/*button {
  width: 140px;
  background-color: transparent;
  border: 2px inset gray;
  color: white;
  background-color: rgb(50, 47, 47);
  font-family: "Black Ops One", cursive;
  cursor: pointer;
  font-size: large;
}
p {
  color: white;
  font-size: larger;
  font-family: "Black Ops One", cursive;
}

       ............HTML............
       <div class="main">
        <div class="center">
            <div class="info">
                <h1>Welcome To Snake World</h1>
                <h2>Score : <span id="score"></span></h2>
                <button id="start">
                    <h2>Start</h2>
                </button>
                <button id="start">
                    <h2>Stop</h2>
                </button>
                <h2>Highest Score</h2>
            </div>
            <div class="box"></div>
        </div>

    </div>

    <script src="index.js"></script>
    <!-- <script src="rough.js"></script> -->

 */
// let num1 = 1;
// let sum = (num) => {
//   num++;
//   num1++;
//   console.log(num);
// };
// setInterval(sum, 500, num1);
// let employee = {
//   name: "Sanjay Kumar",
//   id: 1001,
//   city: "Buxar",
// };
// console.log(Object.values(employee)[1]);
// let pressed = { key: "ArrowRight" };
// console.log("move" + pressed.key.slice(pressed.key.indexOf("w") + 1) + "()");

const apiUrl = " http://localhost:3000/obj"; // URL of the API endpoint
let hScore;
// Data to be sent to the server (in this example, we're sending JSON data)
const postData = {
  highScore: "100",
};

fetch(apiUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(postData),
});
// .then((res) => res.json())
// .then((data) => console.log("Data sent successfully:", data.highScore));
fetch(apiUrl)
  .then((res) => res.json())
  .then((data) => {
    hScore = data.highScore;
    console.log(data);
    console.log(hScore);
  });

console.log(hScore);
