var achievementManager = Kiwi.Plugins.AchievementManager;

var AchievementExample = new Kiwi.State('AchievementExample');

AchievementExample.create = function () {
    //default achievement example
    achievementManager.createAchievement('click1', 'Click', 'Click to unlock this achievement', 'default', '');

    this.descText = new Kiwi.GameObjects.Textfield(this, 'Hello to the world', 0, 10, '#000');
    this.descText.text = 'Description: ' + achievementManager.returnDescription('click1');
    this.addChild(this.descText);

    this.unlocked = new Kiwi.GameObjects.Textfield(this, 'Hello to the world', 0, 50, '#000');
    this.unlocked.text = 'Unlocked Status: ' + achievementManager.returnUnlocked('click1');
    this.addChild(this.unlocked);

    //numbered achievement example
    achievementManager.createAchievement('click10', 'Click 10 times', 'Click 10 times to unlock this achievement', 'number', 10);

    this.desc2Text = new Kiwi.GameObjects.Textfield(this, 'Hello to the world', 0, 150, '#000');
    this.desc2Text.text = 'Description: ' + achievementManager.returnDescription('click10');
    this.addChild(this.desc2Text);

    this.unlocked2 = new Kiwi.GameObjects.Textfield(this, 'Hello to the world', 0, 190, '#000');
    this.unlocked2.text = 'Unlocked Status: ' + achievementManager.returnUnlocked('click10');
    this.addChild(this.unlocked2);

    this.countText = new Kiwi.GameObjects.Textfield(this, 'Hello to the world', 0, 230, '#000');
    this.countText.text = 'Progress: ' + achievementManager.returnCurrent('click10') + '/' + achievementManager.returnObjective('click10');
    this.addChild(this.countText);

    this.game.input.onUp.add(this.pressButton);
}

AchievementExample.pressButton = function () {
    achievementManager.getAchievement('click1');
    AchievementExample.unlocked.text = 'Unlocked Status: ' + achievementManager.returnUnlocked('click1');

    achievementManager.updateAchievement('click10',1);
    AchievementExample.unlocked2.text = 'Unlocked Status: ' + achievementManager.returnUnlocked('click10');
    AchievementExample.countText.text = 'Progress: ' + achievementManager.returnCurrent('click10') + '/' + achievementManager.returnObjective('click10');
}

if (typeof gameOptions == "undefined") gameOptions = {};

var game = new Kiwi.Game('game-container', 'QuestExample', AchievementExample, gameOptions);