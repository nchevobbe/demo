// Default export
export default () => {
  console.log('This is my cool module');
};

// Named export `rainbowLog`
export const rainbowLog = (str) => {
  let colors = Array.from(str).map(c => `color: hsl(${Math.random() * 360}, ${Math.random() * 90}%, 60%); font-size: ${10 + Math.random() * 20}px;`);
  console.log(Array.from(str).map(c => `%c${c}`).join(""), ...colors)
};
