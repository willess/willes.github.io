/**
 * Startscreen
 */
class Startscreen {

    private startWrapper: HTMLElement;
    private startButton: HTMLElement;
    private instructions: HTMLElement;

    private playerName: string;

    private sound: any;

    public nameTextField: HTMLInputElement;
    constructor(reload: boolean) {
        if(reload) {
            location.reload();
        }

        this.startWrapper = document.createElement("wrapper");
        this.startWrapper.setAttribute("id", "startWrapper");
        document.body.appendChild(this.startWrapper);
        
        //player input field
        this.nameTextField = document.createElement("input");
        this.nameTextField.setAttribute("class", "textfield");
        this.nameTextField.setAttribute("id", "playerInput");
        this.nameTextField.setAttribute("type", "text");
        this.nameTextField.setAttribute("value", "");
        this.nameTextField.setAttribute("placeholder", "Jouw naam");
        this.startWrapper.appendChild(this.nameTextField);

        //main button with startgame
        this.startButton = document.createElement("button");
        this.startButton.setAttribute("id", "startButton");
        this.startButton.innerHTML = "Start game";
        this.startWrapper.appendChild(this.startButton);
        this.startButton.addEventListener("click", this.startGame.bind(this));

        this.instructions = document.createElement("instructionText");
        this.instructions.innerHTML = "Vang alles wat gezond is en ontwijk alles was ongezond is! Speel met je toetsenbord(W A S D) om de fruitschaal te bewegen"
        this.startWrapper.appendChild(this.instructions);
    }

    private startGame() {
        this.sound = new Howl({
            urls: ["sound/button.wav"],
            sprite: {
                button: [0, 110000],
            }
        });

        this.sound.play('button');
        this.startWrapper.remove();
        this.playerName = this.nameTextField.value;
        new Game(this.playerName);
    }
}