import {Position} from './Position'


export class Board {
 

    board:Position[] = []

   
    constructor(){
        let a:number[] = shuffle([0,0,1,1,2,2,3,3])
        let b:number[] = shuffle([4,4,5,5,6,6,7,7])
        let c:number[] = shuffle([8,8,9,9,10,10,11,11])
        let d:number[] = shuffle([12,12,13,13,14,14,15,15])
        let board:number[] = a.concat(b, c, d)
        this.board = setUpPositions(board)
    }
}


function setUpPositions(board: number[]){
  return board.map(item => {
    return new Position(item)
  })
}



function shuffle(array:number[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }