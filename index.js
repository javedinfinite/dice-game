const reader = require("readline-sync");

const players = []

let noPlayers = reader.question("Number of Player: ");
const targetPoints = reader.question("Target Points: ");
console.log("\n")



let rank = 0 //1 2 3
let roundCounter = 1

for (let i = 0; i < noPlayers; i++) {
    players.push({name:"Player-"+i, points:0, rank:0, prime:[-1, -1, -1], penalty:0})
}

const rollTheDice = (playerId) =>{

    reader.question(`Player-${playerId} its your turn, press enter to roll the dice: `);
    const rndInt = Math.floor(Math.random() * 6) + 1
    console.log("Dice value: ", rndInt)

    return rndInt
}

function isPrime(num) {
    for(var i = 2; i < num; i++)
      if(num % i === 0) return false;
    return num > 1;
  }

const primeFeature = (playerId, diceValue) =>{

    for (let i = 0; i < 3; i++) {

        if(players[playerId].prime[i]==-1){
            players[playerId].prime[i] = diceValue
            return
        }
            
    }


    players[playerId].prime.shift()
    players[playerId].prime.push(diceValue)
    
    let sum = players[playerId].prime.reduce((acc, element)=>{
        return acc + element 
    },0)

    // const primeResult = isPrime(sum)
    const primeResult = true

    if(primeResult)
    {
        
        players[playerId].points += 5 
        //iterate throuth all remaining players who is still in game and subtract 5 points

        players.forEach(element => {
            if(element.name!= 'Player-'+playerId){
                element.points -= 5
                if(element.points<0)
                    element.points = 0
            }
                
        });
        console.log(`Hurrah!...The Player-${playerId} got primeBonus######################################`)
    }


}

const play = (playerId) =>{

    let diceValue = rollTheDice(playerId)
    players[playerId].points = players[playerId].points + diceValue
    primeFeature(playerId, diceValue)
    diceValue==1? players[playerId].penalty =  players[playerId].penalty + 1 : players[playerId].penalty =  0

    if(players[playerId].points>=targetPoints){
        rank +=1
        players[playerId].rank = rank
        console.log(`\n### The target point ${targetPoints} is achieved by Player-${playerId}   with rank: ${players[playerId].rank} ###`)
    }
        

    console.log("Current rank table: ",players) //displaying rank table after each roll
    console.log("\n")
        
    if(diceValue==6 && players[playerId].points<targetPoints) {
        console.log(`\n### Hurrah! The player-${playerId} got bonus turn because player rolled a ‘6’ ###\n`)
        play(playerId)
    }

    
}

while(rank<noPlayers){

    for (let i = 0; i < noPlayers; i++) {

        if(players[i].points<targetPoints){
            if(players[i].penalty==2){
                players[i].penalty = 0
                console.log("\n### Skipping turn for the Player-"+i+" because player is penalised because of rolling ‘1’ twice consecutively ###\n")
            }
            else
                play(i)
        }
    }
 
    if(rank<noPlayers)
        console.log(`\n****************************The round ${roundCounter++} got finished, Starting  round ${roundCounter}*********************************\n`)
    else
        console.log("\n****************************Yeee...The game is finished now*********************************\n")

}




 


