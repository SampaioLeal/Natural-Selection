const trainingData = [
  // left
  {
    input: [0.5, 0],
    output: [0, 0, 0, 1],
  },
  // right
  {
    input: [0.5, 1],
    output: [0, 1, 0, 0],
  },
  // up
  {
    input: [1, 0.5],
    output: [1, 0, 0, 0],
  },
  // down
  {
    input: [0, 0.5],
    output: [0, 0, 1, 0],
  },

  // // up-left
  // {
  //   input: [1, 0],
  //   output: [1, 0, 0, 1],
  // },
  // // up-right
  // {
  //   input: [1, 1],
  //   output: [1, 1, 0, 0],
  // },
  // // down-right
  // {
  //   input: [0, 1],
  //   output: [0, 1, 1, 0],
  // },
  // // down-left
  // {
  //   input: [0, 0],
  //   output: [0, 0, 1, 1],
  // },
];

const Network = new brain.NeuralNetwork({ hidddenLayers: [3] });
Network.train(trainingData);

const dayTime = 5000;
const chartTime = 1000;
let frutas = [];
let creatures;
let day = 0;

const frutaSize = 10;

// dayCycle
setInterval(() => {
  killHungryCreatures();
  addFruit(100);
  day += 1;
}, dayTime);

function addFruit(num) {
  if (num) {
    for (let i = 0; i < num; i++) {
      frutas.push([Math.random() * 480 + 10, Math.random() * 480 + 10]);
    }
  } else {
    frutas.push([Math.random() * 480 + 10, Math.random() * 480 + 10]);
  }
}
function distance(Ax, Ay, Bx, By) {
  const x = Bx - Ax;
  const y = By - Ay;
  const d = Math.sqrt(x ** 2 + y ** 2);
  return d;
}
function getDirection(A, B, H) {
  const o = B.y - A.y;
  const a = B.x - A.x;

  const sin = o / H;
  const cos = a / H;

  return { sin: sin * -1, cos };
}

function getNearest(pos) {
  let nearest = [];
  let d = null;

  frutas.map((fruit) => {
    let dist = distance(pos.x, pos.y, fruit[0], fruit[1]);

    if (d === null) {
      d = dist;
      nearest = fruit;
    } else if (dist < d) {
      d = dist;
      nearest = fruit;
    }
  });

  if (d == null) {
    return null;
  } else {
    return { x: nearest[0], y: nearest[1], d };
  }
}

function isFruitHere(pos) {
  let result = false;
  frutas.map((fruta, i) => {
    if (distance(pos.x, pos.y, fruta[0], fruta[1]) < 1) {
      frutas.splice(i, 1);
      result = true;
    }
  });
  return result;
}

function killHungryCreatures() {
  function isNotHungry(creature) {
    return creature.hungry < creature.speed;
  }
  creatures = creatures.filter(isNotHungry);
}
