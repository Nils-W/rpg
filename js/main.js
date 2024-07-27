// important vars

let level = 1; //player lvl
let exp = 0; // player exp
let gold = 100; // money
const date = new Date(); // date

let secondsPlayed = 0;
let minutesPlayed = 0;
let hoursPlayed = 0;



let exploreInterval; //Interval
let Timeplayed;
let walkduration = 0;  // Duration of walking
let walkdurationtotal = 0; // Total duration of walking
let get; // how many gold a player gets
let exploring = false; // if player is exploring or not
let menu = true; // if player is in menu
let maxMoneyPossible = 10; // max gold a player can get in an action
let b=false; // if exploring is from menu
let expForLevelUp = 100; // how many exp a player needs for a level up


//fight vars 
let hitDamage = 0; // how much damage the hit is is for all enemy and player
// Enemy vars
let enemyName =" "
let enemyHealth = 10;
let enemyDamage = 1;
let enemyExp = 10;
let enemyGold = 10;
let enemySpeed = 1;
let enemyArmor = 0;

//  Player vars
let health = 100; // player health
let maxHealth = 100; //max health
let mana = 20; //player mana
let maxMana = 20; // maximum mana
let playerDamage = 1;
let playerSpeed = 5;
let playerArmor = 0;

// gambeling
let einsatz = 0;

window.onload = function() {

    Timeplayed = setInterval(getPlayTime, 1000);
    hide("street",true)
    update();
    

    //street button muss über update sein !!!
    hide("street",true);
    update();
    //fight bts
    hide("attack",true);
    hide("heal",true);
    // menu bts
    hide("explore",false);
    hide("shop",false);
    

    //explore bts
    hide("goback",true);
    hide("rest",true);
    //fight bts
    hide("Enemy-container",true);
    hide("initiatAttack",true);
    hide("attack",true);
    hide("strongAttack",true);

    // gamble bts
    hide("gamble",true)
    hide("einsatzPlus",true);
    hide("einsatzMinus",true);
    hideStats();
    tips();
};

// button functions 

function explore(){
    
    menu = false;
    hide("explore",true);
    hide("goback",false);
    hide("shop",true);
    hide("rest",true);
    hide("street",true);

    //attack

    notify("explore")
    exploring = true;
    b = true;
    
    
    
    
    
}
function goback(){
    exploring = false;
    menu = true;
    walkduration = 0;
    update();
    //fight bts
    hide("attack",true);
    hide("heal",true);
    // menu bts
    hide("explore",false);
    hide("goback",true);
    hide("shop",false);
    hide("rest",true);
    tips();
    clearInterval(exploreInterval);
}
function gotorest(){
    let acvExp = 0;
    let acvHealth = Random(1,maxHealth/2);
    let acvMana = Random(1,maxMana/2)
    let cXP = Random(1,10);
    if (cXP <= 3){
        acvExp = Random(1,expForLevelUp/10);
    }
    health = health + acvHealth;
    if(health > maxHealth){
        health = maxHealth;
    } 
    mana = mana + acvMana;
    if(mana > maxMana){
        mana = maxMana;
    }
    exp = exp + acvExp;
    update();
    hide("rest",true);
    if(acvExp > 0){
        notify("training");
    }else{
        notify("resting");
    }
    
}

//div functions 
function showStatsPlayer(){
    hide("health",true);
    hide("mana",true);
    hide("level",true);
    hide("exp",true);
    hide("gold",true);

    hide("walk",false);
    hide("time",false);
    hide("speed",false);
    hide("damage",false);
    hide("Armor",false);
    update();
    document.body.style.cursor = "help";
}
function hideStatsPlayer(){
    hide("health",false);
    hide("mana",false);
    hide("level",false);
    hide("exp",false);
    hide("gold",false);

    hide("walk",true);
    hide("time",true);
    hide("speed",true);
    hide("damage",true);
    hide("Armor",true);
    update();
    document.body.style.cursor = "default";
}

function showStatsEnemy(){
    hide("Enemy Name",true);
    hide("Enemy Health",true);
    hide("Enemy Damage",true);

    hide("Enemy Speed",true);
    hide("Enemy Armor",true);
    hide("possiblCrit",true);
    update();
    document.body.style.cursor = "help";
}	
function hideStatsEnemy(){
    hide("Enemy Name",false);
    hide("Enemy Health",false);
    hide("Enemy Damage",false);

    hide("Enemy Speed",false);
    hide("Enemy Armor",false);
    hide("possiblCrit",false);
    update();
    document.body.style.cursor = "default";
}

//interval
function Explore(){
    let happens = Random(1,100);
    walkduration++
    walkdurationtotal++
    if(happens <= 30){
        get = Random(1,maxMoneyPossible);
        gold = gold + get;
        notify("gold");
        clearInterval(exploreInterval);
        hide("explore",false)
    }
    if(happens <= 50 && happens >=30){
        clearInterval(exploreInterval);
        hide("explore",false)
        hide("rest",false)
        notify("rest");
        
    }
    if(happens <= 99 && happens >= 89){
        clearInterval(exploreInterval);
        hide("explore",false)
        hide("initiatAttack",false)
        getEnemy();
        notify("fight");
    }
    update();
}



// Other functions

function notify(fall){
    let string = " ";
    disableButtons();
    document.getElementById("notification").innerHTML = " ";
    if (fall == "gold"){
        string ="You found " +get+ " gold!"
        if(get == maxMoneyPossible){
            string = "You found a huge quantity of gold! to be exact " +get+ " gold!"
        }
        
    }
    if (fall == "rest"){
        string = "You found a place to rest, if you want to you can even take a nap"
          
    }
    if (fall == "explore"){
        
        string = "You left the city and started to search for adventures"
        if (exploring == true){
            string = "You are resuming your adventure, so far you have walked for " +walkduration+ " KM"
        }
    }
    if (fall == "heal"){
        string = "you healed yourself"
    }
    if (fall == "resting"){
        string = "you rested a bit and you feel refreshed"
    }
    if (fall == "training"){
        string = "you rested a bit and you feel refreshed... you even trained a bit"
    }
    if (fall == "levelup"){
        string = "you leveled up! you are now level " +level+ "!"
        
    }
    if (fall == "fight"){
        string = "you see a hostile " +enemyName+ "!"
    }
    if (fall == "damagedone"){
        string = "you hit the " +enemyName+" and inflicted  " + hitDamage + "damage";
    }
    animateString(string, "notification", 25)
    

    
}
function animateString(str, outputElementId, delay) {
    if(delay !=0){
    const outputElement = document.getElementById(outputElementId);
    let index = 0;
  
    const intervalId = setInterval(() => {
      if (index < str.length) {
        outputElement.textContent += str.charAt(index);
        index++;
      } else {
        clearInterval(intervalId); // Stop the animation when done
        enableButtons();
      }
    }, delay);
}
    if(delay == 0){
        const outputElement = document.getElementById(outputElementId);
        outputElement.textContent = str;
        enableButtons();
    }
  }
function update(){

    //check for lvl up
    if(exp >= expForLevelUp){
        menu = false;
        level++;
        exp = exp - expForLevelUp;
        expForLevelUp = expForLevelUp+(50*level);
        notify("levelup");
    }
    // get street access if level is more than 5 
    if(level >=5 && menu == true){
        hide("street",false);
    }


    document.getElementById("health").innerHTML = "Health: " +health+"/"+maxHealth;
    document.getElementById("mana").innerHTML = "Mana: " +mana+"/"+maxMana;
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1986246335.
    document.getElementById("level").innerHTML = "Level: " +level;
    document.getElementById("exp").innerHTML = "Exp: " +exp+"/"+expForLevelUp;
    document.getElementById("gold").innerHTML = "Gold: " +gold;
    document.getElementById("speed").innerHTML = "Speed: " +playerSpeed;
    document.getElementById("damage").innerHTML = "Damage: " +playerDamage;
    document.getElementById("Armor").innerHTML = "Armor: " +playerArmor;
    document.getElementById("walk").innerHTML = "Walked in Total: " +walkdurationtotal+ " KM";
    document.getElementById("time").innerHTML = "Time played: " +hoursPlayed+":"+minutesPlayed+":"+secondsPlayed;


    
}
function tips(){
    console.log("Tips");
    document.getElementById("notification").innerHTML = " ";
    if(menu == true){
    let string = " ";
    let wow = 10;
    wow = Random(1,10);
    console.log(wow);
    if(wow == 1){
        string = "If your level is higher you get more things, when you explore";
    }
    if(wow == 2){
        string = "resting is healthy!";
    }
    if(wow == 3){
        string = "Money = pog!";
    }
    if(wow == 4){
        string = "try leveling up, it really helps :)";
    }
    if(wow == 5){
        string = "RPG Time !!!";
    }
    if(wow == 6){
        string = "maybe you should train instead of resting, no?";
    }
    if(wow == 7){
        string = "skibidi dab dab dab yes yes...";
    }
    if(wow == 8){
        string = "English or Spanish";
    }
    if(wow == 9){
        string = "Sprich deutsch du Hurensohn ;)";
    }
    if(wow == 10){
        string = "Welcome Traveller";
    }
    animateString(string, "notification", 25)
    
    }
}
function disableButtons() {
  const buttons = document.querySelectorAll('button'); // Get all buttons

  buttons.forEach(button => {
    button.disabled = true; // Disable each button
  });
  if (exploring == true){
    clearInterval(exploreInterval);
  }
}
function enableButtons() {
    const buttons = document.querySelectorAll('button'); // Get all buttons
  
    buttons.forEach(button => {
      button.disabled = false; // enable each button
    });
    if (exploring == true && b == true){
        exploreInterval = setInterval(Explore, 1000);
        b = false;
      }
  }
function Random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function hide(ElementID,bool){
    if(bool == true){
        document.getElementById(ElementID).style.display = "none";
    }
    if(bool == false){
        document.getElementById(ElementID).style.display = "unset";
    }
}

// Fight functions

function getEnemy(){
    let temp = 0;
    temp = Random(1,11);
    if(temp == 1){
        enemyName = "Slime";
    }
    if(temp == 2){
        enemyName = "Goblin";
    }
    if(temp == 3){
        enemyName = "Skeleton";
    }
    if(temp == 4){
        enemyName = "Zombie";
    }
    if(temp == 5){
        enemyName = "Orc";
    }
    if(temp == 6 && walkduration > 250){
        enemyName = "Dragon";
        enemyArmor = Random(25,50)
        enemyDamage = Random(50,100)
        enemySpeed = Random(10,20)
        enemyGold = Random(100,200)
        enemyExp = Random(100,200)
        enemyHealth = Random(1000,2000)
    }
    if(temp == 7 && walkduration > 50){
        enemyName = "Giant";
    }
    if(temp == 8 && walkduration > 20){
        enemyName = "Vampire";
    }
    if(temp == 9 && date.getHours() > 18){
        enemyName = "Nigth Walker";
    }
    if(temp == 10 && walkduration > 100){
        enemyName = "Demon";
    }
    if(temp == 11 && walkduration > 50){
        enemyName = "Bandit";
    }

}

function getPlayTime(){
    secondsPlayed++;
    if(secondsPlayed == 60){
        minutesPlayed++;
        secondsPlayed = 0;
    }
    if(minutesPlayed == 60){
        hoursPlayed++;
        minutesPlayed = 0;
    }
    
}