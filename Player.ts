export class Player{
    limit:number = 0
    color:string = ""
    tokens:number
    score:number
    direction:string
    position:number
    escaped:boolean

    constructor(limit:number, color:string){
        this.limit = limit
        this.color = color
        this.tokens = 0
        this.score = 0
        this.direction = "down"
        this.position = 0
        this.escaped = true
    }
}