/**
 * Score
 */
class Score {

    public div: HTMLElement;
    public score: number = 0;
    private timer: number = 0;
    public timeDiv: HTMLElement;
    private life: HTMLElement;
    private lifeArray: any = [];

    public gameOver: boolean = false;

    private liveDiv: HTMLElement;

    constructor() {
        this.div = document.createElement("score");
        document.body.appendChild(this.div);
        this.div.innerHTML = "Score: " + this.score;

        this.timeDiv = document.createElement("time");
        document.body.appendChild(this.timeDiv);
        this.timeDiv.innerHTML = "Tijd: " + this.timer; 

        for (var i = 0; i < 210; i+= 70) {            
            this.life = document.createElement("live");
            this.lifeArray.push(this.life);
            this.life.style.left = 250 + i + "px";
            document.body.appendChild(this.life);
        }
    }

    public scoreUpdate(score: number) {
        this.score = this.score + score;
        console.log(this.score);
        console.log(this.timer);
        this.div.innerHTML = "Score: " + this.score;
    }

    public updateTimer(timer: number) {
        this.timer = timer;
        console.log(this.timer);

        this.timeDiv.innerHTML = "Tijd: " + this.timer; 
    }

    public deleteLive() {
        console.log("test!!");
        var a = this.lifeArray.pop();
        a.remove();
        if(this.lifeArray <= 0){
            console.log("gameOver!!");
            this.gameOver = true;
        } 
    }
}