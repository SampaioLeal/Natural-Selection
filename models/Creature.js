class Creature {
  constructor(gene) {
    this.position = { x: 0, y: 0 };
    this.hungry = 2;
    this.size = 20;

    if (gene) {
      this.gene = gene;
    } else {
      this.gene = getRandomGene();
    }

    this.color = getColor(this.gene);
    this.speed = getSpeed(this.gene);
    this.originalSpeed = getSpeed(this.gene);
    this.hungry = this.speed;
  }

  setPos(pos) {
    this.position.x = pos.x;
    if (pos.y > 500 - this.size / 2 || pos.y < 7) {
      this.position.y = pos.y - 20;
    } else {
      this.position.y = pos.y;
    }
  }

  move(x, y) {
    // TODO: train IA to detect wall collision
    if (
      this.position.x + x * this.speed > 500 - this.size / 2 ||
      this.position.x + x * this.speed < 7
    ) {
    } else {
      this.position.x += x * this.speed;
    }
    if (
      this.position.y + y * this.speed > 500 - this.size / 2 ||
      this.position.y + y * this.speed < 7
    ) {
    } else {
      this.position.y += y * this.speed;
    }

    // Detect Collision
    // creatures.map((creature) => {
    //   if (
    //     this.position.x !== creature.position.x &&
    //     this.position.y !== creature.position.y
    //   ) {
    //     if (
    //       distance(
    //         this.position.x,
    //         this.position.y,
    //         creature.position.x,
    //         creature.position.y
    //       ) < this.size
    //     ) {
    //       creature.speed = 1;
    //       setTimeout(() => {
    //         creature.speed = creature.originalSpeed;
    //       }, 500);
    //     }
    //   }
    // });

    if (isFruitHere(this.position)) {
      if (this.hungry == 0) {
        clone(this.position, this.gene);
        this.hungry = this.speed;
      } else {
        this.hungry -= 1;
      }
    }
  }

  think() {
    const nearest = getNearest(this.position);

    if (nearest == null) {
      return [0, 0, 0, 0];
    } else {
      const direction = getDirection(this.position, nearest, nearest.d);
      const input = [
        map(direction.sin, -1, 1, 0, 1),
        map(direction.cos, -1, 1, 0, 1),
      ];
      const predict = Network.run(input);

      return predict;
    }
  }
}
