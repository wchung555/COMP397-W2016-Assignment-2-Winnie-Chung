var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// GAME_OVER SCENE
var scenes;
(function (scenes) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function GameOver() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        GameOver.prototype.start = function () {
            // add the GAME OVER background to the scene
            this._gameOverBackground = new createjs.Bitmap(assets.getResult("GameOver"));
            this.addChild(this._gameOverBackground);
            // add the START button to the scene
            this._startOverButton = new objects.Button("StartOverButton", config.Screen.CENTER_X, config.Screen.CENTER_Y + 125, false);
            this.addChild(this._startOverButton);
            // START Button event listener
            this._startOverButton.on("click", this._startOverButtonClick, this);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // INTRO Scene updates here
        GameOver.prototype.update = function () {
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // START Button click event handler
        GameOver.prototype._startOverButtonClick = function (event) {
            // Switch to the LEFT_CAVE Scene
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        };
        return GameOver;
    })(objects.Scene);
    scenes.GameOver = GameOver;
})(scenes || (scenes = {}));
//# sourceMappingURL=gameover.js.map