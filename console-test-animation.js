let canvas;
let ctx;
let particles = [];

function setupCanvas() {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}
setupCanvas()

function update() {
  const {innerWidth, innerHeight} = window;
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particles = particles.reduce((res, p) => {
    const {
      color,
      locat,
      size,
    } = p;
    const {x, y} = locat;

    const {h, s, l} = color;
    ctx.fillStyle = `HSL(${h}, ${s}%, ${l}%)`;
    ctx.fillRect(x, y, size, size);


    if (y> 0 && y < innerHeight + size && x > 0 &&  x < innerWidth + size) {
      res.push(updateParticle(p));
    }

    return res;
  }, []);
  // Only spin the loop if we do have particles to render
  if (particles.length) {
    requestAnimationFrame(update);
  }
}

function updateParticle(particle) {
  const {
    acceleration,
    color,
    locat,
    velocity,
  } = particle;

  return {
    ...particle,
    color: {
      ...color,
      h: color.h + velocity.y
    },
    locat: addVectors(locat, velocity),
    velocity: addVectors(velocity, acceleration),
  };
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
  } = button.getBoundingClientRect();

  particles.push(...
    Array
      .from({length: Math.ceil(getRandom(10, 20))})
      .map( _ => getNewParticle(getRandom(left, right), top))
  );

  requestAnimationFrame(update);
  
}
