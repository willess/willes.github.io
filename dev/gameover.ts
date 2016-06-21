/**
 * Gameover
 */
class Gameover {

private score: number;
private gameOver: HTMLElement;
private startWrapper: HTMLElement;

private gameOverTitle: HTMLElement;

private gameOverText: HTMLElement;
private playAgainButton: HTMLElement;

private sound: any;

    constructor(score: number, time: number, name: string) {

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

        //main button with startgame
        this.playAgainButton = document.createElement("button");
        this.playAgainButton.setAttribute("id", "playAgainButton");
        this.playAgainButton.innerHTML = "Play Again";
        this.startWrapper.appendChild(this.playAgainButton);
        this.playAgainButton.addEventListener("click", this.playAgain.bind(this));
    }

    private playAgain() {
        this.sound.stop('gameover');
        this.startWrapper.remove();
        var a: boolean = true;
        new Startscreen(a);
    }
}