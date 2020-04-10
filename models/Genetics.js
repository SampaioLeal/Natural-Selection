function clone(pos, gene) {
  const clone = new Creature(gene);
  clone.setPos({ x: pos.x, y: pos.y + 20 });
  creatures.push(clone);
}

function getRandomGene() {
  function setAlelo(dom, rec) {
    return Math.random() > 0.5 ? dom : rec;
  }

  // gene = ["AAbb", ]
  let gene = [];

  // Color
  let color = "";
  color += setAlelo("A", "a");
  color += setAlelo("A", "a");
  color += setAlelo("B", "b");
  color += setAlelo("B", "b");
  gene.push(color);

  // Speed
  let speed = "";
  speed += setAlelo("S", "s");
  speed += setAlelo("S", "s");
  gene.push(speed);

  return gene;
}

// Cor (Herança Quantitativa)
// AABB - Negro
// AABb, AaBB - Moreno Escuro
// AAbb, aaBB, AaBb - Moreno Médio
// Aabb, aaBb - Moreno Médio
// aabb - Branco
function getColor(gene) {
  const num = (gene[0].match(/[A-Z]/g) || []).length;

  if (num == 4) {
    return { r: 141, g: 85, b: 36 };
  } else if (num == 3) {
    return { r: 198, g: 134, b: 66 };
  } else if (num == 2) {
    return { r: 224, g: 172, b: 105 };
  } else if (num == 1) {
    return { r: 241, g: 194, b: 125 };
  } else if (num == 0) {
    return { r: 255, g: 219, b: 172 };
  } else {
    return { r: 0, g: 0, b: 0 };
  }
}

// Velocidade (Herança Quantitava)
// Regra: Rápidos -> fome = 3
// SS - Rápido
// Ss - Médio
// ss - Devagar
function getSpeed(gene) {
  const num = (gene[1].match(/[A-Z]/g) || []).length;

  if (num == 2) {
    return 3;
  } else if (num == 1) {
    return 2;
  } else if (num == 0) {
    return 1;
  }
}

// Tamanho (Epistasia Dominante)
// MMcc, Mmcc -  Grande
// mmcc - Médio
// MMCc, MmCc, MMCC, MMCc - Pequeno

// Grupo Sanguíneo
// Sistema ABO
// Sistema RH
// Sistema MN
// Sangue dourado
// Marcadores genéticos

// Reprodução:
// Crossing-Over
// Linkage
// Mutação
// 1° e 2° Lei de Mendel
// Herança ligada aos cromossomos sexuais
