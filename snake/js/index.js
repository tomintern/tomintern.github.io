"use strict";

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

var RIGHT = 0;
var DOWN = 1;
var LEFT = 2;
var UP = 3;

var START = 0;
var PLAYING = 1;
var END = 2;

var direction = RIGHT;
var length = 4;
var cadence = 50;
var lastNow = null;
var state = START;

var worm = [[4, 4], [4, 3], [4, 2], [4, 1]];
var apples = [];
var commands = [];

var tiles = [];
for (var y = 0; y < 32; y++) {
  for (var x = 0; x < 32; x++) {
    tiles.push(Math.random());
  }
}

function update(now) {
  if (state === START || state === END) {
    return;
  }

  if (lastNow === null) {
    lastNow = now;
  }

  if (now - lastNow > cadence) {
    lastNow = now;

    if (commands.length > 0) {
      var changeTo = commands.shift();
      if (direction !== changeTo) {
        direction = changeTo;
      }
    }

    var last = worm.pop();
    if (length > worm.length) {
      worm.push([last[0], last[1]]);
    }

    var first = worm[0];
    if (direction === RIGHT) {
      last[0] = first[0] + 1;
      last[1] = first[1];
    } else if (direction === DOWN) {
      last[0] = first[0];
      last[1] = first[1] + 1;
    } else if (direction === LEFT) {
      last[0] = first[0] - 1;
      last[1] = first[1];
    } else {
      last[0] = first[0];
      last[1] = first[1] - 1;
    }

    if (last[0] < 0 || last[1] < 0 || last[0] > 31 || last[1] > 31) {
      state = END;
      return;
    }

    for (var _iterator = worm, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var part = _ref;

      if (last[0] === part[0] && last[1] === part[1]) {
        state = END;
        return;
      }
    }

    worm.unshift(last);

    if (apples.length < 2) {
      var x = Math.round(Math.random() * 31);
      var y = Math.round(Math.random() * 31);
      apples.push([x, y]);
    }

    for (var index = apples.length - 1; index >= 0; index--) {
      var apple = apples[index];
      if (apple[0] === last[0] && apple[1] === last[1]) {
        length++;
        apples.splice(index, 1);
      }
    }
  }
}

function render(now) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var index = 0; index < tiles.length; index++) {
    var x = index % 32;
    var y = Math.floor(index / 32);
    tiles[index] += 0.01;
    var alpha = Math.sin(tiles[index] * Math.PI * 2.0);
    context.fillStyle = "rgba(0,0,0," + (0.1 + alpha * 0.05) + ")";
    context.fillRect(x * 16, y * 16, 16, 16);
  }

  context.fillStyle = "#333";
  for (var _iterator2 = worm, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref2 = _i2.value;
    }

    var part = _ref2;

    context.fillRect(part[0] * 16, part[1] * 16, 16, 16);
  }

  context.fillStyle = "#f00";
  for (var _iterator3 = apples, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
    var _ref3;

    if (_isArray3) {
      if (_i3 >= _iterator3.length) break;
      _ref3 = _iterator3[_i3++];
    } else {
      _i3 = _iterator3.next();
      if (_i3.done) break;
      _ref3 = _i3.value;
    }

    var apple = _ref3;

    context.fillRect(apple[0] * 16, apple[1] * 16, 16, 16);
  }

  if (state === START || state === END) {
    context.font = "900 36px Exo";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#333";
    if (state === START) {
      context.fillText("CLICK TO PLAY", canvas.width * 0.5, canvas.height * 0.5);
    } else if (state === END) {
      context.fillText("GAME OVER", canvas.width * 0.5, canvas.height * 0.5);
      context.font = "900 18px Exo";
      context.fillText("CLICK TO PLAY", canvas.width * 0.5, canvas.height * 0.55);
    }
  }
}

function frame(now) {
  update(now);
  render(now);
  window.requestAnimationFrame(frame);
}

function key(e) {
  if (e.keyCode === 37 || e.keyCode === 65) {
    if (direction != RIGHT) {
      commands.push(LEFT);
    }
  } else if (e.keyCode === 38 || e.keyCode === 87) {
    if (direction != DOWN) {
      commands.push(UP);
    }
  } else if (e.keyCode === 39 || e.keyCode === 68) {
    if (direction != LEFT) {
      commands.push(RIGHT);
    }
  } else if (e.keyCode === 40 || e.keyCode === 83) {
    if (direction != UP) {
      commands.push(DOWN);
    }
  } else if (e.keyCode === 32) {
    startGame();
  }
}

function startGame() {
  if (state === START || state === END) {
    state = PLAYING;
    length = 4;
    direction = RIGHT;
    while (apples.pop()) {}
    while (worm.pop()) {}
    while (commands.pop()) {}
    worm.push([4, 4], [4, 3], [4, 2], [4, 1]);
  }
}

function click(e) {
  startGame();
}

frame(0);

window.addEventListener("keyup", key);
canvas.addEventListener("click", click);