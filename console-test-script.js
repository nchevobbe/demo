const foo = "foo";
const bar = "bar";
let notCollapsed = true;
async function handleTestCase(testCase) {
  switch (testCase) {
    case "concatenate" : console.log("foo: ", foo, "bar: ", bar);break;
    case "shorthand" : console.log({foo, bar});break;
    case "timing" :
      console.log("start recording");
      console.time("foo");
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.timeEnd("foo");
      break;
    case "table" :
      console.table(["🔥","🦊","💥"]);
      console.table({foo, bar});
      console.table((new WeakMap()).set({foo}, "my foo obj").set({bar}, "my bar obj"));
      console.table((new Set()).add(foo).add(bar));
      break;
    case "collapsed" :
      if (notCollapsed) {
        console.log("Add 50 messages");
        logMany(50)
        notCollapsed = false;
      } else {
        console.log("create a collapsed group");
        console.groupCollapsed("foo");
        logMany(50)
        console.groupEnd();
        console.log("group is closed")
      }

      break;
  }
}

function logMany(number) {
  for (let i = 0; i < number; i++) {
    console.log("message", i);
  }
}

let currentGroup = 0;
let streamTimeoutId;
function handleLog(key) {
  switch (key) {
    case "L" : console.log({a : Math.ceil(Math.random()*100), b: "b", c: [1,2,3]});break;
    case "E" : console.error("Console.error", Math.random()*100, document);break;
    case "w" : console.warn("Console.warn", Math.random()*100);break;
    case "i" : console.info("Console.info", Math.random()*100);break;
    case "d" : console.debug("Console.debug", Math.random()*100);break;
    case "l" : console.log("Repeat");break;
    case "G" : console.group("Group", ++currentGroup);break;
    case "C" : console.groupCollapsed("Group collapsed", ++currentGroup);break;
    case "g" : console.groupEnd();break;
    case "T" : console.time("Timer");break;
    case "t" : console.timeEnd("Timer");break;
    case "r" : function foo(){console.trace()};foo();break;
    case "c" : console.count("My counter");break;
    case "e" : throw new Error(Math.random()*100);break;
    case "X" : console.log(Error("bar"));break;
    case "x" : fetch("https://api.github.com");break;
    case "s" :
      if (!streamTimeoutId) {
        streamLogs();
      } else {
        clearTimeout(streamTimeoutId);
        streamTimeoutId = null;
      }
      break;
  }
}

function streamLogs() {
  console.log("Streaming logs", new Date());
  streamTimeoutId = setTimeout(streamLogs, 0);
}

function tpw(silent = false) {
  const x = document.createElement("img");
  let i = parseInt(sessionStorage.getItem("tpw", 0))
  if (isNaN(i)) {
    i = 0;
  }
  x.src = "https://a.postrelease.com/?"+(++i);
  sessionStorage.setItem("tpw", i);
  document.body.appendChild(x);
  if (!silent) console.log("tpw", x);
}
