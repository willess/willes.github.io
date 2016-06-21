/// <reference path="badfood.ts" />


/**
 * Fries
 */
class Fries extends Badfood {

    private game: Game;

    constructor(posX: number, posY:number, speed: number, apple: string, game: Game) {
        super(posX, posY, speed, apple);
        this.game = game;
    }

    public deleteFries () {
        if(this.foodGone == true || this.deleteFood == true) {
            this.game.deleteFries(this);
        }
    }
}