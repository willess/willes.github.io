/// <reference path="goodfood.ts" />

/**
 * Banana
 */
class Banana extends Goodfood {
        
    // protected banana: HTMLElement;
    private game: Game;
        
    constructor(posX: number, posY:number, speed: number, banana: string, game: Game) {
        super(posX, posY, speed, banana);
        this.game = game;
    }
        public deleteBanana () {
        if(this.foodGone == true || this.deleteFood == true) {
            this.game.deleteBanana(this);
        }
    }
}