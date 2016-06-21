/// <reference path="goodfood.ts" />

/**
 * Apple
 */
class Apple extends Goodfood {
    
    // protected apple: HTMLElement;
    private game: Game;
    
    constructor(posX: number, posY:number, speed: number, apple: string, game: Game) {
        super(posX, posY, speed, apple);
        this.game = game;
    }

    public deleteApple () {
        if(this.foodGone == true || this.deleteFood == true) {
            this.game.deleteApple(this);
        }
    }
    
}