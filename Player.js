"use strict";
exports.__esModule = true;
var Player = /** @class */ (function () {
    function Player(limit, color) {
        this.limit = 0;
        this.color = "";
        this.limit = limit;
        this.color = color;
        this.tokens = 0;
        this.score = 0;
        this.direction = "down";
        this.position = 0;
        this.escaped = true;
    }
    return Player;
}());
exports.Player = Player;
