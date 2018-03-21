let canvas;
let ctx;
let particles = [];

function setupCanvas() {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  requestAnimationFrame(update);
}
setupCanvas()

function update() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles = particles.reduce((res, p, index) => {
    const {
    acceleration,
      color,
      locat,
      size,
      velocity,
    } = p;
    const {x, y} = locat;

    const {h, s, l} = color;
    ctx.fillStyle = `HSL(${h}, ${s}%, ${l}%)`;
    ctx.fillRect(x, y, size, size);


    if (y> 0 && y < window.innerHeight + size && x > 0 &&  x < window.innerWidth + size) {
      res.push(updateParticle(p));
    }

    return res;
  }, []);
  requestAnimationFrame(update);
}

function updateParticle(particle) {
  const {
    acceleration,
    color,
    locat,
    velocity,
  } = particle;

  return Object.assign({}, particle, {
    color: Object.assign({}, color, {
      h: color.h + velocity.y
    }),
    locat: addVectors(locat, velocity),
    velocity: addVectors(velocity, acceleration),
  });
}

function getNewParticle(x, y) {
  return {
    acceleration: {
      x: getRandom(-1, 1),
      y: getRandom(-1, 1),
    },
    color: Math.random() > 0.5
      ? {h: 56 , s: 100, l: 49.8 }
      : { h: 334.6, s: 97.9, l: 63.1 },
    locat: {x,y},
    size: getRandom(5, 10),
    velocity: {
      x: getRandom(-20, 20),
      y: getRandom(-20, 20),
    },
  }
}

function addVectors(v1, v2) {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
  };
}

function getRandom(min = 0, max = 1) {
  return min + (Math.random() * (max - min));
}

function onButtonActivate(button) {
  const {
    left,
    top,
    right,
    bottom,
    x
  } = button.getBoundingClientRect();

  particles.push(...
    Array
      .from({length: Math.ceil(getRandom(10, 20))})
      .map( _ => getNewParticle(getRandom(left, right), top))
  );
}