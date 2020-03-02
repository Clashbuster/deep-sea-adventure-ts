import {Board} from './Board'
import {Player} from './Player'
import {Position} from './Position'

var air:number = 25
var gameEnd:boolean = false
let board = new Board

function takeTurn(player:Player){
    if(player.tokens === player.limit){
        console.log("checking if player should head upwards")
        player.direction = "up"
    }

    if(player.direction === "down"){
        //this executes if the player is headed down
        if(player.escaped === true){
            //this executes if the player has not entered the board and is headed down
            console.log(`${player.color} is moving down`)
            player.escaped = false
            let path:number = rollDice()
            console.log(`${player.color} rolled a :`, path)
            path -= player.tokens

            if(path < 0){
                path = 0
            }

            console.log(`But ${player.color} has ${player.tokens} tokens`)
            console.log(`So ${player.color} is only moving ${path} positions`)
            player.position += path
            let landingPosition:any = land(player)
            let currentPosition:Position = board.board[landingPosition - 1]
            if(currentPosition === undefined){
                console.log("something went wrong")
            } else {
                currentPosition.player = true
                takeChip(player, currentPosition) 
            }
        } else {
            //this executes if the player has entered the board but is still headed down
            if(air <= 0){
                gameEnd = true
                return "The game has ended"
            } else {
                air -= player.tokens
            }
            console.log(`${player.color} is moving down`)
            console.log(`${player.color} is at ${player.position}`)

            let recentPosition:Position = board.board[player.position - 1]
            recentPosition.player = false
            let path:number = rollDice()
            console.log(`${player.color} rolled a :`, path)
            path -= player.tokens

            if(path < 0){
                path = 0
            }

            console.log(`But ${player.color} has ${player.tokens} tokens`)
            console.log(`So ${player.color} is only moving ${path} positions`)
            player.position += path
            let landingPosition:any = land(player)


                if(board.board[landingPosition - 1] === undefined){
                    
                    let currentPosition:any = board.board[board.board.length - 1]
                    currentPosition.player = true 
                    player.position = board.board.length - 1
                    player.direction = "up"
                    takeChip(player, currentPosition)
                } else {
                    let currentPosition:Position = board.board[landingPosition - 1]
                    currentPosition.player = true
                    takeChip(player, currentPosition) 
                }
        }
    } else {
        //this executes if the player is headed up
        if(player.escaped === true){
            // this executes if the player is headed up and has escaped already
            console.log(`${player.color} has already escaped`)
        } else {
             // this executes if the player has not escaped and is headed upwards

            if(air <= 0){
                gameEnd = true
                return "The game has ended"
            } else {
                air -= player.tokens
            }

            console.log(`${player.color} is moving up`)
            let recentPosition:Position = board.board[player.position - 1]
            recentPosition.player = false
            let path:number = rollDice()
            console.log(`${player.color} rolled a :`, path)
            path -= player.tokens

            if(path < 0){
                path = 0
            }


            console.log(`But ${player.color} has ${player.tokens} tokens`)
            console.log(`So ${player.color} is only moving ${path} positions`)
            player.position -= path
            let landingPosition:any = land(player)
                if(board.board[landingPosition - 1] === undefined){
                    player.escaped = true
                } else {
                    let currentPosition:Position = board.board[landingPosition - 1]
                    currentPosition.player = true  
                }
        }
    }
}

function takeChip(player:Player, position:Position){
    if(player.tokens < player.limit){
        if(position.empty === false){
            player.tokens += 1
            player.score += position.value
            position.empty = true
            console.log("this player picked up a", position.value)
        } else {
            return null
        }
    } else {
        return null
    }
}


function land(player:Player){
    let temposition:Position | undefined = board.board[player.position]
    if(temposition === undefined){
        return player.position
    } else {
        if(temposition.player === false){
            return player.position
        } else {
            player.position += 1
            land(player)
        }
    }
}




function notAtLimit(player:Player){
    if(player.tokens < player.limit){
        return true
    } else {
        return false
    }
}


function rollDice(){
    let dice1:number = Math.ceil(Math.random() * 3)
    let dice2:number = Math.ceil(Math.random() * 3)
    return dice1 + dice2
}

let limits:number[] = [1,2,3]


function runGame(players:number){
    let colors: string[] = ["red", "blue", "black", "purple", "yellow", "green"]
    let allPlayers: Player[] = []
    for(let i:number = 0; i < players; i++){
        
       allPlayers.push(new Player(limits[i], colors[i]))
    }


    while(gameEnd === false){
        console.log("checking game end")
        let endChecker = 0
        for(let player of allPlayers){
            if(player.escaped === true){
                endChecker += 1
            }
            if(player.direction === "up"){
                endChecker += 1
            }
        }

        if(endChecker === allPlayers.length * 2){
            gameEnd = true
        }



        for(let player of allPlayers){
            takeTurn(player)
        }
    }

    if(gameEnd === true){
        console.log("*************")
        console.log("the game has ended")
        for(let player of allPlayers){
            console.log(player.color)
            console.log("scored", player.score)
            console.log("player escaped?", player.escaped)
            console.log("*************")
        }
    }
}



console.log("final board state")

function stage2(){
    let newboard: Position[] = board.board.filter(item => {
            item.empty === false
        })

    air = 25
    gameEnd = false
    board.board = newboard

    runGame(3)
}

function stage3(){
            let newboard: Position[] = board.board.filter(item => {
                item.empty === false
            })

        air = 25
        gameEnd = false
        board.board = newboard

        runGame(3)
}


runGame(3)
stage2()
stage3()

