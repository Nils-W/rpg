// important vars

let level = 1; //player lvl
let exp = 0; // player exp
let gold = 100; // money
const date = new Date(); // date

let secondsPlayed = 0;
let minutesPlayed = 0;
let hoursPlayed = 0;

const StringOfTips = [
    "If your level is higher you get more things, when you explore",
    "resting is healthy!",
    "Money = pog!",
    "try leveling up, it really helps :)",
    "RPG Time !!!",
    "maybe you should train instead of resting, no?",
    "skibidi dab dab dab yes yes...",
    "English or Spanish",
    "Sprich deutsch du Hurensohn ;)",
    "Welcome Traveller",
    "Level 5 = Gambeling overload",
    "you can't always dodge",
    "you are the victim",
    "watch out where you are walking",
    "Game does still not save progress",
    "No sleep for devs!!!",
    "I want my money back!...wait, I didn't spend any!",
    "\"I'm working on it\" -Nils",
    "Everything in one place since day one!!!",
    "Paimon is Emergency Food",
    "under pressure like Ocean Gate",
    "This is not a banger...and I know bangers",
    "I wanna press charges",
    "I'm gonna burn your house down",
    "When life gives you lemons, squeze them and use the fluid to drown an orphan",
    "FABIAN",
    "Talahon",
    "Frankfurt",
    "A<3",
    "Welp we tried",
    "Discord > Teamspeak"
]

let exploreInterval; //Interval
let Timeplayed;

let walkduration = 0;  // Duration of walking
let walkdurationtotal = 0; // Total duration of walking
let get; // how many gold a player gets
let tripDamage = 0;
let exploring = false; // if player is exploring or not
let menu = true; // if player is in menu
let maxMoneyPossible = 10; // max gold a player can get in an action
let b=false; // if exploring is from menu
let expForLevelUp = 100; // how many exp a player needs for a level up


//fight vars 
let hitDamage = 0; // how much damage the hit is is for all enemy and player
const dialoge = [
    //slime
        "[Slime] *slime noises*",
        "[Slime] *angry slime noises*",
        "[Slime] *flirty slime noises*",
    //goblin
        "[Goblin] ARGGGGGHHHHHH",
        "[Goblin] EHHHHHHHHHHHH",
        "[Goblin] GREEEEEEEEEEE",
    //[Skeleton] 
        "[Skeleton] you fighting me?...in 105 years i was never defeated...you won't beat me... GAGAGAGA",
        "[Skeleton] Old?...yes. defeated?...No!!!",
        "[Skeleton] You won't beat me in one million years GAGAGA",
    //zombie
        "[Zombie] *angry Zombie noieses*...won't...defeat",
        "[Zombie] Who...are...you?",
        "[Zombie] Kill...me",
    //Orc
        "[Orc] DIE!!!",
        "[Orc] *angry orc noises*",
        "[Orc] AAAAAAAAAAAAAAAAHHHHH",
    //Dragon"
        "[Dragon] Human your Time to die has come",
        "[Dragon] Die a painful death",
        "[Dragon] Run if you can",
    //Giant
        "[Giant] Where are you?...ah there you are...you're just too small HAHHAHA",
        "[Giant] I crush you!",
        "[Giant] You are so fragily ",
    //Vampire
        "[Vampire] You won't hurt me",
        "[Vampire] i-is that wood?",
        "[Vampire] since when are people using that as a weapon?",
    //Night Walker
        "[Night Walker] D...I...E",
        "[Night Walker] C...O...L..D",
        "[Night Walker] K...I...L...L",
    //Demon
        "[Demon] Wanna make a deal?",
        "[Demon] you look weak...you know that right?",
        "[Demon] I think your brain is rotting to shit",
    //Bandit
        "[Bandit] I gonna steal all your money and then I'm gonna stab you like a person, who got stabed",
        "[Bandit] Wait, you can fight!?",
        "[Bandit] You're not supposed to fight back!"
    ]   
// Enemy vars
let enemyName =" Test"
let enemyHealth = 9999999999999;
let enemyDamage = 1;
let enemyExp = 10;
let enemyGold = 10;
let enemySpeed = 1;
let enemyArmor = 0;
let dialogeNum = 0;

//  Player vars
let health = 100; // player health
let maxHealth = 100; //max health
let mana = 20; //player mana
let maxMana = 20; // maximum mana
let playerDamage = 5;
let playerSpeed = 5;
let playerArmor = 0;
let manaNeeded = 10;
let manaMulti = 2;

// gambeling
let einsatz = 0;

window.onload = function() {
    
    //readcookies();
    Timeplayed = setInterval(getPlayTime, 1000);
    hide("street",true)
    update();

    disableStatsEnemy();
    

    //street button muss über update sein !!!
    hide("street",true);
    update();
    //fight bts
    hide("attack",true);
    hide("dodge",true);
    // menu bts
    hide("explore",false);
    hide("shop",true);
    

    //explore bts
    hide("goback",true);
    hide("rest",true);
    //fight bts
    
    hide("initiatAttack",true);
    hide("attack",true);
    hide("strongAttack",true);

    // gamble bts
    hide("gamble",true)
    hide("einsatzPlus",true);
    hide("einsatzMinus",true);
    hideStatsPlayer();
    tips();

};

// button functions 

function explore(){
    document.getElementById("notification").style.color = "black";
    menu = false;
    hide("explore",true);
    hide("goback",false);
    hide("shop",true);
    hide("rest",true);
    hide("street",true);
    hide("initiatAttack",true);

    //attack

    notify("explore")
    exploring = true;
    b = true;
    
    
    
    
    
}
function goback(){
    exploring = false;
    menu = true;
    walkduration = 0;
    document.getElementById("notification").style.color = "black";
    update();
    //fight bts
    hide("attack",true);
    hide("dodge",true);
    // menu bts
    hide("explore",false);
    hide("goback",true);
    hide("shop",true);
    hide("rest",true);
    hide("initiatAttack",true);
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
function attack(){
    disableButtons();
    let ASfactor = 0;
    disableButtons();
    if (enemySpeed > playerSpeed){
        let temp = Random(1,10);
        hitDamage = Random(enemyDamage-5,enemyDamage+5)
        if (hitDamage <= 0){hitDamage = 1}
        if(temp == 10){
            //crit
                setTimeout(()=>{
                    ASfactor = (playerArmor-enemySpeed)
                    if (ASfactor <= 0){ASfactor = 0}
                    hitDamage = ((hitDamage*2) - ASfactor)
                    if (hitDamage <= 0){hitDamage = enemyDamage}
                    health = health - hitDamage;
                    notify("enemyCrit")
                    update();
                    enableButtons();
                },250)
        }else if (temp >=2 && temp <=4){
            // miss
                setTimeout(()=>{
                    notify("enemyMiss")
                    update();
                },250)
        }else{
            //hit
                setTimeout(()=>{
                    ASfactor = (playerArmor-enemySpeed)
                    if (ASfactor <= 0){ASfactor = 0}
                    hitDamage = (hitDamage - ASfactor)
                    if (hitDamage <= 0){hitDamage = 1}
                    health = health - hitDamage;
                    notify("enemyHit")
                    enableButtons();
                    update();
                },250)
        }
        setTimeout(()=>{
            hitDamage = Random(playerDamage-5,playerDamage+5)
            if (hitDamage <= 0){hitDamage = 1}
            if(temp == 10){
                //crit
                setTimeout(()=>{
                    ASfactor = (enemyArmor-playerSpeed)
                    if (ASfactor <= 0){ASfactor = 0}
                    hitDamage = ((hitDamage*2) - ASfactor)
                    if (hitDamage <= 0){hitDamage = playerDamage}
                    enemyHealth = enemyHealth- hitDamage;
                    notify("playerCrit")
                    update();
                    enableButtons();
                },250)
            }else if (temp >=2 && temp <=4){
                // miss
                setTimeout(()=>{
                    notify("playerMiss")
                    update();
                },250)
            }else{
                //hit
                setTimeout(()=>{
                    ASfactor = (enemyArmor-playerSpeed)
                    if (ASfactor <= 0){ASfactor = 0}
                    hitDamage = (hitDamage - ASfactor)
                    if (hitDamage <= 0){hitDamage = 1}
                    enemyHealth = enemyHealth- hitDamage;
                    notify("playerHit")
                    update();
                },250)
                
            }
            setTimeout(() =>{
                enableButtons();
                checkFight();
            },3500)
        },3000)
    }else{
        let temp = Random(1,10);
        hitDamage = Random(playerDamage-5,playerDamage+5)
        if (hitDamage <= 0){hitDamage = 1}
        if(temp == 10){
            //crit
                setTimeout(()=>{
                    ASfactor = (enemyArmor-playerSpeed)
                    if (ASfactor <= 0){ASfactor = 0}
                    hitDamage = ((hitDamage*2) - ASfactor)
                    if (hitDamage <= 0){hitDamage = playerDamage}
                    enemyHealth = enemyHealth- hitDamage;
                    notify("playerCrit")
                    update();
                    enableButtons();
                },250)
        }else if (temp >=2 && temp <=4){
            // miss
                setTimeout(()=>{
                    notify("playerMiss")
                    update();
                },250)
        }else{
            //hit
                setTimeout(()=>{
                    ASfactor = (enemyArmor-playerSpeed)
                    if (ASfactor <= 0){ASfactor = 0}
                    hitDamage = (hitDamage - ASfactor)
                    if (hitDamage <= 0){hitDamage = 1}
                    enemyHealth = enemyHealth- hitDamage;
                    notify("playerHit")
                    enableButtons();
                    update();
                },250)
        }
        setTimeout(()=>{
            let temp = Random(1,10);
            hitDamage = Random(enemyDamage-5,enemyDamage+5)
            if (hitDamage <= 0){hitDamage = 1}
            if(temp == 10){
                //crit
                setTimeout(()=>{
                    ASfactor = (playerArmor-enemySpeed)
                    if (ASfactor <= 0){ASfactor = 0}
                    hitDamage = ((hitDamage*2) - ASfactor)
                    if (hitDamage <= 0){hitDamage = enemyDamage}
                    health = health - hitDamage;
                    notify("enemyCrit")
                    update();
                    enableButtons();
                },250)
            }else if (temp >=2 && temp <=4){
                // miss
                setTimeout(()=>{
                    notify("enemyMiss")
                    update();
                },250)
            }else{
                //hit
                setTimeout(()=>{
                    ASfactor = (playerArmor-enemySpeed)
                    if (ASfactor <= 0){ASfactor = 0}
                    hitDamage = (hitDamage - ASfactor)
                    if (hitDamage <= 0){hitDamage = 1}
                    health = health - hitDamage;
                    notify("enemyHit")
                    enableButtons();
                    update();
                },250)
                
            }
            setTimeout(() =>{
                enableButtons();
                checkFight();
            },1000)  
        },3000)
    }
    
    
}
function strongAttack(){
    disableButtons();
    let ASfactor = 0;
    disableButtons();
    if (enemySpeed > playerSpeed){
        let temp = Random(1,10);
        hitDamage = Random(enemyDamage-5,enemyDamage+5)
        if (hitDamage <= 0){hitDamage = 1}
        if(temp == 10){
            //crit
                setTimeout(()=>{
                    ASfactor = (playerArmor-enemySpeed)
                    if (ASfactor <= 0){ASfactor = 0}
                    hitDamage = ((hitDamage*2) - ASfactor)
                    if (hitDamage <= 0){hitDamage = enemyDamage}
                    health = health - hitDamage;
                    notify("enemyCrit")
                    update();
                    enableButtons();
                },250)
        }else if (temp >=2 && temp <=4){
            // miss
                setTimeout(()=>{
                    notify("enemyMiss")
                    update();
                },250)
        }else{
            //hit
                setTimeout(()=>{
                    ASfactor = (playerArmor-enemySpeed)
                    if (ASfactor <= 0){ASfactor = 0}
                    hitDamage = (hitDamage - ASfactor)
                    if (hitDamage <= 0){hitDamage = 1}
                    health = health - hitDamage;
                    notify("enemyHit")
                    enableButtons();
                    update();
                },250)
        }
        setTimeout(()=>{
            if (mana >= manaNeeded){
                mana = mana - manaNeeded;
                hitDamage = Random(playerDamage*manaMulti,(playerDamage+5)*manaMulti);
                if (hitDamage <= 0){hitDamage = 1}
                if(temp >= 90 && temp <= 100){
                    //crit
                    setTimeout(()=>{
                        ASfactor = (enemyArmor-playerSpeed)
                        if (ASfactor <= 0){ASfactor = 0}
                        hitDamage = ((hitDamage*2) - ASfactor)
                        if (hitDamage <= 0){hitDamage = playerDamage}
                        enemyHealth = enemyHealth- hitDamage;
                        notify("playerCrit")
                        update();
                        enableButtons();
                    },250)
                }else if (temp >=1 && temp <=5){
                    // miss
                    setTimeout(()=>{
                        notify("playerMiss")
                        update();
                    },250)
                }else{
                    //hit
                    setTimeout(()=>{
                        ASfactor = (enemyArmor-playerSpeed)
                        if (ASfactor <= 0){ASfactor = 0}
                        hitDamage = (hitDamage - ASfactor)
                        if (hitDamage <= 0){hitDamage = 1}
                        enemyHealth = enemyHealth- hitDamage;
                        notify("playerHit")
                        enableButtons();
                        update();
                    },250)
                    
                }
                setTimeout(() =>{
                    enableButtons();
                    checkFight();
                },3500)
            }else{
                // miss
                setTimeout(()=>{
                    notify("noMana")
                    update();
                },250)
            }
        },3000)
    }else{
        let temp = Random(1,100);
        hitDamage = Random(playerDamage-5,playerDamage+5)
        if (mana >= manaNeeded){
            mana = mana - manaNeeded;
            hitDamage = Random(playerDamage*manaMulti,(playerDamage+5)*manaMulti);
            if (hitDamage <= 0){hitDamage = 1}
            if(temp >= 90 && temp <= 100){
                //crit
                setTimeout(()=>{
                    ASfactor = (enemyArmor-playerSpeed)
                    if (ASfactor <= 0){ASfactor = 0}
                    hitDamage = ((hitDamage*2) - ASfactor)
                    if (hitDamage <= 0){hitDamage = playerDamage}
                    enemyHealth = enemyHealth- hitDamage;
                    notify("playerCrit")
                    update();
                    enableButtons();
                },250)
            }else if (temp >=1 && temp <=5){
                // miss
                setTimeout(()=>{
                    notify("playerMiss")
                    update();
                },250)
            }else{
                //hit
                setTimeout(()=>{
                    ASfactor = (enemyArmor-playerSpeed)
                    if (ASfactor <= 0){ASfactor = 0}
                    hitDamage = (hitDamage - ASfactor)
                    if (hitDamage <= 0){hitDamage = 1}
                    enemyHealth = enemyHealth- hitDamage;
                    notify("playerHit")
                    enableButtons();
                    update();
                },250)
            }
            setTimeout(() =>{
                enableButtons();
                checkFight();
            },3500)
        }else{
            // miss
            setTimeout(()=>{
                notify("noMana")
                update();
            },250)
        }
        setTimeout(()=>{
            let temp = Random(1,10);
            hitDamage = Random(enemyDamage-5,enemyDamage+5)
            if (hitDamage <= 0){hitDamage = 1}
            if(temp == 10){
                //crit
                setTimeout(()=>{
                    ASfactor = (playerArmor-enemySpeed)
                    if (ASfactor <= 0){ASfactor = 0}
                    hitDamage = ((hitDamage*2) - ASfactor)
                    if (hitDamage <= 0){hitDamage = enemyDamage}
                    health = health - hitDamage;
                    notify("enemyCrit")
                    update();
                    enableButtons();
                },250)
            }else if (temp >=2 && temp <=4){
                // miss
                setTimeout(()=>{
                    notify("enemyMiss")
                    update();
                },250)
            }else{
                //hit
                setTimeout(()=>{
                    ASfactor = (playerArmor-enemySpeed)
                    if (ASfactor <= 0){ASfactor = 0}
                    hitDamage = (hitDamage - ASfactor)
                    if (hitDamage <= 0){hitDamage = 1}
                    health = health - hitDamage;
                    notify("enemyHit")
                    enableButtons();
                    update();
                },250)
            }
            setTimeout(() =>{
                enableButtons();
                checkFight();
            },3500)
        },3000)
    }
}
function startFight(){
    update();
    hide("initiatAttack",true);
    hide("strongAttack",false);
    hide("explore",true);
    hide("goback",true);
    enableStatsEnemy();
    document.getElementById("notification").innerHTML = " "
    animateString(dialoge[dialogeNum],"notification",25);
    enableButtons();
    hide("strongAttack",false);
    hide("attack",false);
    hide("dodge",false);
}
function dodge(){
    disableButtons();
    let ASfactor = 0;
    let chance = 0;
    if (playerSpeed >= enemySpeed){
        chance = 8;
    }else{
        chance = 2;
    }
    if (Random(chance,10) <= chance){
        setTimeout(()=>{
            notify("dodged");
            enableButtons();
            update();
        },250);
    }else{
        notify("failed")
        setTimeout(()=>{
            let temp = Random(1,10);
            hitDamage = Random(enemyDamage-5,enemyDamage+5)
            if (hitDamage <= 0){hitDamage = 1}
            if(temp == 10){
                //crit
                setTimeout(()=>{
                    ASfactor = (playerArmor-enemySpeed)
                    if (ASfactor <= 0){ASfactor = 0}
                    hitDamage = ((hitDamage*2) - ASfactor)
                    if (hitDamage <= 0){hitDamage = enemyDamage}
                    health = health - hitDamage;
                    notify("enemyCrit")
                    update();
                    enableButtons();
                },250)
            }else if (temp >=2 && temp <=4){
                // miss
                setTimeout(()=>{
                    notify("enemyMiss")
                    update();
                },250)
            }else{
                //hit
                setTimeout(()=>{
                    ASfactor = (playerArmor-enemySpeed)
                    if (ASfactor <= 0){ASfactor = 0}
                    hitDamage = (hitDamage - ASfactor)
                    if (hitDamage <= 0){hitDamage = 1}
                    health = health - hitDamage;
                    notify("enemyHit")
                    enableButtons();
                    update();
                },250)
            }
            setTimeout(() =>{
                enableButtons();
                checkFight();
            },3500)
        },3000)
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





//interval
function Explore(){
    let happens = Random(1,100);
    //happens = 85;                               // delete later
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
    if(happens <= 99 && happens >= 79){
        clearInterval(exploreInterval);
        hide("explore",false)
        hide("initiatAttack",false)
        getEnemy();
        notify("fight");
    }
    if(happens == 100){
        get = Random(1000,1000+(maxMoneyPossible*10));
        gold = gold + get;
        notify("ruin");
        clearInterval(exploreInterval);
        hide("explore",false)
    }
    if(happens >= 51 && happens <= 61){
        tripDamage = (Random(0,2));
        health = health - tripDamage;
        notify("tripped")
        clearInterval(exploreInterval);
        hide("explore",false)
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
    if(fall == "ruin"){
        string = "You found a ruin. You got " + get + "gold!!!"
        if(get == (1000+(maxMoneyPossible*10))){
            string = "You found a huge quantity of gold in the ruins! to be exact " +get+ " gold!"
        }
    }
    if (fall == "tripped"){
        string ="You tripped"
        if(tripDamage == 0){
            string = "You tripped, but it didn't hurt"
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
    // fight notifcations
    if (fall == "fight"){
        string = "you see a hostile " +enemyName+ "!"
    }
    if (fall == "dead"){
        string = "YOU DIED"
    }
    // Player
    if (fall == "playerHit"){
        string = "you hit the " +enemyName+" and inflicted  " + hitDamage + " damage";
    }
    if (fall == "playerMiss"){
        string = "you missed the " +enemyName;
    }
    if (fall == "playerCrit"){
        string = enemyName+" took a critical hit that inflicted " + (hitDamage*2) + " damage";
    }
    if (fall == "noMana"){
        string = "You have not enough Mana to land a blow"
    }
    if (fall == "dodged"){
        string = "You dodged the Attack of the " + enemyName
    }
    if (fall == "failed"){
        string = "You failed to dodge the Attack of the " + enemyName
    }
    // Enemy
    if(fall=="enemyHit"){
        string = enemyName + " hit you. You took " + hitDamage + " damage"
    }
    if(fall == "enemyMiss"){
        string = enemyName + " missed you."
    }
    if(fall == "enemyCrit"){
        string = enemyName + " hit you. you took a critical hit that inflicted " + (hitDamage*2) + " damage"
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
        advance();
        level++;
        exp = exp - expForLevelUp;
        expForLevelUp = expForLevelUp+(50*level);
        notify("levelup");
    }
    // get street access if level is more than 5 
    if(level >=5 && menu == true){
        hide("street",false);
    }
    

    // Player stuff
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

    // Enemy stuff
    document.getElementById("Enemy Name").innerHTML = "Name: " +enemyName;
    document.getElementById("Enemy Health").innerHTML = "Health: " +enemyHealth;
    document.getElementById("Enemy Damage").innerHTML = "Damage: " +enemyDamage;
    document.getElementById("Enemy Speed").innerHTML = "Speed: " +enemySpeed;
    document.getElementById("Enemy Armor").innerHTML = "Armor: " +enemyArmor;

    /*// COOKIES
    setCookie("health",health);
    setCookie("level",level);
    setCookie("exp",exp)
    setCookie("gold",gold)
    setCookie("maxhealth",maxHealth)
    setCookie("mana",mana)
    setCookie("maxMana",maxMana)
    set
    */
}
function tips(){
    document.getElementById("notification").innerHTML = " ";
    if(menu == true){
    let string = " ";
    let wow = 0;
    wow = Random(0,StringOfTips.length);
    string = StringOfTips[wow]
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
function advance(){
    playerSpeed = playerSpeed + Random(0,2)*level;
    playerDamage = playerDamage + Random(0,1)*level;
    playerArmor = playerArmor + Random(0,1)*level;
    maxHealth = maxHealth + Random(5,10)*level;
    maxMana = maxMana + Random(5,10)*level;
    health = maxHealth;
    mana = maxMana;
}


// Fight functions

function getEnemy(){
    let temp = 0;
    enemyName = " ";
    temp = Random(1,11);
    if(temp == 1){
        enemyName = "Slime";
        enemyArmor = Random(0,10)
        enemyDamage = Random(1,10)
        enemySpeed = Random(1,5)
        enemyGold = Random(1,5)
        enemyExp = Random(1,10)
        enemyHealth = Random(1,10)
        dialogeNum = Random(0,2)
    }
    if(temp == 2){
        enemyName = "Goblin";
        enemyArmor = Random(0,10)
        enemyDamage = Random(1,10)
        enemySpeed = Random(0,10)
        enemyGold = Random(10,20)
        enemyExp = Random(5,15)
        enemyHealth = Random(10,20)
        dialogeNum = Random(3,5)
    }
    if(temp == 3){
        enemyName = "Skeleton";
        enemyArmor = Random(0,10)
        enemyDamage = Random(5,15)
        enemySpeed = Random(0,5)
        enemyGold = Random(5,10)
        enemyExp = Random(15,30)
        enemyHealth = Random(20,25)
        dialogeNum = Random(6,8)
    }
    if(temp == 4){
        enemyName = "Zombie";
        enemyArmor = Random(0,10)
        enemyDamage = Random(10,20)
        enemySpeed = Random(0,10)
        enemyGold = Random(20,25)
        enemyExp = Random(20,30)
        enemyHealth = Random(30,40)
        dialogeNum = Random(9,11)
    }
    if(temp == 5){
        enemyName = "Orc";
        enemyArmor = Random(1,10)
        enemyDamage = Random(5,20)
        enemySpeed = Random(0,5)
        enemyGold = Random(15,20)
        enemyExp = Random(35,45)
        enemyHealth = Random(40,50)
        dialogeNum = Random(12,14)
    }
    if(temp == 6 && walkduration > 250){
        enemyName = "Dragon";
        enemyArmor = Random(25,50)
        enemyDamage = Random(50,100)
        enemySpeed = Random(10,20)
        enemyGold = Random(200,500)
        enemyExp = Random(250,500)
        enemyHealth = Random(1000,2000)
        dialogeNum = Random(15,17);
    }
    if(temp == 7 && walkduration > 50){
        enemyName = "Giant";
        enemyArmor = Random(10,20)
        enemyDamage = Random(10,30)
        enemySpeed = Random(0,5)
        enemyGold = Random(10,50)
        enemyExp = Random(50,200)
        enemyHealth = Random(50,100)
        dialogeNum = Random(18,20)
    }
    if(temp == 8 && walkduration > 20){
        enemyName = "Vampire";
        enemyArmor = Random(1,15)
        enemyDamage = Random(5,25)
        enemySpeed = Random(10,15)
        enemyGold = Random(30,50)
        enemyExp = Random(25,75)
        enemyHealth = Random(50,75)
        dialogeNum = Random(21,23)
    }
    if(temp == 9 && date.getHours() > 18){
        enemyName = "Nigth Walker";
        enemyArmor = Random(0,5)
        enemyDamage = Random(1,25)
        enemySpeed = Random(20,25)
        enemyGold = Random(50,75)
        enemyExp = Random(100,150)
        enemyHealth = Random(30,85)
        dialogeNum = Random(24,26)
    }
    if(temp == 10 && walkduration > 100){
        enemyName = "Demon";
        enemyArmor = Random(10,30)
        enemyDamage = Random(15,40)
        enemySpeed = Random(20,30)
        enemyGold = Random(50,85)
        enemyExp = Random(150,300)
        enemyHealth = Random(75,200)
        dialogeNum = Random(27,29)
    }
    if(temp == 11 && walkduration > 50){
        enemyName = "Bandit";
        enemyArmor = Random(0,10)
        enemyDamage = Random(5,20)
        enemySpeed = Random(1,20)
        enemyGold = Random(10,100)
        enemyExp = Random(25,50)
        enemyHealth = Random(10,50)
        dialogeNum = Random(30,32)
    }
    if (enemyName == " "){
        getEnemy();
    }
    console.log(enemyName, enemyArmor, enemyDamage, enemySpeed, enemyGold, enemyExp, enemyHealth);
}
function disableStatsEnemy(){
    document.getElementById("test").style.backgroundColor = "black";
    document.getElementById("test").style.visibility = "hidden";

}
function enableStatsEnemy(){
    document.getElementById("test").style.backgroundColor = "white";
    document.getElementById("test").style.visibility = "visible";
}
function checkFight(){
    if(health <=0){
        setTimeout(()=>{
            hide("attack",true)
            hide("strongAttack",true);
            hide("dodge",true);
            string = "YOU DIED"
            document.getElementById("notification").innerHTML = " ";
            document.getElementById("notification").style.color = "red";
            animateString(string,"notification",500)
            disableStatsEnemy();
            setTimeout(()=>{
                reset();
                hide("goback",false)
            },5000)
        },2000)
    }
    if(enemyHealth <=0){
        setTimeout(()=>{
            hide("attack",true)
            hide("strongAttack",true);
            hide("dodge",true);
            string = "YOU WON"
            document.getElementById("notification").innerHTML = " ";
            document.getElementById("notification").style.color = "green";
            animateString(string,"notification",250)
            disableStatsEnemy();
            setTimeout(()=>{
                giveloot();
                hide("goback",false)
                hide("explore",false)
                enemyHealth = 9999999999999;
            },4000)
        },2000)
        
    }
}


function giveloot(){
    gold = gold + enemyGold;
    exp = exp + enemyExp;
}

// global and random functions (for fun)
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
function reset(){
    health = 100; // player health
    maxHealth = 100; //max health
    mana = 20; //player mana
    maxMana = 20; // maximum mana
    playerDamage = 5;
    playerSpeed = 5;
    playerArmor = 0;
    secondsPlayed = 0;
    minutesPlayed = 0;
    hoursPlayed = 0;
}

/*
function readcookies(){

}

function setCookie(name,data){
    document.cookie = name + "=" + data + ";"
}
*/