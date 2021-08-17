const reader = require("readline-sync");

const players = []
let noPlayers = reader.question("Number of Player: ");
const targetPoints = reader.question("Target Points: ");
console.log("\n")

let rank = 0
let roundCounter = 0

for (let i = 0; i < noPlayers; i++) {
    players.push({name:"Player-"+i, order:i, points:0, rank:0, penalty:0})
}

const rollTheDice = (playerId) =>{

    reader.question(`Player-${playerId} its your turn, press enter to roll the dice: `);
    const rndInt = Math.floor(Math.random() * 6) + 1
    console.log("Dice value: ", rndInt)

    return rndInt
}

const play = (playerId) =>{

    let diceValue = rollTheDice(playerId)
    players[playerId].points = players[playerId].points + diceValue
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
        console.log(`\n****************************The round ${roundCounter++} got finished, Starting new round*********************************\n`)
    else
        console.log("\n****************************Yeee...The game is finished now*********************************\n")

}




 


