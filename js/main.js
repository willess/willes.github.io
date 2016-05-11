//
// OPDRACHT
//
// 1
// VOEG VIA JAVASCRIPT EEN VIS EN EEN BUBBLE TOE
// ZET DE VIS OP EEN WILLEKEURIGE PLEK IN HET SCHERM MET EEN WILLEKEURIGE KLEUR
// ZET DE BUBBLE OP EEN WILLEKEURIGE X POSITIE

// 2
// MAAK EEN FOR LOOP DIE 50 VISJES EN BUBBLES TOEVOEGT. DEZE MOETEN ALLEMAAL ANDERS ZIJN!

// 3
// GEBRUIK NU SETTIMOUT OF SETINTERVAL OM NIEUWE VISJES EN BUBBLES TE PLAATSEN

// 4
// PLAATS EEN TITEL EN START KNOP. ALS JE OP START KLIKT VERDWIJNEN DE TITEL EN KNOP, EN 
// DAARNA WORDEN PAS DE VISJES GETEKEND

// 5 
// HANG EEN CLICK EVENT LISTENER AAN ELK VISJE. ALS GEKLIKT WORDT
// GEEF JE DE GEKLIKTE VIS EEN NIEUWE CLASS DIE EEN ANDERE ACHTERGROND HEEFT 
// fish.classList.add(".deadfish");


//declare variables for global use
var fish = 0;
var addFish;
var ul;

//function that starts after the page is fully loaded
function startGame(){
    //var fish = document.getElementsByTagName("fish")[0];

    //for(var j = 0; j < 50; j++) {

    //every 0,1 second, do the createFish function
          addFish = setInterval(createFish, 100);

        //clearInterval(test);
    //}

    // demo code : verander basis positie
    //fish.style.left = "150px";
    //fish.style.top = "150px";

    // demo code : verander kleur
    //fish.style.webkitFilter = "hue-rotate(45deg)";
    //fish.style.filter = "hue-rotate(45deg)";

    // demo code : verander basis positie
    //var bubble = document.getElementsByTagName("bubble")[0];
    //bubble.style.left = "200px";
    //bubble.style.top = "0px";
}

//
// start the game on window load
//
window.addEventListener("load", init);

function init() {

    //call the startGame function
    startGame();

    //get the id of the element fishes
    ul = document.getElementById('fishes');

    //console log
    console.log(ul);
    ul.addEventListener('click', getFish);
    //getFish();
}

//create fishes
function createFish(j) {

    //add 1 to fishes every time the function is called
    fish = fish + 1;

    //console log the number of fishes
    console.log(fish);

    //is fish reach the number of 50 clear the interval
    // so the function will not be called again
    if (fish >= 50){
        console.log('EINDE VAN ALLE VISSEN!!');

        //clear the interval
        clearInterval(addFish);
    }

    //get the first tagname ul
    var ul = document.getElementsByTagName('ul')[0];

    //for(var j = 0; j < 50; j++) {

        //generate a random number between 1 and 1500 (padding left)
        var randomLeft = Math.floor((Math.random() * 1500) + 1);

        //generate a random number between 1 and 600 (padding top)
        var randomTop = Math.floor((Math.random() * 600) + 1);

        //generate a random number between 1 and 360 (hue rotate)
        var randomDeg = Math.floor((Math.random() * 360) + 1);
        //console.log(j);
        //console.log(randomLeft);
        //console.log(randomTop);

            //creating variable with a li element
            var createFish = document.createElement('li');

            //set id on
            createFish.setAttribute('id', fish);
            createFish.setAttribute('class', 'fish');

            createFish.style.left = randomLeft + "px";
            createFish.style.top = randomTop + "px";

            createFish.style.webkitFilter = "hue-rotate(" + randomDeg + "deg)";
            createFish.style.filter = "hue-rotate(195deg)";

            ul.appendChild(createFish);

            var createBubble = document.createElement('bubble');

            createBubble.style.left = randomLeft + "px";
            createBubble.style.top =  "0px";

            ul.appendChild(createBubble);

    //if(fish >= 50) {
    //    clearInterval();
    //}
    //}
}

function getFish(e) {
    //ul.getElementsByTagName('li');
    //console.log(ul);
    //console.log(e.target);

    var id = e.target.id;
    console.log(id);

    var deathFish = document.getElementById(id);
    deathFish.setAttribute('class', 'deathFish');
    deathFish.style.webkitFilter = "grayscale(100%)";
    //deathFish(target);
    //if (e.target && e.target.nodeName == "LI") {
    //    console.log(e.target.id + " was clicked");
    //}
}

//function deathFish(id) {
//    var getFish
//}
