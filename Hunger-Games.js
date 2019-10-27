//there are total 3 scenes
let sceneIndex = 0;

let coverImg;

let endImgLeft;
let endImgRight;
let endImgDraw;

let imgs = {
  left: [],
  right: []
};

//images array index
let imgIndex = {
  left: -1,
  right: -1
}

//players socres
let scores = {
  left: 0,
  right: 0
};

//time record
let timeLimits = {
  timer: 20
}

// let resImg = 
// {
//   left,
//   right,
//   draw
// }


function getTimer() {
  if (frameCount % 60 !== 0) return timeLimits.timer;

  if (timeLimits.timer > 0) return timeLimits.timer--;

  return 0;
}

function addScore(keyCode) {
  const types = {
    16: 'left', //shift for player 1
    13: 'right' //enter for player 2
  };

  //console.log(types[keyCode]);
  let type = types[keyCode];

  if (sceneIndex !== 1) return;//not in game
  if (!type) return;//not correct key

  scores[type]++; 
  imgIndex[type] = 0;

  // //Left Arrow
  // if (timeLimits.timer >= 0 && keyCode === 37) {
  //   scores.left++;
  // } //Right Arrow
  // else if (timeLimits.timer >= 0 && keyCode === 39) {
  //   scores.right++;
  // }
}


function getImg(type = 'left') {
  if(imgIndex[type] >= imgs[type].length) return imgs[type][0];
  
  return imgs[type][imgIndex[type]++];//display next image
  
  // imgIndex.left++;
  // return imgs.left[imgIndex.left];
}

// function getImg(type = 39) {
//   imgIndex.right++;
//   return imgs.right[imgIndex.right];
// }

function drawScene0() {

  image(coverImg,0,0);
  //background(255);
  textSize(20);
  text("Press Space to Start", width / 2, 380);

}

function drawScene1() {
  let time = getTimer();
  background(255);

  //   //left image
  //   image(imgs.left[0], 0, 200);
  //   if (isTyped.left === 1 && imgIndex.left < imgs.left.length) {
  //     image(imgs.left[imgIndex.left], 0, 200);
  //     imgIndex.left++;
  //     if (imgIndex.left == imgs.left.length) {
  //       imgIndex.left = 0;
  //     }
  //     isTyped.left = 0;
  //   }
  image(getImg('left'), 0, 0, 300,400);

  // //right image
  //   image(imgs.right[imgIndex.right], 300, 200);
  //   imgIndex.right++;
  //   if (imgIndex.right == imgs.right.length - 1) {
  //     imgIndex.right = 0;
  //   }
  //   isTyped.right = 0;
  // }

  image(getImg('right'), 300, 0, 300,400);

  textSize(15);
  text("Scores: " + scores.left, 120, 50);
  text("Scores: " + scores.right, 450, 50);

  //timer
  textSize(40);
  text(time, width / 2, 100);

  //next scene
  if (time < 1) {
    sceneIndex = 2;
  }
}

function drawScene2() {
  background(255);
  textSize(50);

  //let textStr = "";
  
  if (scores.left > scores.right) {
    image(endImgLeft, 0,0);
    textSize(30);
    text('Player 1 won !', width / 2, 60);
    textSize(15);
    text("Player 1 Scores: " + scores.left, 100, 250);
    text("Player 2 Scores: " + scores.right, 500, 250);
    //textStr = "Player 1 won!";
    //gameOver = endImg.left[0];
  } else if (scores.left < scores.right) {
    image(endImgRight, 0,0);
    textSize(30);
    text('Player 2 won !', width / 2, 270);
    textSize(15);
    text("Player 1 Scores: " + scores.left, 100, 250);
    text("Player 2 Scores: " + scores.right, 500, 250);
    //textStr = "Player 2 won!";
    //gameOver = endImg.right[0];
  } else {
    image(endImgDraw, 0,0);
    textSize(30);
    text('DRAW', width / 2, 285);
    textSize(15);
    text("Player 1 Scores: " + scores.left, 100, 50);
    text("Player 2 Scores: " + scores.right, 500, 50);
    //textStr = "Draw";
    //gameOver = endImg.draw[0];
  }
}


function preload() {
  coverImg = loadImage('cover.png');
  
  imgs.left.push(
    loadImage('pic5.png'),
    loadImage('pic6.png'),
    loadImage('pic7.png'),
    loadImage('pic8.png')
  );

  imgs.right.push(
    loadImage('pic1.png'),
    loadImage('pic2.png'),
    loadImage('pic3.png'),
    loadImage('pic4.png')
  );

  endImgLeft =  loadImage('end.png');
  endImgRight = loadImage('end2.png');
  endImgDraw = loadImage('draw.png');

  imgIndex.left = imgs.left.length;
  imgIndex.right = imgs.right.length;
}

function keyPressed() {
  if (sceneIndex === 0 && keyCode === 32) {
    sceneIndex++;
  }

  addScore(keyCode);
}

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
}

function draw() {
  switch (sceneIndex) {
    case 0:
      drawScene0();
      break;
    case 1:
      drawScene1();
      break;
    case 2:
      drawScene2();
      break;
  }
}
