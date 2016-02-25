var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// MENU SCENE
var scenes;
(function (scenes) {
    var SlotMachine = (function (_super) {
        __extends(SlotMachine, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function SlotMachine() {
            _super.call(this);
            this._jackpot = 1000000;
            this._totalCredits = 100;
            this._bet = 0;
            this._winnings = 0;
            this._betLine = ["Hero", "Hero", "Hero"];
            this._afros = 0;
            this._bells = 0;
            this._gluttons = 0;
            this._ladies = 0;
            this._swankies = 0;
            this._tuxes = 0;
            this._heroes = 0;
            this._robots = 0;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        SlotMachine.prototype.start = function () {
            // add the background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);
            // add the left window 'button' to the scene
            this._leftWindow = new objects.Button("Hero", 162, 195, false);
            this.addChild(this._leftWindow);
            // add the middle window 'button' image to the scene
            this._middleWindow = new objects.Button("Hero", 307, 195, false);
            this.addChild(this._middleWindow);
            // add the right window 'button' image to the scene
            this._rightWindow = new objects.Button("Hero", 448, 195, false);
            this.addChild(this._rightWindow);
            // add the BET10 button to the scene
            this._bet10Button = new objects.Button("Bet10Button", 85, 405, false);
            this.addChild(this._bet10Button);
            this._bet10Button.on("click", this._bet10ButtonClick, this);
            // add the BET20 button to the scene
            this._bet20Button = new objects.Button("Bet20Button", 196, 405, false);
            this.addChild(this._bet20Button);
            this._bet20Button.on("click", this._bet20ButtonClick, this);
            // add the BET50 button to the scene
            this._bet50Button = new objects.Button("Bet50Button", 307, 405, false);
            this.addChild(this._bet50Button);
            this._bet50Button.on("click", this._bet50ButtonClick, this);
            // add the BET100 button to the scene
            this._bet100Button = new objects.Button("Bet100Button", 418, 405, false);
            this.addChild(this._bet100Button);
            this._bet100Button.on("click", this._bet100ButtonClick, this);
            // add the SPIN button to the scene
            this._spinButton = new objects.Button("SpinButton", 529, 405, false);
            this.addChild(this._spinButton);
            this._spinButton.on("click", this._spinButtonClick, this);
            // add the RESET button to the scene
            this._resetButton = new objects.Button("ResetButton", 580, 28, false);
            this.addChild(this._resetButton);
            this._resetButton.on("click", this._resetButtonClick, this);
            // add the EXIT button to the scene
            this._exitButton = new objects.Button("ExitButton", 604, 28, false);
            this.addChild(this._exitButton);
            this._exitButton.on("click", this._exitButtonClick, this);
            // add the JACKPOT Label to the MENU scene
            this._jackpotLabel = new objects.Label("1000000", "bold 20px Arial", "#ffcc00", 265, 67);
            this.addChild(this._jackpotLabel);
            // add the TOTAL CREDITS Label to the MENU scene
            this._totalCreditsLabel = new objects.Label("100", "20px Arial", "#ffcc00", 150, 350);
            this.addChild(this._totalCreditsLabel);
            // add the BET Label to the MENU scene
            this._betLabel = new objects.Label("0", "20px Arial", "#ffcc00", 270, 350);
            this.addChild(this._betLabel);
            // add the WINNINGS Label to the MENU scene
            this._winningsLabel = new objects.Label("0", "20px Arial", "#ffcc00", 380, 350);
            this.addChild(this._winningsLabel);
            // set up background
            this._setupBackground("WhiteBackground");
            // fade in
            this._fadeIn(500);
            // add this scene to the global stage container
            stage.addChild(this);
        }; //start method ends
        // SLOT_MACHINE Scene updates here
        SlotMachine.prototype.update = function () {
            // update the JACKPOT Label
            this._jackpotLabel.text = this._jackpot.toString();
            // update the TOTAL CREDITS Label
            this._totalCreditsLabel.text = this._totalCredits.toString();
            // update the BET Label
            this._betLabel.text = this._bet.toString();
            // update the WINNINGS Label
            this._winningsLabel.text = this._winnings.toString();
            // update betLine images
            this._leftWindow.image = assets.getResult(this._betLine[0]);
            this._middleWindow.image = assets.getResult(this._betLine[1]);
            this._rightWindow.image = assets.getResult(this._betLine[2]);
        };
        // PRIVATE METHODS +++++++++++++++++++++       
        // check if a value falls between a range of values
        SlotMachine.prototype._checkRange = function (value, lowerBound, upperBound) {
            return (value >= lowerBound && value <= upperBound) ? value : -1;
        };
        // determine bet line results
        SlotMachine.prototype._reels = function () {
            this._resetCounts();
            var betLine = [" ", " ", " "];
            var outcome = [0, 0, 0];
            for (var spin = 0; spin < 3; spin++) {
                outcome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outcome[spin]) {
                    case this._checkRange(outcome[spin], 1, 27):
                        betLine[spin] = "Bell";
                        this._bells++;
                        break;
                    case this._checkRange(outcome[spin], 28, 37):
                        betLine[spin] = "Robot";
                        this._robots++;
                        break;
                    case this._checkRange(outcome[spin], 38, 46):
                        betLine[spin] = "Afro";
                        this._afros++;
                        break;
                    case this._checkRange(outcome[spin], 47, 54):
                        betLine[spin] = "Glutton";
                        this._gluttons++;
                        break;
                    case this._checkRange(outcome[spin], 55, 59):
                        betLine[spin] = "Lady";
                        this._ladies++;
                        break;
                    case this._checkRange(outcome[spin], 60, 62):
                        betLine[spin] = "Swanky";
                        this._swankies++;
                        break;
                    case this._checkRange(outcome[spin], 63, 64):
                        betLine[spin] = "Tux";
                        this._tuxes++;
                        break;
                    case this._checkRange(outcome[spin], 65, 65):
                        betLine[spin] = "Hero";
                        this._heroes++;
                        break;
                } //switch block ends               
            } //for loop ends
            this._betLine = betLine;
            return betLine;
        }; //reels method ends
        // determine winnings
        SlotMachine.prototype._calculateWinnings = function () {
            var winnings = 0;
            if (this._bells == 2) {
                winnings = this._bet;
            }
            else if (this._bells == 3) {
                winnings = this._bet * 2;
            }
            else if (this._robots == 2) {
                winnings = this._bet;
            }
            else if (this._robots == 3) {
                winnings = this._bet * 3;
            }
            else if (this._afros == 2) {
                winnings = this._bet;
            }
            else if (this._afros == 3) {
                winnings = this._bet * 4;
            }
            else if (this._gluttons == 2) {
                winnings = this._bet;
            }
            else if (this._gluttons == 3) {
                winnings = this._bet * 5;
            }
            else if (this._ladies == 2) {
                winnings = this._bet;
            }
            else if (this._ladies == 3) {
                winnings = this._bet * 6;
            }
            else if (this._swankies == 2) {
                winnings = this._bet;
            }
            else if (this._swankies == 3) {
                winnings = this._bet * 7;
            }
            else if (this._tuxes == 2) {
                winnings = this._bet * 10;
            }
            else if (this._tuxes == 3) {
                winnings = this._bet * 20;
            }
            else if (this._heroes == 2) {
                winnings = this._bet * 50;
            }
            else if (this._heroes == 3) {
                winnings = this._jackpot;
            }
            this._totalCredits += winnings;
            this._winnings = winnings;
            this.update();
            return winnings;
        }; //calculateWinnings method ends
        // reset slot machine
        SlotMachine.prototype._resetGame = function () {
            this._jackpot = 1000000;
            this._totalCredits = 100;
            this._bet = 0;
            this._resetCounts();
        };
        // reset item counts
        SlotMachine.prototype._resetCounts = function () {
            this._afros = 0;
            this._bells = 0;
            this._gluttons = 0;
            this._ladies = 0;
            this._swankies = 0;
            this._tuxes = 0;
            this._heroes = 0;
            this._robots = 0;
        };
        // transition to game over scene
        SlotMachine.prototype._exit = function () {
            // fade out
            this._fadeOut(500, function () {
                // Switch to the GAME_OVER Scene
                scene = config.Scene.GAME_OVER;
                changeScene();
            });
        };
        // EVENT HANDLERS ++++++++++++++++++++
        // PLAY Button click event handler
        SlotMachine.prototype._bet10ButtonClick = function (event) {
            if (this._checkRange(10, 0, this._totalCredits) != -1) {
                console.log("Bet 10 credits");
                this._bet = 10;
            }
            else {
                console.log("Not enough credits");
            }
        };
        SlotMachine.prototype._bet20ButtonClick = function (event) {
            if (this._checkRange(20, 0, this._totalCredits) != -1) {
                console.log("Bet 20 credits");
                this._bet = 20;
            }
            else {
                console.log("Not enough credits");
            }
        };
        SlotMachine.prototype._bet50ButtonClick = function (event) {
            if (this._checkRange(50, 0, this._totalCredits) != -1) {
                console.log("Bet 50 credits");
                this._bet = 50;
            }
            else {
                console.log("Not enough credits");
            }
        };
        SlotMachine.prototype._bet100ButtonClick = function (event) {
            if (this._checkRange(100, 0, this._totalCredits) != -1) {
                console.log("Bet 100 credits");
                this._bet = 100;
            }
            else {
                console.log("Not enough credits");
            }
        };
        SlotMachine.prototype._spinButtonClick = function (event) {
            console.log("Spin those reels!");
            if (this._bet == 0) {
                console.log("Please select a bet");
            }
            else if (this._checkRange(this._bet, 10, this._totalCredits) < 0) {
                console.log("Not enough credits");
            }
            else {
                this._jackpot += this._bet;
                this._totalCredits -= this._bet;
                console.log("Bet Line: " + this._reels());
                console.log("Win " + this._calculateWinnings() + " credits");
                console.log("Credits remaining: " + this._totalCredits);
                if (this._totalCredits < 10) {
                    console.log("Not enough credits to continue playing");
                    this._exit();
                }
            }
        };
        SlotMachine.prototype._resetButtonClick = function (event) {
            this._resetGame();
            console.log("Reset game");
        };
        SlotMachine.prototype._exitButtonClick = function (event) {
            this._exit();
        };
        return SlotMachine;
    })(objects.Scene);
    scenes.SlotMachine = SlotMachine; //export block ends
})(scenes || (scenes = {})); //module block ends
//# sourceMappingURL=slotmachine.js.map