"use strict";
exports.__esModule = true;
var Board_1 = require("./Board");
var Player_1 = require("./Player");
var air = 25;
var gameEnd = false;
var board = new Board_1.Board;
function takeTurn(player) {
    if (player.tokens === player.limit) {
        console.log("checking if player should head upwards");
        player.direction = "up";
    }
    if (player.direction === "down") {
        //this executes if the player is headed down
        if (player.escaped === true) {
            //this executes if the player has not entered the board and is headed down
            console.log(player.color + " is moving down");
            player.escaped = false;
            var path = rollDice();
            console.log(player.color + " rolled a :", path);
            path -= player.tokens;
            if (path < 0) {
                path = 0;
            }
            console.log("But " + player.color + " has " + player.tokens + " tokens");
            console.log("So " + player.color + " is only moving " + path + " positions");
            player.position += path;
            var landingPosition = land(player);
            var currentPosition = board.board[landingPosition - 1];
            if (currentPosition === undefined) {
                console.log("something went wrong");
            }
            else {
                currentPosition.player = true;
                takeChip(player, currentPosition);
            }
        }
        else {
            //this executes if the player has entered the board but is still headed down
            if (air <= 0) {
                gameEnd = true;
                return "The game has ended";
            }
            else {
                air -= player.tokens;
            }
            console.log(player.color + " is moving down");
            console.log(player.color + " is at " + player.position);
            var recentPosition = board.board[player.position - 1];
            recentPosition.player = false;
            var path = rollDice();
            console.log(player.color + " rolled a :", path);
            path -= player.tokens;
            if (path < 0) {
                path = 0;
            }
            console.log("But " + player.color + " has " + player.tokens + " tokens");
            console.log("So " + player.color + " is only moving " + path + " positions");
            player.position += path;
            var landingPosition = land(player);
            if (board.board[landingPosition - 1] === undefined) {
                var currentPosition = board.board[board.board.length - 1];
                currentPosition.player = true;
                player.position = board.board.length - 1;
                player.direction = "up";
                takeChip(player, currentPosition);
            }
            else {
                var currentPosition = board.board[landingPosition - 1];
                currentPosition.player = true;
                takeChip(player, currentPosition);
            }
        }
    }
    else {
        //this executes if the player is headed up
        if (player.escaped === true) {
            // this executes if the player is headed up and has escaped already
            console.log(player.color + " has already escaped");
        }
        else {
            // this executes if the player has not escaped and is headed upwards
            if (air <= 0) {
                gameEnd = true;
                return "The game has ended";
            }
            else {
                air -= player.tokens;
            }
            console.log(player.color + " is moving up");
            var recentPosition = board.board[player.position - 1];
            recentPosition.player = false;
            var path = rollDice();
            console.log(player.color + " rolled a :", path);
            path -= player.tokens;
            if (path < 0) {
                path = 0;
            }
            console.log("But " + player.color + " has " + player.tokens + " tokens");
            console.log("So " + player.color + " is only moving " + path + " positions");
            player.position -= path;
            var landingPosition = land(player);
            if (board.board[landingPosition - 1] === undefined) {
                player.escaped = true;
            }
            else {
                var currentPosition = board.board[landingPosition - 1];
                currentPosition.player = true;
            }
        }
    }
}
function takeChip(player, position) {
    if (player.tokens < player.limit) {
        if (position.empty === false) {
            player.tokens += 1;
            player.score += position.value;
            position.empty = true;
            console.log("this player picked up a", position.value);
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
}
function land(player) {
    var temposition = board.board[player.position];
    if (temposition === undefined) {
        return player.position;
    }
    else {
        if (temposition.player === false) {
            return player.position;
        }
        else {
            player.position += 1;
            land(player);
        }
    }
}
function notAtLimit(player) {
    if (player.tokens < player.limit) {
        return true;
    }
    else {
        return false;
    }
}
function rollDice() {
    var dice1 = Math.ceil(Math.random() * 3);
    var dice2 = Math.ceil(Math.random() * 3);
    return dice1 + dice2;
}
var limits = [1, 2, 3];
function runGame(players) {
    var colors = ["red", "blue", "black", "purple", "yellow", "green"];
    var allPlayers = [];
    for (var i = 0; i < players; i++) {
        allPlayers.push(new Player_1.Player(limits[i], colors[i]));
    }
    while (gameEnd === false) {
        console.log("checking game end");
        var endChecker = 0;
        for (var _i = 0, allPlayers_1 = allPlayers; _i < allPlayers_1.length; _i++) {
            var player = allPlayers_1[_i];
            if (player.escaped === true) {
                endChecker += 1;
            }
            if (player.direction === "up") {
                endChecker += 1;
            }
        }
        if (endChecker === allPlayers.length * 2) {
            gameEnd = true;
        }
        for (var _a = 0, allPlayers_2 = allPlayers; _a < allPlayers_2.length; _a++) {
            var player = allPlayers_2[_a];
            takeTurn(player);
        }
    }
    if (gameEnd === true) {
        console.log("*************");
        console.log("the game has ended");
        for (var _b = 0, allPlayers_3 = allPlayers; _b < allPlayers_3.length; _b++) {
            var player = allPlayers_3[_b];
            console.log(player.color);
            console.log("scored", player.score);
            console.log("player escaped?", player.escaped);
            console.log("*************");
        }
    }
}
console.log("final board state");
function stage2() {
    var newboard = board.board.filter(function (item) {
        item.empty === false;
    });
    air = 25;
    gameEnd = false;
    board.board = newboard;
    runGame(3);
}
function stage3() {
    var newboard = board.board.filter(function (item) {
        item.empty === false;
    });
    air = 25;
    gameEnd = false;
    board.board = newboard;
    runGame(3);
}
runGame(3);
stage2();
stage3();
