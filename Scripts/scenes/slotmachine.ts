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
        
        private _leftWindow:objects.Button;
        private _middleWindow:objects.Button;
        private _rightWindow:objects.Button;
        
        private _jackpot = 1000000;
        private _totalCredits = 100;
        private _bet = 0;
        private _winnings = 0;
        
        private _betLine = ["Hero", "Hero", "Hero"];
        private _afros = 0;
        private _bells = 0;
        private _gluttons = 0;
        private _ladies = 0;
        private _swankies = 0;
        private _tuxes = 0;
        private _heroes = 0;
        private _robots = 0;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {    
            
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
            this._jackpotLabel = new objects.Label(
                "1000000", 
                "bold 20px Arial",
                "#ffcc00",
                265,
                67);
            this.addChild(this._jackpotLabel);
            
            // add the TOTAL CREDITS Label to the MENU scene
            this._totalCreditsLabel = new objects.Label(
                "100", 
                "20px Arial", 
                "#ffcc00", 
                150, 
                350);
            this.addChild(this._totalCreditsLabel);
            
            // add the BET Label to the MENU scene
            this._betLabel = new objects.Label(
                "0", 
                "20px Arial", 
                "#ffcc00", 
                270, 
                350);
            this.addChild(this._betLabel);
            
            // add the WINNINGS Label to the MENU scene
            this._winningsLabel = new objects.Label(
                "0", 
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
            
            // update betLine images
            this._leftWindow.image = assets.getResult(this._betLine[0]);
            this._middleWindow.image = assets.getResult(this._betLine[1]);
            this._rightWindow.image = assets.getResult(this._betLine[2]);
        }
        
        
        // PRIVATE METHODS +++++++++++++++++++++       
        
        // check if a value falls between a range of values
        private _checkRange(value:number, lowerBound:number, upperBound:number):number {
            return (value >= lowerBound && value <= upperBound) ? value : -1;
        }
        
        // determine bet line results
        private _reels():string[] {
            this._resetCounts();
            
            var betLine = [" ", " ", " "];
            var outcome = [0, 0, 0];
            
            for (var spin = 0; spin < 3; spin++) {
                outcome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outcome[spin]) {
                    case this._checkRange(outcome[spin], 1, 27): // 41.5% probability
                        betLine[spin] = "Bell";
                        this._bells++;
                        break;
                    case this._checkRange(outcome[spin], 28, 37): // 15.4% probability
                        betLine[spin] = "Robot";
                        this._robots++;
                        break; 
                    case this._checkRange(outcome[spin], 38, 46): // 13.8% probability
                        betLine[spin] = "Afro";
                        this._afros++;
                        break;
                    case this._checkRange(outcome[spin], 47, 54): // 12.3% probability
                        betLine[spin] = "Glutton";
                        this._gluttons++;
                        break;
                    case this._checkRange(outcome[spin], 55, 59): // 7.7% probability
                        betLine[spin] = "Lady";
                        this._ladies++;
                        break;
                    case this._checkRange(outcome[spin], 60, 62): // 4.6% probability
                        betLine[spin] = "Swanky";
                        this._swankies++;
                        break;  
                    case this._checkRange(outcome[spin], 63, 64): // 3.1% probability
                        betLine[spin] = "Tux";
                        this._tuxes++;
                        break;
                    case this._checkRange(outcome[spin], 65, 65): // 1.5% probability
                        betLine[spin] = "Hero";
                        this._heroes++;
                        break;    
                } //switch block ends               
            } //for loop ends
            this._betLine = betLine
                        
            return betLine;
        } //reels method ends
        
        // determine winnings
        private _calculateWinnings():number {
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
        } //calculateWinnings method ends
        
        // reset slot machine
        private _resetGame():void {
            this._jackpot = 1000000;
            this._totalCredits = 100;
            this._bet = 0;
            this._resetCounts();
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
            if (this._checkRange(10, 0, this._totalCredits) != -1) {
                console.log("Bet 10 credits");   
                this._bet = 10;
            }
            else {
                console.log("Not enough credits");
            }
        }
        
        private _bet20ButtonClick(event: createjs.MouseEvent) {
            if (this._checkRange(20, 0, this._totalCredits) != -1) { // check if user has enough credits
                console.log("Bet 20 credits");
                this._bet = 20;
            }
            else {
                console.log("Not enough credits");
            }  
        }
        
        private _bet50ButtonClick(event: createjs.MouseEvent) {
            if (this._checkRange(50, 0, this._totalCredits) != -1) { // check if user has enough credits
                console.log("Bet 50 credits");
                this._bet = 50;
            } 
            else {
                console.log("Not enough credits");
            }   
        }
        
        private _bet100ButtonClick(event: createjs.MouseEvent) {
            if (this._checkRange(100, 0, this._totalCredits) != -1) { // check if user has enough credits
                console.log("Bet 100 credits");
                this._bet = 100;
            }
            else {
                console.log("Not enough credits");
            }
        }
        
        private _spinButtonClick(event: createjs.MouseEvent) {
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
                if (this._totalCredits < 10) {
                    console.log("Not enough credits to continue playing");
                    this._exit();
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