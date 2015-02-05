var questManager = Kiwi.Plugins.QuestManager;


var QuestExample = new Kiwi.State( "QuestExample" );

QuestExample.create = function () {
    questManager.createQuest( "testQuest", "number", 0, 5, "Click 5 times!" );

    this.descText = new Kiwi.GameObjects.Textfield( this, "Hello to the world", 0, 10, "#000" );
    this.descText.text = "Quest: " + questManager.returnDescription( "testQuest" );
    this.addChild(this.descText);

    this.startedText = new Kiwi.GameObjects.Textfield( this, "Hello to the world", 0, 50, "#000" );
    this.startedText.text = "Started: " + questManager.checkStarted("testQuest");
    this.addChild(this.startedText);

    this.statusText = new Kiwi.GameObjects.Textfield( this, "Hello to the world", 0, 90, "#000" );
    this.statusText.text = "Active: " + questManager.checkActive("testQuest");
    this.addChild(this.statusText);

    this.countText = new Kiwi.GameObjects.Textfield( this, "Hello to the world", 0, 130, "#000" );
    this.countText.text = "Count: " + questManager.Quests.testQuest.current;
    this.addChild( this.countText );

    this.game.input.onUp.add( this.pressButton );
}

QuestExample.pressButton = function () {
    if ( !questManager.checkStarted( "testQuest" ) ) {
        questManager.startQuest( "testQuest" );
    }

    QuestExample.startedText.text = "Started: " + questManager.checkStarted( "testQuest" );

    questManager.updateQuest( "testQuest", 1 );

    QuestExample.countText.text = "Count: " + questManager.Quests.testQuest.current;
    if ( questManager.checkCompleted( "testQuest" ) ) {
        QuestExample.countText.text = "Quest complete!";
    }
    QuestExample.statusText.text = "Active: " + questManager.checkActive( "testQuest" );
}

if ( typeof gameOptions == "undefined" ) gameOptions = {};

var game = new Kiwi.Game( "game-container", "QuestExample", QuestExample, gameOptions );