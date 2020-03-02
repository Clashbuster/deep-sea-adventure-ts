"use strict";
exports.__esModule = true;
var Position_1 = require("./Position");
var Board = /** @class */ (function () {
    function Board() {
        this.board = [];
        var a = shuffle([0, 0, 1, 1, 2, 2, 3, 3]);
        var b = shuffle([4, 4, 5, 5, 6, 6, 7, 7]);
        var c = shuffle([8, 8, 9, 9, 10, 10, 11, 11]);
        var d = shuffle([12, 12, 13, 13, 14, 14, 15, 15]);
        var board = a.concat(b, c, d);
        this.board = setUpPositions(board);
    }
    return Board;
}());
exports.Board = Board;
function setUpPositions(board) {
    return board.map(function (item) {
        return new Position_1.Position(item);
    });
}
function shuffle(array) {
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
