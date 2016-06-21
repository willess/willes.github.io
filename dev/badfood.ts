/// <reference path="food.ts" />

/**
 * Badfood
 */
class Badfood extends Food {

    protected foodGone: boolean = false;

    constructor(posX: number, posY:number, speed: number, food: string) {
        super(posX, posY, speed, food);

    }
    //check if player hits badfood
    public checkCharacterCollision(player :Player, score: Score) {
        if (this.posX <= player.getCharacterX() + 90 && this.posX >= player.getCharacterX() - 30 && this.posY <= player.getCharacterY() + 80 && this.posY >= player.getCharacterY() - 20) {
            this.food.remove();
            if(!this.foodGone){
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
    }
}