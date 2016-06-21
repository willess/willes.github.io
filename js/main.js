var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Player = (function () {
    function Player(left, right, up, down) {
        this.hp = 100;
        this.lastkey = 0;
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.character = document.createElement("character");
        document.body.appendChild(this.character);
        this.upkey = up;
        this.downkey = down;
        this.leftkey = left;
        this.rightkey = right;
        this.posX = window.innerWidth / 2 - 87, 5;
        this.posY = window.innerHeight / 2 - 87, 5;
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.upkey:
                if (this.posY > 0) {
                    this.upSpeed = 10;
                }
                this.lastkey = 0;
                break;
            case this.downkey:
                if (this.posY < window.innerHeight - 83) {
                    this.downSpeed = 10;
                }
                break;
            case this.leftkey:
                if (this.posX > 0) {
                    this.leftSpeed = 20;
                }
                this.lastkey = 1;
                break;
            case this.rightkey:
                if (this.posX < window.innerWidth - 58) {
                    this.rightSpeed = 20;
                }
                this.lastkey = 2;
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
            case this.leftkey:
                this.leftSpeed = 0;
                break;
            case this.rightkey:
                this.rightSpeed = 0;
                break;
        }
    };
    Player.prototype.move = function () {
        this.posX = this.posX - this.leftSpeed + this.rightSpeed;
        this.posY = this.posY - this.upSpeed + this.downSpeed;
        if (this.posX >= window.innerWidth - 83) {
            this.rightSpeed = 0;
        }
        if (this.posX < 0) {
            this.leftSpeed = 0;
        }
        if (this.posY >= window.innerHeight - 58) {
            this.downSpeed = 0;
        }
        if (this.posY < 0) {
            this.upSpeed = 0;
        }
        if (this.lastkey == 0) {
            this.character.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
        }
        if (this.lastkey == 1) {
            this.character.style.transform = "translate(" + this.posX + "px, " + this.posY + "px) rotate(315deg)";
        }
        if (this.lastkey == 2) {
            this.character.style.transform = "translate(" + this.posX + "px, " + this.posY + "px) rotate(45deg)";
        }
    };
    Player.prototype.getCharacterX = function () {
        return this.posX;
    };
    Player.prototype.getCharacterY = function () {
        return this.posY;
    };
    return Player;
}());
var Game = (function () {
    function Game(name) {
        this.appleArray = [];
        this.bananaArray = [];
        this.hamburgerArray = [];
        this.friesArray = [];
        this.timer = 0;
        this.gameOver = false;
        this.gameOverScreen = false;
        this.name = name;
        this.background = document.createElement("game");
        document.body.appendChild(this.background);
        this.sound = new Howl({
            urls: ["sound/gamesound1.mp3"],
            loop: true,
            sprite: {
                intro: [4000, 110000],
            }
        });
        this.sound.play('intro');
        this.timerCount(1000);
        this.player = new Player(65, 68, 87, 83);
        this.score = new Score();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        if (this.score.gameOver == true) {
            this.sound.stop('intro');
            this.player.character.remove();
            this.score.div.remove();
            this.score.timeDiv.remove();
            this.background.remove();
            clearInterval(this.timeCounter);
            this.gameOver = true;
            setTimeout(function () {
                _this.player = null;
            }, 100);
            if (this.gameOverScreen == false) {
                new Gameover(this.score.score, this.timer, this.name);
                this.gameOverScreen = true;
            }
        }
        this.player.move();
        for (var _i = 0, _a = this.appleArray; _i < _a.length; _i++) {
            var apple = _a[_i];
            apple.move();
            apple.deleteApple();
            if (apple.checkCharacterCollision(this.player, this.score)) {
            }
            if (this.gameOver == true) {
                apple.deleteDiv(apple);
                apple.deleteApple();
            }
        }
        for (var _b = 0, _c = this.bananaArray; _b < _c.length; _b++) {
            var banana = _c[_b];
            banana.move();
            banana.deleteBanana();
            if (banana.checkCharacterCollision(this.player, this.score)) {
            }
            if (this.gameOver == true) {
                banana.deleteDiv(banana);
                banana.deleteBanana();
            }
        }
        for (var _d = 0, _e = this.hamburgerArray; _d < _e.length; _d++) {
            var hamburger = _e[_d];
            hamburger.move();
            hamburger.deleteHamburger();
            hamburger.checkCharacterCollision(this.player, this.score);
            if (this.gameOver == true) {
                hamburger.deleteDiv(hamburger);
                hamburger.deleteHamburger();
            }
        }
        for (var _f = 0, _g = this.friesArray; _f < _g.length; _f++) {
            var fries = _g[_f];
            fries.move();
            fries.deleteFries();
            fries.checkCharacterCollision(this.player, this.score);
            if (this.gameOver == true) {
                fries.deleteDiv(fries);
                fries.deleteFries();
            }
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Game.prototype.timerCount = function (time) {
        var _this = this;
        this.timeCounter = setInterval(function () {
            _this.timer++;
            _this.score.updateTimer(_this.timer);
            switch (_this.timer) {
                case 2:
                    console.log("Het is gewoon: " + _this.timer);
                    _this.addApple(9, 1000, 6);
                    break;
                case 10:
                    console.log("Het is gewoon: " + _this.timer);
                    _this.addApple(19, 700, 4);
                    _this.addBanana(50, 3067, 2);
                    break;
                case 20:
                    console.log("Het is gewoon: " + _this.timer);
                    _this.addApple(49, 500, 4);
                    _this.addHamburger(49, 4000, 9);
                    break;
                case 50:
                    console.log("Het is gewoon: " + _this.timer);
                    _this.addApple(74, 4000, 5);
                    _this.addBanana(74, 1367, 6);
                    _this.addHamburger(74, 3300, 9);
                    _this.addFries(74, 5000, 6);
                    break;
                case 75:
                    console.log("Het is gewoon: " + _this.timer);
                    _this.addApple(99, 2000, 4);
                    _this.addBanana(99, 2400, 6);
                    _this.addHamburger(99, 2967, 8);
                    _this.addFries(99, 2500, 6);
                    break;
                case 100:
                    console.log("Het is gewoon: " + _this.timer);
                    _this.addApple(124, 4000, 4);
                    _this.addBanana(124, 3367, 7);
                    _this.addHamburger(124, 1300, 5);
                    _this.addFries(124, 1300, 7);
                    break;
                case 125:
                    console.log("Het is gewoon: " + _this.timer);
                    _this.addApple(149, 4000, 5);
                    _this.addBanana(149, 4200, 4);
                    _this.addHamburger(149, 1300, 6);
                    _this.addFries(149, 900, 6);
                    break;
                case 150:
                    console.log("Het is gewoon: " + _this.timer);
                    _this.addApple(299, 4000, 5);
                    _this.addBanana(299, 3367, 5);
                    _this.addHamburger(299, 1000, 8);
                    _this.addFries(299, 1389, 7);
                    break;
                case 300:
                    console.log("Het is gewoon: " + _this.timer);
                    _this.addApple(399, 4000, 4);
                    _this.addBanana(399, 3367, 7);
                    _this.addHamburger(399, 1111, 8);
                    _this.addFries(399, 678, 8);
                    break;
                case 400:
                    console.log("Het is gewoon: " + _this.timer);
                    _this.addApple(5000, 4000, 4);
                    _this.addBanana(5000, 3367, 7);
                    _this.addHamburger(5000, 1111, 9);
                    _this.addFries(5000, 678, 9);
                    break;
                default:
                    break;
            }
        }, time);
        return this.timer;
    };
    Game.prototype.addApple = function (time, speedY, speed) {
        var _this = this;
        var a = setInterval(function () {
            if (_this.gameOver == false) {
                _this.posX = (Math.random() * (window.innerWidth));
                _this.apple = new Apple(_this.posX, 10, speed, "apple", _this);
                _this.appleArray.push(_this.apple);
            }
            if (_this.timer == time || _this.gameOver == true) {
                clearInterval(a);
            }
        }, speedY);
    };
    Game.prototype.addBanana = function (time, speedY, speed) {
        var _this = this;
        var a = setInterval(function () {
            if (_this.gameOver == false) {
                _this.posX = (Math.random() * (window.innerWidth));
                _this.banana = new Banana(_this.posX, -20, speed, "banana", _this);
                _this.bananaArray.push(_this.banana);
            }
            if (_this.timer == time || _this.gameOver == true) {
                clearInterval(a);
            }
        }, speedY);
    };
    Game.prototype.addHamburger = function (time, speedY, speed) {
        var _this = this;
        var a = setInterval(function () {
            if (_this.gameOver == false) {
                _this.posX = (Math.random() * (window.innerWidth));
                _this.hamburger = new Hamburger(_this.posX, -20, speed, "hamburger", _this);
                _this.hamburgerArray.push(_this.hamburger);
            }
            if (_this.timer == time || _this.gameOver == true) {
                clearInterval(a);
            }
        }, speedY);
    };
    Game.prototype.addFries = function (time, speedY, speed) {
        var _this = this;
        var a = setInterval(function () {
            if (_this.gameOver == false) {
                _this.posX = (Math.random() * (window.innerWidth));
                _this.fries = new Fries(_this.posX, -20, speed, "fries", _this);
                _this.friesArray.push(_this.fries);
            }
            if (_this.timer == time || _this.gameOver == true) {
                clearInterval(a);
            }
        }, speedY);
    };
    Game.prototype.deleteApple = function (apple) {
        for (var i = 0; i < this.appleArray.length; i++) {
            if (apple == this.appleArray[i]) {
                this.appleArray.splice(i, 1);
            }
        }
    };
    Game.prototype.deleteBanana = function (banana) {
        for (var i = 0; i < this.bananaArray.length; i++) {
            if (banana == this.bananaArray[i]) {
                this.bananaArray.splice(i, 1);
            }
        }
    };
    Game.prototype.deleteHamburger = function (hamburger) {
        for (var i = 0; i < this.hamburgerArray.length; i++) {
            if (hamburger == this.hamburgerArray[i]) {
                this.hamburgerArray.splice(i, 1);
            }
        }
    };
    Game.prototype.deleteFries = function (fries) {
        for (var i = 0; i < this.friesArray.length; i++) {
            if (fries == this.friesArray[i]) {
                this.friesArray.splice(i, 1);
            }
        }
    };
    return Game;
}());
var Food = (function () {
    function Food(posX, posY, speed, food) {
        this.deleteFood = false;
        this.food = document.createElement(food);
        document.body.appendChild(this.food);
        this.posX = posX;
        this.posY = posY;
        this.speedY = speed;
        this.speedX = 0;
    }
    Food.prototype.move = function () {
        this.posX += this.speedX;
        this.posY += this.speedY;
        if (this.posY > window.innerHeight) {
            this.food.remove();
            this.deleteFood = true;
        }
        this.food.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
    };
    Food.prototype.scoreFeedback = function (plusMin, score, color) {
        var _this = this;
        this.div = document.createElement("scoreFeedback");
        this.div.innerHTML = plusMin + score;
        this.div.style.color = color;
        this.div.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
        document.body.appendChild(this.div);
        setTimeout(function () {
            _this.div.remove();
        }, 150);
    };
    Food.prototype.deleteDiv = function (food) {
        this.food.remove();
    };
    return Food;
}());
var Goodfood = (function (_super) {
    __extends(Goodfood, _super);
    function Goodfood(posX, posY, speed, food) {
        _super.call(this, posX, posY, speed, food);
        this.foodGone = false;
    }
    Goodfood.prototype.checkCharacterCollision = function (player, score) {
        if (this.posX <= player.getCharacterX() + 90 && this.posX >= player.getCharacterX() - 30 && this.posY <= player.getCharacterY() + 80 && this.posY >= player.getCharacterY() - 20) {
            this.food.remove();
            if (!this.foodGone) {
                var sound = new Howl({
                    urls: ["sound/confirm.mp3"],
                    sprite: {
                        confirm: [0, 150000],
                    }
                });
                sound.play('confirm');
                score.scoreUpdate(1);
                this.scoreFeedback("+ ", 1, "lawngreen");
                this.foodGone = true;
            }
        }
    };
    return Goodfood;
}(Food));
var Apple = (function (_super) {
    __extends(Apple, _super);
    function Apple(posX, posY, speed, apple, game) {
        _super.call(this, posX, posY, speed, apple);
        this.game = game;
    }
    Apple.prototype.deleteApple = function () {
        if (this.foodGone == true || this.deleteFood == true) {
            this.game.deleteApple(this);
        }
    };
    return Apple;
}(Goodfood));
var Badfood = (function (_super) {
    __extends(Badfood, _super);
    function Badfood(posX, posY, speed, food) {
        _super.call(this, posX, posY, speed, food);
        this.foodGone = false;
    }
    Badfood.prototype.checkCharacterCollision = function (player, score) {
        if (this.posX <= player.getCharacterX() + 90 && this.posX >= player.getCharacterX() - 30 && this.posY <= player.getCharacterY() + 80 && this.posY >= player.getCharacterY() - 20) {
            this.food.remove();
            if (!this.foodGone) {
                var sound = new Howl({
                    urls: ["sound/wrong.wav"],
                    sprite: {
                        wrong: [0, 200],
                    }
                });
                sound.play('wrong');
                score.scoreUpdate(-10);
                score.deleteLive();
                this.scoreFeedback("- ", 10, "red");
                this.foodGone = true;
            }
        }
    };
    return Badfood;
}(Food));
var Banana = (function (_super) {
    __extends(Banana, _super);
    function Banana(posX, posY, speed, banana, game) {
        _super.call(this, posX, posY, speed, banana);
        this.game = game;
    }
    Banana.prototype.deleteBanana = function () {
        if (this.foodGone == true || this.deleteFood == true) {
            this.game.deleteBanana(this);
        }
    };
    return Banana;
}(Goodfood));
var Fries = (function (_super) {
    __extends(Fries, _super);
    function Fries(posX, posY, speed, apple, game) {
        _super.call(this, posX, posY, speed, apple);
        this.game = game;
    }
    Fries.prototype.deleteFries = function () {
        if (this.foodGone == true || this.deleteFood == true) {
            this.game.deleteFries(this);
        }
    };
    return Fries;
}(Badfood));
var Gameover = (function () {
    function Gameover(score, time, name) {
        this.sound = new Howl({
            urls: ["sound/gameover.wav"],
            sprite: {
                gameover: [0, 110000],
            }
        });
        this.sound.play('gameover');
        this.score = score;
        this.gameOver = document.createElement("gameOver");
        document.body.appendChild(this.gameOver);
        this.startWrapper = document.createElement("wrapper");
        this.startWrapper.setAttribute("id", "startWrapper");
        this.gameOver.appendChild(this.startWrapper);
        this.gameOverTitle = document.createElement("gameOverTitle");
        this.gameOverTitle.innerHTML = "Game Over";
        this.startWrapper.appendChild(this.gameOverTitle);
        this.gameOverText = document.createElement("gameOverText");
        this.gameOverText.innerHTML = "Naam: " + name + "<br /><br />Score: " + score + "<br /><br /> Tijd: " + time + " Seconden <br /><br /> Nog een keer spelen?";
        this.startWrapper.appendChild(this.gameOverText);
        this.playAgainButton = document.createElement("button");
        this.playAgainButton.setAttribute("id", "playAgainButton");
        this.playAgainButton.innerHTML = "Play Again";
        this.startWrapper.appendChild(this.playAgainButton);
        this.playAgainButton.addEventListener("click", this.playAgain.bind(this));
    }
    Gameover.prototype.playAgain = function () {
        this.sound.stop('gameover');
        this.startWrapper.remove();
        var a = true;
        new Startscreen(a);
    };
    return Gameover;
}());
var Hamburger = (function (_super) {
    __extends(Hamburger, _super);
    function Hamburger(posX, posY, speed, apple, game) {
        _super.call(this, posX, posY, speed, apple);
        this.game = game;
    }
    Hamburger.prototype.deleteHamburger = function () {
        if (this.foodGone == true || this.deleteFood == true) {
            this.game.deleteHamburger(this);
        }
    };
    return Hamburger;
}(Badfood));
window.addEventListener("load", function () {
    var a = false;
    new Startscreen(a);
});
var Score = (function () {
    function Score() {
        this.score = 0;
        this.timer = 0;
        this.lifeArray = [];
        this.gameOver = false;
        this.div = document.createElement("score");
        document.body.appendChild(this.div);
        this.div.innerHTML = "Score: " + this.score;
        this.timeDiv = document.createElement("time");
        document.body.appendChild(this.timeDiv);
        this.timeDiv.innerHTML = "Tijd: " + this.timer;
        for (var i = 0; i < 210; i += 70) {
            this.life = document.createElement("live");
            this.lifeArray.push(this.life);
            this.life.style.left = 250 + i + "px";
            document.body.appendChild(this.life);
        }
    }
    Score.prototype.scoreUpdate = function (score) {
        this.score = this.score + score;
        console.log(this.score);
        console.log(this.timer);
        this.div.innerHTML = "Score: " + this.score;
    };
    Score.prototype.updateTimer = function (timer) {
        this.timer = timer;
        console.log(this.timer);
        this.timeDiv.innerHTML = "Tijd: " + this.timer;
    };
    Score.prototype.deleteLive = function () {
        console.log("test!!");
        var a = this.lifeArray.pop();
        a.remove();
        if (this.lifeArray <= 0) {
            console.log("gameOver!!");
            this.gameOver = true;
        }
    };
    return Score;
}());
var Startscreen = (function () {
    function Startscreen(reload) {
        if (reload) {
            location.reload();
        }
        this.startWrapper = document.createElement("wrapper");
        this.startWrapper.setAttribute("id", "startWrapper");
        document.body.appendChild(this.startWrapper);
        this.nameTextField = document.createElement("input");
        this.nameTextField.setAttribute("class", "textfield");
        this.nameTextField.setAttribute("id", "playerInput");
        this.nameTextField.setAttribute("type", "text");
        this.nameTextField.setAttribute("value", "");
        this.nameTextField.setAttribute("placeholder", "Jouw naam");
        this.startWrapper.appendChild(this.nameTextField);
        this.startButton = document.createElement("button");
        this.startButton.setAttribute("id", "startButton");
        this.startButton.innerHTML = "Start game";
        this.startWrapper.appendChild(this.startButton);
        this.startButton.addEventListener("click", this.startGame.bind(this));
        this.instructions = document.createElement("instructionText");
        this.instructions.innerHTML = "Vang alles wat gezond is en ontwijk alles was ongezond is! Speel met je toetsenbord(W A S D) om de fruitschaal te bewegen";
        this.startWrapper.appendChild(this.instructions);
    }
    Startscreen.prototype.startGame = function () {
        this.sound = new Howl({
            urls: ["sound/button.wav"],
            sprite: {
                button: [0, 110000],
            }
        });
        this.sound.play('button');
        this.startWrapper.remove();
        this.playerName = this.nameTextField.value;
        new Game(this.playerName);
    };
    return Startscreen;
}());
//# sourceMappingURL=main.js.map