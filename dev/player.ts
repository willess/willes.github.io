/**
 * Player
 */
class Player {
    
    //public variables
    public character : HTMLElement;
    
    //startposition on screen
    private posX: number;
    private posY: number;
    
    //character hp, starts at 100
    private hp: number = 100;
    
    //walk keys character
    private downkey : number;
    private upkey : number;
    private leftkey : number;
    private rightkey : number;
    
    //remember last key 
    private lastkey: number = 0; 
    
    //speed character, start all at 0
    private leftSpeed : number = 0;
    private rightSpeed : number = 0;
    private downSpeed : number = 0;
    private upSpeed : number = 0;
    
    constructor(left:number, right:number, up:number, down:number) {
        this.character = document.createElement("character");
        document.body.appendChild(this.character);
        
        //input from keyboard
        this.upkey = up;
        this.downkey = down;
        this.leftkey = left;
        this.rightkey = right;
        
        // position on screen
        this.posX = window.innerWidth/2 - 87,5;
        this.posY = window.innerHeight/2 - 87,5;
        
        // keyboard listener
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));          
        }
   
        // keyboard input changes speed
        private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.upkey:
        if(this.posY > 0){
            this.upSpeed = 10;
        }
            this.lastkey = 0;
            break;
        case this.downkey:
        if(this.posY < window.innerHeight - 83){
            this.downSpeed = 10;
        }
            break;
        case this.leftkey:
        if (this.posX > 0){
            this.leftSpeed = 20;
        }        
            this.lastkey = 1;
            break;
        case this.rightkey:
        if (this.posX < window.innerWidth - 58){
            this.rightSpeed = 20;
        }            
            this.lastkey = 2;
            break;
        }
    }
    
    // speed to 0 when keyboard input is down
    private onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.upkey:
            this.upSpeed = 0;
            break;
        case this.downkey:
            this.downSpeed = 0;
            break;
        case this.leftkey:
            this.leftSpeed = 0;
            break;
        case this.rightkey:
            this.rightSpeed = 0;
            break;
        }
    }
    
        public move() : void {
        
        this.posX = this.posX - this.leftSpeed + this.rightSpeed;
        this.posY = this.posY - this.upSpeed + this.downSpeed;

        //check right
        if(this.posX >= window.innerWidth - 83){
            this.rightSpeed = 0;
        }
        //check left
        if(this.posX < 0){
            this.leftSpeed = 0;
        }
        //check down
        if(this.posY >= window.innerHeight - 58){
            this.downSpeed = 0;
        }
        //check up
        if(this.posY < 0){
            this.upSpeed = 0;
        }
        
        //check the last key, transform and rotate the html element
        if(this.lastkey == 0){
            this.character.style.transform = "translate("+this.posX+"px, "+this.posY+"px)";

        }
        if(this.lastkey == 1){
            this.character.style.transform = "translate("+this.posX+"px, "+this.posY+"px) rotate(315deg)";

        }        
        if(this.lastkey == 2){
            this.character.style.transform = "translate("+this.posX+"px, "+this.posY+"px) rotate(45deg)";

        }       
    }

    public getCharacterX() {
        return this.posX;
    }

    public getCharacterY() {
        return this.posY;
    }
}