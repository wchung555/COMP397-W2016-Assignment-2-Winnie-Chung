// MENU SCENE
module scenes {
    export class Menu extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _scoresheetBackground:createjs.Bitmap;
        private _startButton:objects.Button;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {    
            
            // add the SCORESHEET background to the scene
            this._scoresheetBackground = new createjs.Bitmap(assets.getResult("Scoresheet"));
            this.addChild(this._scoresheetBackground);
                   
            // add the START button to the scene
            this._startButton = new objects.Button(
                "StartButton",
                config.Screen.CENTER_X,
                425,
                false);
            this.addChild(this._startButton);
            
            // START Button event listener
            this._startButton.on("click", this._startButtonClick, this);
           
            // set up background
            this._setupBackground("WhiteBackground");
            
            // fade in
            this._fadeIn(500);                        
            
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // INTRO Scene updates here
        public update(): void {

        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // START Button click event handler
        private _startButtonClick(event: createjs.MouseEvent) {
            // fade out
            this._fadeOut(500, () => {
                // Switch to the SLOT_MACHINE Scene
                scene = config.Scene.SLOT_MACHINE;
                changeScene();
            })
        }        
    }
}