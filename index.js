const reader = require("readline-sync");

const players = []
let noPlayers = reader.question("Number of Player: ");
const targetPoints = reader.question("Target Points: ");
let rank = 0

for (let i = 0; i < noPlayers; i++) {
    players.push({name:"Player-"+i, order:i, points:0, rank:0, penalty:0})
}

const roleTheDice = (i) =>{

    reader.question(`Player-${i} its your turn, press enter to roll the dice: `);
    const rndInt = Math.floor(Math.random() * 6) + 1
    console.log("dice value",rndInt)
    return rndInt
}

const play = (i) =>{
    let diceValue = roleTheDice(i)
    players[i].points = players[i].points + diceValue
    if(diceValue==1)
        players[i].penalty =  players[i].penalty + 1
    else
        players[i].penalty =  0

    if(diceValue==6 && players[i].points<targetPoints) 
        play(i)
    
}

while(rank<noPlayers){

    for (let i = 0; i < noPlayers; i++) {
        if(players[i].points<targetPoints){
            if(players[i].penalty==2)
                players[i].penalty = 0
            else
                play(i)
        }
        else if(players[i].points>=targetPoints && players[i].rank==0){
            rank +=1
            players[i].rank = rank
            console.log(` The target point ${targetPoints} is achieved by Player-${i}   with rank: ${players[i].rank}`)
        }
    }

    console.log("Current rank table: ",players)

}



 


