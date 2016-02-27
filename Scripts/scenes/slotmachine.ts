// MENU SCENE
module scenes {
    export class SlotMachine extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backgroundImage:createjs.Bitmap;
        private _bet10Button:objects.Button;
        private _bet20Button:objects.Button;
        private _bet50Button:objects.Button;
        private _bet100Button:objects.Button;
        private _resetButton:objects.Button;
        private _exitButton:objects.Button;
        private _spinButton:objects.Button;
        private _jackpotLabel:objects.Label;
        private _totalCreditsLabel:objects.Label;
        private _betLabel:objects.Label;
        private _winningsLabel:objects.Label;
        
        private _leftReel:createjs.Bitmap[];
        private _middleReel:createjs.Bitmap[];
        private _rightReel:createjs.Bitmap[];
        
        private _jackpot:number;
        private _totalCredits:number;
        private _bet:number;
        private _winnings:number;
        
        private _prevBetLine:string[][];
        private _betLine:string[][];
        
        private _afros:number;
        private _bells:number;
        private _gluttons:number;
        private _ladies:number;
        private _swankies:number;
        private _tuxes:number;
        private _heroes:number;
        private _robots:number;
        
        private _isSpinning:boolean;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {                
            // add the reels' images to the scene
            this._betLine = [
                ["Swanky", "Tux", "Hero"],
                ["Swanky", "Tux", "Hero"],
                ["Swanky", "Tux", "Hero"]
            ];
            
            this._leftReel = new Array(5);
            this._middleReel = new Array(5);
            this._rightReel = new Array(5);
            
            this._jackpot = 1000000;
            this._totalCredits = 1000;
            this._bet = 0;
            this._winnings = 0;
            
            this._afros = 0;
            this._bells = 0;
            this._gluttons = 0;
            this._ladies = 0;
            this._swankies = 0;
            this._tuxes = 0;
            this._heroes = 0;
            this._robots = 0;
            
            this._isSpinning = false;
            
            for (var item = 0; item < 6 ; item++) {
                if (item < 3) {
                    this._leftReel[item] = new createjs.Bitmap(assets.getResult(this._betLine[0][item]));
                    this._middleReel[item] = new createjs.Bitmap(assets.getResult(this._betLine[1][item]));
                    this._rightReel[item] = new createjs.Bitmap(assets.getResult(this._betLine[2][item]));
                }
                else {
                    this._leftReel[item] = new createjs.Bitmap(assets.getResult(this._betLine[0][item-3]));
                    this._middleReel[item] = new createjs.Bitmap(assets.getResult(this._betLine[0][item-3]));
                    this._rightReel[item] = new createjs.Bitmap(assets.getResult(this._betLine[0][item-3]));
                }
                
                this._leftReel[item].x = 90;
                this._leftReel[item].y = -168+85*item;
                this.addChild(this._leftReel[item]);
                
                this._middleReel[item].x = 232;
                this._middleReel[item].y = -168+85*item;
                this.addChild(this._middleReel[item]);
                    
                this._rightReel[item].x = 373;
                this._rightReel[item].y = -168+85*item;
                this.addChild(this._rightReel[item]);
            }             
            
            // add the background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);
            
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
            this._jackpotLabel = new objects.Label(
                this._jackpot.toString(), 
                "bold 20px Arial",
                "#ffcc00",
                265,
                67);
            this.addChild(this._jackpotLabel);
            
            // add the TOTAL CREDITS Label to the MENU scene
            this._totalCreditsLabel = new objects.Label(
                this._totalCredits.toString(), 
                "20px Arial", 
                "#ffcc00", 
                150, 
                350);
            this.addChild(this._totalCreditsLabel);
            
            // add the BET Label to the MENU scene
            this._betLabel = new objects.Label(
                this._bet.toString(), 
                "20px Arial", 
                "#ffcc00", 
                270, 
                350);
            this.addChild(this._betLabel);
            
            // add the WINNINGS Label to the MENU scene
            this._winningsLabel = new objects.Label(
                this._winnings.toString(), 
                "20px Arial", 
                "#ffcc00", 
                380, 
                350);
            this.addChild(this._winningsLabel);
            
            // set up background
            this._setupBackground("WhiteBackground");
            
            // fade in
            this._fadeIn(500);
            
            // add this scene to the global stage container
            stage.addChild(this);
        } //start method ends

        // SLOT_MACHINE Scene updates here
        public update(): void {
            // update the JACKPOT Label
            this._jackpotLabel.text = this._jackpot.toString();
            
            // update the TOTAL CREDITS Label
            this._totalCreditsLabel.text = this._totalCredits.toString();
            
            // update the BET Label
            this._betLabel.text = this._bet.toString();
            
            // update the WINNINGS Label
            this._winningsLabel.text = this._winnings.toString(); 
        }
        
        
        // PRIVATE METHODS +++++++++++++++++++++       
        
        // check if a value falls between a range of values
        private _checkRange(value:number, lowerBound:number, upperBound:number):number {
            return (value >= lowerBound && value <= upperBound) ? value : -1;
        }
        
        // determine bet line results
        private _reels():string[][] {
            this._prevBetLine = this._betLine;
            
            var betLine = [
                [" ", " ", " "],
                [" ", " ", " "],
                [" ", " ", " "]
            ];
            var outcome = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];
            
            for (var reel = 0; reel < 3; reel++) { 
                for (var spin = 0; spin < 3; spin++) {
                    outcome[reel][spin] = Math.floor((Math.random() * 65) + 1);
                    switch (outcome[reel][spin]) {
                        case this._checkRange(outcome[reel][spin], 1, 27): // 41.5% probability
                            betLine[reel][spin] = "Bell";
                            break;
                        case this._checkRange(outcome[reel][spin], 28, 37): // 15.4% probability
                            betLine[reel][spin] = "Robot";
                            break; 
                        case this._checkRange(outcome[reel][spin], 38, 46): // 13.8% probability
                            betLine[reel][spin] = "Afro";
                            break;
                        case this._checkRange(outcome[reel][spin], 47, 54): // 12.3% probability
                            betLine[reel][spin] = "Glutton";
                            break;
                        case this._checkRange(outcome[reel][spin], 55, 59): // 7.7% probability
                            betLine[reel][spin] = "Lady";
                            break;
                        case this._checkRange(outcome[reel][spin], 60, 62): // 4.6% probability
                            betLine[reel][spin] = "Swanky";
                            break;  
                        case this._checkRange(outcome[reel][spin], 63, 64): // 3.1% probability
                            betLine[reel][spin] = "Tux";
                            break;
                        case this._checkRange(outcome[reel][spin], 65, 65): // 1.5% probability
                            betLine[reel][spin] = "Hero";
                            break;    
                    } //switch block ends               
                } //for loop (spin) ends
            } //for loop (reel) ends
            
            this._betLine = betLine
            
            return betLine;
        } //reels method ends
        
        // determine winnings
        private _calculateWinnings():number {
            this._resetCounts();
            var winnings = 0;
            
            // determine bet line displayed
            for (var reel = 0; reel < 3; reel ++) {
                if (this._betLine[reel][1] == "Bell") {
                    this._bells++
                }
                if (this._betLine[reel][1] == "Robot") {
                    this._robots++
                }
                if (this._betLine[reel][1] == "Afro") {
                    this._afros++
                }
                if (this._betLine[reel][1] == "Glutton") {
                    this._gluttons++
                }
                if (this._betLine[reel][1] == "Lady") {
                    this._ladies++
                }
                if (this._betLine[reel][1] == "Swanky") {
                    this._swankies++
                }
                if (this._betLine[reel][1] == "Tux") {
                    this._tuxes++
                }
                if (this._betLine[reel][1] == "Hero") {
                    this._heroes++
                }
            }
            
            // calculate winnings
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
            
            return winnings;
        } //calculateWinnings method ends
        
        // spin animation
        private _animate():void {
            // change and move reel images
            for (var item = 0; item < 6 ; item++) {
                if (item < 3) {
                    this._leftReel[item].image = assets.getResult(this._prevBetLine[0][item]);                
                    this._middleReel[item].image = assets.getResult(this._prevBetLine[1][item]);
                    this._rightReel[item].image = assets.getResult(this._prevBetLine[2][item]);
                }
                else {
                    this._leftReel[item].image = assets.getResult(this._betLine[0][item-3]);                
                    this._middleReel[item].image = assets.getResult(this._betLine[1][item-3]);
                    this._rightReel[item].image = assets.getResult(this._betLine[2][item-3]);
                }
                
                this._leftReel[item].y = 87+85*item;
                this._middleReel[item].y = 87+85*item;
                this._rightReel[item].y = 87+85*item;
                
                createjs.Tween.get(this._leftReel[item]).to( {y:-168+85*item}, 1000, createjs.Ease.getPowInOut(4)); 
                createjs.Tween.get(this._middleReel[item]).to( {y:-168+85*item}, 1000, createjs.Ease.getPowInOut(3));
                createjs.Tween.get(this._rightReel[item]).to( {y:-168+85*item}, 1000, createjs.Ease.getPowInOut(2));             
            }
        } // spin animation ends
        
        
        // reset slot machine
        private _resetGame():void {
            this.removeAllChildren();
            this.start();
        }
        
        // reset item counts
        private _resetCounts():void {
            this._afros = 0;
            this._bells = 0;
            this. _gluttons = 0;
            this._ladies = 0;
            this._swankies = 0;
            this._tuxes = 0;
            this._heroes = 0;
            this._robots = 0;
        }
        
        // transition to game over scene
        private _exit():void {
            // fade out
            this._fadeOut(500, () => {
                // Switch to the GAME_OVER Scene
                scene = config.Scene.GAME_OVER;
                changeScene();
            })
        }
        
        // EVENT HANDLERS ++++++++++++++++++++
        // PLAY Button click event handler
        private _bet10ButtonClick(event: createjs.MouseEvent) {
            if (!this._isSpinning) {
                if (this._checkRange(10, 0, this._totalCredits) != -1) {
                    console.log("Bet 10 credits");   
                    this._bet = 10;
                }
                else {
                    console.log("Not enough credits");
                }
            }            
        }
        
        private _bet20ButtonClick(event: createjs.MouseEvent) {
            if (!this._isSpinning) {
                if (this._checkRange(20, 0, this._totalCredits) != -1) { // check if user has enough credits
                    console.log("Bet 20 credits");
                    this._bet = 20;
                }
                else {
                    console.log("Not enough credits");
                }
            }              
        }
        
        private _bet50ButtonClick(event: createjs.MouseEvent) {
            if (!this._isSpinning) {
                if (this._checkRange(50, 0, this._totalCredits) != -1) { // check if user has enough credits
                    console.log("Bet 50 credits");
                    this._bet = 50;
                } 
                else {
                    console.log("Not enough credits");
                }
            }               
        }
        
        private _bet100ButtonClick(event: createjs.MouseEvent) {
            if (!this._isSpinning) {
                if (this._checkRange(100, 0, this._totalCredits) != -1) { // check if user has enough credits
                    console.log("Bet 100 credits");
                    this._bet = 100;
                }
                else {
                    console.log("Not enough credits");
                }
            }            
        }
        
        private _spinButtonClick(event: createjs.MouseEvent) {
            if (!this._isSpinning) {
                console.log("Spin those reels!");
                if (this._bet == 0) { // check if bet has been selected...
                    console.log("Please select a bet");
                }
                else if (this._checkRange(this._bet, 10, this._totalCredits) < 0) { // ...or if the previous bet is still valid
                    console.log("Not enough credits");
                }
                else {
                    this._jackpot += this._bet;
                    this._totalCredits -= this._bet;
                    console.log("Bet Line: " + this._reels());
                    console.log("Win " + this._calculateWinnings() + " credits");
                    console.log("Credits remaining: " + this._totalCredits);
                    this._isSpinning = true;
                    this._animate();
                    this._isSpinning = false;
                    if (this._totalCredits < 10) {
                        console.log("Not enough credits to continue playing");
                        this._exit();
                    }
                }
            }            
        }
        
        private _resetButtonClick(event: createjs.MouseEvent) {
            this._resetGame();
            console.log("Reset game");
        }
        
        private _exitButtonClick(event: createjs.MouseEvent) {
            this._exit();
        }
    } //export block ends
} //module block ends