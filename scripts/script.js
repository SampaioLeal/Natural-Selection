function setup() {
  const myCanvas = createCanvas(500, 500);
  myCanvas.parent("canvas");

  creatures = [new Creature(["AABB", "SS"])];

  creatures.map((creature) => {
    creature.setPos({
      x: Math.random() * 400 + 25,
      y: Math.random() * 400 + 25,
    });
  });

  addFruit(100);
}

function draw() {
  background(255);

  frutas.map((fruta) => {
    fill("yellow");
    rect(
      fruta[0] - frutaSize / 2,
      fruta[1] - frutaSize / 2,
      frutaSize,
      frutaSize
    );
  });

  creatures.map((creature, i) => {
    const color = creature.color;

    fill(color.r, color.g, color.b);
    ellipse(
      creature.position.x,
      creature.position.y,
      creature.size,
      creature.size
    );

    const movement = creature.think();
    creature.move(
      movement[1] + movement[3] * -1,
      movement[0] * -1 + movement[2]
    );

    fill("green");
    textSize(20);
    text("Dia: " + day, 420, 480);
  });
}
