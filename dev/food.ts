/// <reference path="game.ts" />


/**
 * Food
 */
class Food {

    private div: HTMLElement;
    
    //position of food
    protected posX: number;
    protected posY: number;
    
    //speed food
    protected speedX: number;
    protected speedY: number;
    
    //the food element
    protected food: HTMLElement;

    protected deleteFood: boolean = false;
    
    constructor(posX: number, posY:number, speed: number, food: string) {
        
        this.food = document.createElement(food);
        document.body.appendChild(this.food);
        
        //get the position of food
        this.posX = posX;
        this.posY = posY;
        this.speedY = speed;
        this.speedX = 0;      
    }
        
        public move() :void {
            
            this.posX += this.speedX;
            this.posY += this.speedY;

            if(this.posY > window.innerHeight) {
                this.food.remove();
                this.deleteFood = true;
            }
            
            this.food.style.transform = "translate("+this.posX+"px, "+this.posY+"px)";
        }

        public scoreFeedback(plusMin: string, score: number, color: string) {
                this.div = document.createElement("scoreFeedback");
                this.div.innerHTML = plusMin + score;
                this.div.style.color = color;
                this.div.style.transform = "translate("+this.posX+"px, "+this.posY+"px)";
                document.body.appendChild(this.div);
                setTimeout(() => {
                    this.div.remove();
                }, 150);
        }
        
        public deleteDiv(food: any) {
            this.food.remove();
            // food.div.remove();
        }
}