/// <reference path="badfood.ts" />

/**
 * Hamburger
 */
class Hamburger extends Badfood {

    private game: Game;

    constructor(posX: number, posY:number, speed: number, apple: string, game: Game) {
        super(posX, posY, speed, apple);
        this.game = game;
    }

    public deleteHamburger () {
        if(this.foodGone == true || this.deleteFood == true) {
            this.game.deleteHamburger(this);
        }
    }
}