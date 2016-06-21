/// <reference path="player.ts" />
/// <reference path="food.ts" />
/// <reference path="howler.d.ts"/>

/**
 * Game
 */
class Game {

    public background: HTMLElement;

    private player: Player;

    private apple: Apple;
    private banana: Banana;

    private hamburger: Hamburger;
    private fries: Fries;

    public score: Score;

    private posX: number;
    private posY: number;

    private appleArray: Array<Apple> = [];
    private bananaArray: Array<Banana> = [];

    private hamburgerArray: Array<Hamburger> = [];
    private friesArray: Array<Fries> = [];

    protected timer: number = 0;
    
    private speed: number;

    private timeCounter: any;

    private gameOver: boolean = false;

    private gameOverScreen: boolean = false; 

    private name: string;

    private sound: any;

    constructor(name: string) {
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

        //start timer
        this.timerCount(1000);

        this.player = new Player(65, 68, 87, 83);
        this.score = new Score();

        //start gameloop
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    //gameLoop function
    private gameLoop() {

        //delete when player is game over
        if(this.score.gameOver == true) {
            this.sound.stop('intro');
            this.player.character.remove();
            this.score.div.remove();
            this.score.timeDiv.remove();
            this.background.remove();
            clearInterval(this.timeCounter);
            this.gameOver = true;

            setTimeout(() => {
                this.player = null;
            }, 100); 
            if(this.gameOverScreen == false){
                new Gameover(this.score.score, this.timer, this.name);
                this.gameOverScreen = true;
            }
        }

        this.player.move();

        //loop through apple array
        for (var apple of this.appleArray) {
            apple.move();
            apple.deleteApple();
            if(apple.checkCharacterCollision(this.player, this.score)) {
            }
            if(this.gameOver == true) {
                apple.deleteDiv(apple);
                apple.deleteApple();
            }
        }

        //loop through banana array
        for (var banana of this.bananaArray) {
            banana.move();
            banana.deleteBanana();
            if(banana.checkCharacterCollision(this.player, this.score)) {
            }
            if(this.gameOver == true) {
                banana.deleteDiv(banana);
                banana.deleteBanana();
            }
        }
        
        //loop through hamburger array
        for (var hamburger of this.hamburgerArray) {
            hamburger.move();
            hamburger.deleteHamburger();
            hamburger.checkCharacterCollision(this.player, this.score);
            if(this.gameOver == true) {
	            hamburger.deleteDiv(hamburger);
                hamburger.deleteHamburger();
            }
        }

        //loop through fries array
        for (var fries of this.friesArray) {
            fries.move();
            fries.deleteFries();
            fries.checkCharacterCollision(this.player, this.score);
            if(this.gameOver == true) {
	            fries.deleteDiv(fries);
                fries.deleteFries();
            }
        }

        //start gameLoop again
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private timerCount(time: number) {
        this.timeCounter = setInterval(() => {
            this.timer++;
            this.score.updateTimer(this.timer);
            // console.log(this.timer);
            switch (this.timer) {
                    case 2:
                        console.log("Het is gewoon: " + this.timer);
                        this.addApple(9, 1000, 6);
                                                this.addHamburger(299, 1000, 8);

                    break;
                    case 10:
                        console.log("Het is gewoon: " + this.timer);
                        this.addApple(19, 700, 4);
                        this.addBanana(50, 3067, 2);
                    break;
                    case 20:
                        console.log("Het is gewoon: " + this.timer);
                        this.addApple(49, 500, 4);
                        this.addHamburger(49, 4000, 9);
                    break;  
                    case 50:
                        console.log("Het is gewoon: " + this.timer);
                        this.addApple(74, 4000, 5);
                        this.addBanana(74, 1367, 6);
                        this.addHamburger(74, 3300, 9);
                        this.addFries(74, 5000, 6);
                    break; 
                    case 75:
                        console.log("Het is gewoon: " + this.timer);
                        this.addApple(99, 2000, 4);
                        this.addBanana(99, 2400, 6);
                        this.addHamburger(99, 2967, 8);
                        this.addFries(99, 2500, 6);
                    break;    
                    case 100:
                        console.log("Het is gewoon: " + this.timer);
                        this.addApple(124, 4000, 4);
                        this.addBanana(124, 3367, 7);
                        this.addHamburger(124, 1300, 5);
                        this.addFries(124, 1300, 7);
                    break;    
                    case 125:
                        console.log("Het is gewoon: " + this.timer);
                        this.addApple(149, 4000, 5);
                        this.addBanana(149, 4200, 4);
                        this.addHamburger(149, 1300, 6);
                        this.addFries(149, 900, 6);
                    break;    
                    case 150:
                        console.log("Het is gewoon: " + this.timer);
                        this.addApple(299, 4000, 5);
                        this.addBanana(299, 3367, 5);
                        this.addHamburger(299, 1000, 8);
                        this.addFries(299, 1389, 7);
                    break;    
                    case 300:
                        console.log("Het is gewoon: " + this.timer);
                        this.addApple(399, 4000, 4);
                        this.addBanana(399, 3367, 7);
                        this.addHamburger(399, 1111, 8);
                        this.addFries(399, 678, 8);
                    break;    
                    case 400:
                        console.log("Het is gewoon: " + this.timer);
                        this.addApple(5000, 4000, 4);
                        this.addBanana(5000, 3367, 7);
                        this.addHamburger(5000, 1111, 9);
                        this.addFries(5000, 678, 9);  
                    break;                
                default:
                    break;
            }
        }, time);
        return this.timer;
    }
    
    //add apples based on input
    private addApple(time: number, speedY: number, speed: number) {
        var a = setInterval(() => {
            if(this.gameOver == false){
                this.posX = (Math.random() * (window.innerWidth));
                this.apple = new Apple(this.posX, 10, speed, "apple", this);
                this.appleArray.push(this.apple);
                // console.log("Apple added!");
            }
            if(this.timer == time || this.gameOver == true){
                clearInterval(a);
                // console.log("Apple interval cleared!");
            }
        }, speedY);
    }

    //add bananas based on input
    private addBanana(time: number, speedY: number, speed: number) {
        var a = setInterval(() => {
            if(this.gameOver == false){
                this.posX = (Math.random() * (window.innerWidth));
                this.banana = new Banana(this.posX, - 20, speed, "banana", this);
                this.bananaArray.push(this.banana);
                // console.log("Banana added")
            }
            if(this.timer == time || this.gameOver == true){
                clearInterval(a);
                // console.log("banana interval cleared!");
            }
        }, speedY);
    }

    private addHamburger(time: number, speedY: number, speed: number) {
        var a = setInterval(() => {
            if(this.gameOver == false){
                this.posX = (Math.random() * (window.innerWidth));
                this.hamburger = new Hamburger(this.posX, - 20, speed, "hamburger", this);
                this.hamburgerArray.push(this.hamburger);
                // console.log("Hamburger added!!!");
            }
            if(this.timer == time || this.gameOver == true){
                clearInterval(a);
                // console.log("Hamburger interval cleared!");
            }
        }, speedY);
    }

    private addFries(time: number, speedY: number, speed: number) {
        var a = setInterval(() => {
            if(this.gameOver == false){
                this.posX = (Math.random() * (window.innerWidth));
                this.fries = new Fries(this.posX, - 20, speed, "fries", this);
                this.friesArray.push(this.fries);
                // console.log("Fries added!!!");
            }
            if(this.timer == time || this.gameOver == true){
                clearInterval(a);
                // console.log("Fries interval cleared!");
            }
        }, speedY);
    }

    public deleteApple(apple: Apple) {
        for (var i = 0; i < this.appleArray.length; i++) {            
            if(apple == this.appleArray[i]){
                this.appleArray.splice(i, 1);
                // console.log(this.appleArray[i]);
            }
        }
    }
    
    public deleteBanana(banana: Banana) {
        for (var i = 0; i < this.bananaArray.length; i++) {            
            if(banana == this.bananaArray[i]){
                this.bananaArray.splice(i, 1);
                // console.log(this.bananaArray[i]);
            }
        }
    }
    
    public deleteHamburger(hamburger: Hamburger) {
        for (var i = 0; i < this.hamburgerArray.length; i++) {            
            if(hamburger == this.hamburgerArray[i]){
                this.hamburgerArray.splice(i, 1);
                // console.log(this.hamburgerArray[i]);
            }
        }
    }
        
    public deleteFries(fries: Fries) {
        for (var i = 0; i < this.friesArray.length; i++) {            
            if(fries == this.friesArray[i]){
                this.friesArray.splice(i, 1);
                // console.log(this.friesArray[i]);
            }
        }
    }
}