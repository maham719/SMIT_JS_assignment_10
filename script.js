var char1 = document.getElementById("char1");
var char2 = document.getElementById("char2");
var rounds = document.getElementById("round");
var char1status = document.getElementById("char1status");
var char2status = document.getElementById("char2status");
var container = document.querySelector(".container");
var body = document.body;
var rugalmoves = {
  run: "/rugal/godrugal-cvs2-run.gif",
  walk: "/rugal/rugal-walk.gif",
  step: "rugal/rugalStep.gif",
  specialrun: "/rugal/god-rugal-cvs2-specialrun.gif",
  specialrun2: "rugal/god-rugal-cvs2-specialrun2.gif",
  specialthrow: "rugal/god-rugal-cvs2-specialthrow.gif",
  knockout: "rugal/godrugal-cvs2-blockdamage-ko.gif",
  closeattack: "rugal/rugal-cvs2-closeattacks.gif",
  crouchattacks: "rugal/rugal-cvs2-crouchattacks.gif",
  dodgekick: "rugal/godrugal-cvs2-dodgekick.gif",
  fall: "rugal/rugal-cvs2-fall.gif",
  highattacks: "rugal/highattacks.gif",
  jumpattacks: "rugal/rugal-cvs2-jumpattacks.gif",
  superkick3: "rugal/superkick.gif",
  projectile: "rugal/projectile.gif",
  teleport: "rugal/rugal-god-teleport.gif",
  dash: "rugal/godrugal-cvs2-dash.gif",
  jump: "rugal/jump1.gif",
  jump2: "rugal/god-rugal-cvs2-jump-a5.gif",
  jump3: "rugal/god-rugal-cvs2-jump-a6.gif",
  dashback: "rugal/dash2.gif",
  projectile2: "rugal/projectile2.gif",
};
var terrymoves = {
  burnknnuckle: "/terry/terry-cvs2-burnknuckle.gif",
  jumpup: "terry/jumpup.gif",
  kick2: "terry/kick2.gif",
  punch3: "terry/punch3.gif",
  superkick: "terry/superkick.gif",
  dashback:"terry/dashback.gif",
  dodgeback:"terry/dodgeback.gif"
};
var terrySpecialMoves = ["terry/terryspec2.gif", "terry/lowkick.gif"];
var flag = false;
var speed = 5;
var currentMove = ""; 
var terryspeed = 5;
var terrycount = 25;
var rugalcount = 25;
function updateHealthBars() {

  rugalcount = Math.max(0, Math.min(25, rugalcount));
  terrycount = Math.max(0, Math.min(25, terrycount));

 
  const rugalHealthPercent = (rugalcount / 25) * 100;
  const terryHealthPercent = (terrycount / 25) * 100;

  
  char1status.style.width = rugalHealthPercent + "%";
  char2status.style.width = terryHealthPercent + "%";
}

function character(command) {
  if (command === "forward") {
    speed += 5;
    if (currentMove !== "step") {
      char1.src = rugalmoves.step;
      char1.style.width = "500px";
      currentMove = "step";
    }
    char1.style.left = speed + "%";
    flag = true;
  } else if (command === "backward") {
    speed -= 5;
    char1.style.left = speed + "%";
  } else if (command === "jump") {
    char1.src = rugalmoves.jump;
    char1.style.width = "330px";
  } else if (command === "highattack") {
    if (currentMove !== "highattacks") {
      char1.src = rugalmoves.highattacks;
      char1.style.width = "500px";
      currentMove = "highattacks";
    }
    char2.src = terrymoves.punch3;
    char2.style.width = "450px";
    terrycount -= 2;
    updateHealthBars();
  } else if (command === "throw") {
    if (currentMove !== "projectile") {
      terrycount -= 5;
      updateHealthBars();
      char1.src = rugalmoves.projectile2;
      char1.style.width = "1000px";
      currentMove = "projectile2";

      setTimeout(() => {
        char2.src = terrymoves.jumpup;
        char2.style.width = "300px";
        terrycount += 2;
        updateHealthBars();
      }, 500);

      setTimeout(() => {
        char2.src = terrymoves.kick2;
        char2.style.width = "500px";
        terryspeed += 15;
        char2.style.right = terryspeed + "%";
      }, 1500);

      setTimeout(() => {
        terryspeed = 10;
        char2.style.right = "10%";
      }, 3000);

      setTimeout(() => {
        const randomIndex = Math.floor(
          Math.random() * terrySpecialMoves.length
        );
        char2.src = terrySpecialMoves[randomIndex];
        if (randomIndex === 1) {
          char2.style.width = "500px";
          char2.style.right = "30%";
          rugalcount -= 4; 
        } else {
          char2.style.width = "1000px";
          terrycount += 5;
        }
        updateHealthBars();
      }, 4000);
    }
    flag = true;
  } else if (command === "flyingkick") {
    char1.src = rugalmoves.jump3;
    char1.style.width = "400px";
    char2.src=terrymoves.dodgeback;
    char2.style.width="500px"
    terrycount -= 5;
    updateHealthBars();
    setTimeout(() => {
      char1.src = "rugal/godrugal-cvs2-point.gif";
      char1.style.width = "340px";
    }, 2000);
  } else if (command === "kick") {
    rugalcount += 5;
    updateHealthBars();
    char1.src = rugalmoves.superkick3;
    char1.style.width = "600px";
    char2.src = terrymoves.superkick;
    char2.style.width = "800px";
    rugalcount -= 3;
    updateHealthBars();
  }
}

function rugal(event) {
  if (event.key === "ArrowRight") {
    character("forward");
  } else if (event.key === "ArrowLeft") {
    character("backward");
  } else if (event.key === "ArrowUp") {
    character("jump");
  } else if (event.key === "ArrowDown") {
    character("down");
  } else if (event.key === "h") {
    character("highattack");
  } else if (event.key === "t") {
    character("throw");
  } else if (event.key === "f") {
    character("flyingkick");
  } else if (event.key === "k") {
    character("kick");
  }
}
  var time = 60;
window.addEventListener("load", function () {
  var timer = document.querySelector(".timer");

  updateHealthBars(); 

  setTimeout(() => {
    const countdown = setInterval(() => {
      time--;
      timer.textContent = time;
      if (time <= 0) {
        clearInterval(countdown);
        timer.textContent = "00";
      }
    }, 1000);
  }, 6000);

  setTimeout(() => {
    rounds.style.display = "block";
    rounds.classList.remove("fight");
  }, 1000);

  setTimeout(() => {
    rounds.style.display = "none";
  }, 3000);

  setTimeout(() => {
    rounds.textContent = "FIGHT!";
    rounds.classList.add("fight");
    rounds.style.display = "block";
  }, 4000);

  setTimeout(() => {
    rounds.style.display = "none";
  }, 5000);
});

setTimeout(() => {
  window.addEventListener("keydown", rugal);
}, 6000);
setTimeout(() => {
  if (rugalcount > terrycount) {
    container.style.display = "none";
    var youwin = document.createElement("div");
    youwin.classList.add("youwin");
    body.appendChild(youwin);
    var image = document.createElement("img");
    image.src = "rugal/rugalww.gif";
    image.style.width="500px";
    youwin.appendChild(image);
    var text = document.createElement("p");
    text.classList.add("ywtext");
    text.innerText = "You Win!";
    youwin.appendChild(text);
  } else if (terrycount > rugalcount) {
    container.style.display = "none";
    var youwin = document.createElement("div");
    youwin.classList.add("youwin");
    body.appendChild(youwin);
    var image = document.createElement("img");
    image.src = "terry/terryww.gif";
    image.style.width="500px";
    youwin.appendChild(image);
    var text = document.createElement("p");
    text.classList.add("ywtext");
    text.innerText = "Terry Won!";
    youwin.appendChild(text);
  }else if(rugalcount<10 && terrycount <10){
     container.style.display = "none";
    var youwin = document.createElement("div");
    youwin.classList.add("youwin");
    body.appendChild(youwin);
    var text = document.createElement("p");
    text.classList.add("ywtext");
    text.innerText = "TIME UP!";
    youwin.appendChild(text);
  }else if(rugalcount===terrycount){
     container.style.display = "none";
    var youwin = document.createElement("div");
    youwin.classList.add("youwin");
    body.appendChild(youwin);
    var text = document.createElement("p");
    text.classList.add("ywtext");
    text.innerText = "DRAW!";
    youwin.appendChild(text);
  }
}, 60000);

