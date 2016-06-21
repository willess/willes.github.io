/// <reference path="food.ts" />

/**
 * Goodfood
 */
class Goodfood extends Food {

    protected foodGone: boolean = false;

    constructor(posX: number, posY:number, speed: number, food: string) {
        super(posX, posY, speed, food);
    }

    //check if player hits goodfood
    public checkCharacterCollision(player :Player, score: Score) {
        if (this.posX <= player.getCharacterX() + 90 && this.posX >= player.getCharacterX() - 30 && this.posY <= player.getCharacterY() + 80 && this.posY >= player.getCharacterY() - 20) {
            this.food.remove();
            if(!this.foodGone){
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
    }
}