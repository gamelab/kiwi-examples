/**
 * FGL SDK - Implement this into your game!
 *
 * NOTE: This is an implementation testing version of our SDK. When you
 * upload your game to FGL.com, this SDK will be replaced with our real
 * production SDKs (which contain platform-specific functionality). You
 * must not self-publish your app with this version of the SDK implemented,
 * and you must not encrypt or minify this library or our deployment process
 * will fail.
 *
 * For more information see the Implementation Guide or API documentation
 */
 
if(('fgl' in window) === false) {
  window.fgl = window.FGL = window.__fgl = new FGLImplementationTestingSDK();
  if(__fgl.created === false) {
    __fgl.create();
  }
}

/**
 * FGL SDK Class
 * @constructor
 */
function FGLImplementationTestingSDK() {
  "use strict";

  var version = '1.7';
  var introTitleHtml = 'FGL SDK <small>Game Testing Framework v' + version + '</small>';
  var introHtml = '<p>The Game Testing Framework allows you to test the various FGL SDK features.</p>';

  var self = this;
  var htmlStyleContainer = { };   // Fancy html style definitions
  self.htmlHelpers = { };
  
  // Overlay variables
  self.introOverlay = null;
  self.adOverlay = null;
  self.scoreOverlay = null;
  self.inAppOverlay = null;
  self.imageOverlay = null;
  self.dismissableMessageOverlay = null;
  self.autoMessageOverlay = null;
  
  self.SIZE_300x250 = 1;
  self.SIZE_OVERLAY = 2;

  self.started = false;
  self.created = false;
  self.ready = false;
  self.readyFunctions = [ ];

  self.crossPromotionEnabled = true;
  self.unlockEnabled = true;
  self.brandingEnabled = true;
  self.disableMouseInput = false;
  self.jsConsoleEnabled = false;
  
  self.gameId  = 'test';
  self.defaultName = '';
  
  self.getMeta = function(meta) {
    var metas = document.getElementsByTagName('meta');

    for (var i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute('name') == meta) {
        return metas[i].getAttribute('content');
      }
    }
    return '';
  };
  
  self.remotelog = function(msg) {
    if(self.jsConsoleEnabled === true) { console.log(msg); }
  }
  
  self.randomString = function(len) {
    var qs = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    while(qs.length < len) {
        qs += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return qs;
  };

  self.loadScores = function(leaderboardId) {
    leaderboardId = leaderboardId || 'default';
    var id = self.gameId.toString();
    if(id === '' || id === 'test') {
      id = (window.location.host + window.location.pathname).toString();
    }
    var scoresStr = localStorage['lb.' + id + '.' + leaderboardId.toString()];
    if (scoresStr == null || scoresStr == '') {
        scoresStr = localStorage["lb." + id]; // Legacy compatibility
        if (scoresStr == null || scoresStr == '') {
            return [ ];
        }
    }
    var jsonScores = JSON.parse(scoresStr);
    return jsonScores;
  };

  self.saveScores = function(scores, leaderboardId) {
    leaderboardId = leaderboardId || 'default';
    var id = self.gameId.toString();
    if(id === '' || id === 'test') {
      id = (window.location.host + window.location.pathname).toString();
    }
    while (scores.length > 20) {
      scores.pop();
    }
    localStorage['lb.' + id + '.' + leaderboardId.toString()] = JSON.stringify(scores);
  };
  
  self.loadAchievements = function() {
    var id = self.gameId.toString();
    if(id === '' || id === 'test') {
      id = (window.location.host + window.location.pathname).toString();
    }
    var achievementsStr = localStorage['lb.' + id + '.achievements'];
    if (achievementsStr == null || achievementsStr == '') {
        return [ ];
    }
    var jsonAchievements = JSON.parse(achievementsStr);
    return jsonAchievements;
  };

  self.saveAchievements = function(achievements) {
    var id = self.gameId.toString();
    if(id === '' || id === 'test') {
      id = (window.location.host + window.location.pathname).toString();
    }
    localStorage['lb.' + id + '.achievements'] = JSON.stringify(achievements);
  };

  /**
   * Initialises the API.
   */
  self.create = function() {
    if(self.created === true) { return; }
    
    if(!document.body){
      setTimeout(self.create, 10);
      return;
    }
    
    var gameId = self.getMeta('fgl-gameid');
    if (!gameId) {
      gameId = 'test';
    }
    
    self.gameId = gameId;
    
    // Set up CSS for FGL overlays
    var style = document.createElement('style');
    if (style.styleSheet) {
      style.styleSheet.cssText = htmlStyleContainer.getCss();
    }
    else {
      style.appendChild(document.createTextNode(htmlStyleContainer.getCss()));
    }
    document.head.appendChild(style);
    
    // Is our SDK in 'run mode'?
    if (window.location.hash.substr(0,8) == '#FGLSDK=') {
      // Run!
      var json = decodeURIComponent(window.location.hash.substr(8));
      var sdkSettings = JSON.parse(json);
      window.location.hash = '';
      
      if ('crossPromotionEnabled' in sdkSettings)
        self.crossPromotionEnabled = sdkSettings.crossPromotionEnabled;
        
      if ('unlockEnabled' in sdkSettings)
        self.unlockEnabled = sdkSettings.unlockEnabled;
        
      if ('unlocked' in sdkSettings)
        self.inApp.unlocked = sdkSettings.unlocked;
        
      if ('brandingEnabled' in sdkSettings)
        self.brandingEnabled = sdkSettings.brandingEnabled;
        
      if ('mouseEnabled' in sdkSettings)
        self.disableMouseInput = !sdkSettings.mouseEnabled;
        
      if('consoleKey' in sdkSettings) {
        self.jsConsoleEnabled = true;
        
        window._alert = window.alert;
        window.alert = function() { console.log("ALERT: " + arguments[0]); };
        
        var jsConsoleScript = document.createElement('script');
        jsConsoleScript.src = 'http://jsconsole.com/remote.js?fglr-' + sdkSettings.consoleKey;
        document.body.appendChild(jsConsoleScript);
      }
      
      self.boot();
    }
    else {
      
      // Add intro screen
      self.addTestBootScreen();
    }
    
    self.created = true;  // Don't allow create to be called multiple times
  };

  self.boot = function() {
    setTimeout(self.doReadyEvents, 500);
  };

  /**
   * Not currently implemented
   */
  self.reportGameState = function(state) {
    // Placeholder
  };

  /**
   * Not currently implemented
   */
  self.requestQuit = function() {
    // Placeholder
  };

  /**
   * @private
   */
  self.doReadyEvents = function() {
    for (var i = 0; i < self.readyFunctions.length; i++) {
      self.readyFunctions[i]();
    }
    self.ready = true;
  };

  /**
   * Pass your game's initializer functions to this
   * @param {function} f Function to call to begin game
   */
  self.onReady = function(f) {
    if (self.ready) {
      f();
    }
    else self.readyFunctions.push(f);
  };

  /**
   * Displays an advert
   */
  self.show3rdPartyAd = self.showAd = function(options) {
    // If the SDK is not ready, try again in 100ms (showing ads is important!)
    if (self.ready === false) { setTimeout(self.showAd, 100); self.showNotReadyWarning(); return; } // Do not allow functions to be called if not ready
    
    // Don't show ads if the game is unlocked
    if (self.inApp && self.inApp.isUnlocked()) return;
    
    self.remotelog('showAd() call');
    
    if (self.adOverlay == null)
    {
      self.remotelog('-Ad overlay created');
      var overlay = document.createElement('div');
      overlay.innerHTML = htmlStyleContainer.getImageOverlay('https://reports.fgl.com/sandbox/ads/html5/example_advert.png', 400, 350, 'fgl_overlay_ad');
      document.body.appendChild(overlay);
      self.adOverlay = overlay;
      
      var closeOverlay = function(e) {
        self.remotelog('-Ad overlay closed');
        self.stopEventPropagation(e);
        document.body.removeChild(overlay);
        self.adOverlay = null;
      }
      
      self.setupClickEvents('fgl_overlay_ad', closeOverlay);
      
      // Make sure we're vertically centered:
      self.htmlHelpers.checkVerticalCentering();
    }
  };
  
  /**
   * Checks that we can show a window based on a timer
   */
  self.checkCanShowWindow = function() {
    self.lastWindowShown = new Date().getTime();
    return true;
  }
  
  /**
   * Checks that we can hide a window based on a timer
   */
  self.checkCanHideWindow = function() {
    var time = new Date().getTime();
    return (time - self.lastWindowShown > 150); // Score window hiding delay
  }

  /**
   * Submits the given score to the specified leaderboard. If your game
   * only has one leaderboard, do not supply a leaderboardID.
   * @param {Number} score Score to submit
   * @param {string} leaderboardID Name of the leaderboard to show
   */
  self.submitScore = function(score, leaderboardID, extra) {
    var scores = null, holder = null;
    var playerName = '';
    var time = 0;
    var element = null;
    var giveNamePrompt = false;
    var firstInstance = true;
    var displayTime = 0;
    
    if(!self.checkCanShowWindow()) return;
    if (self.ready === false) { self.showNotReadyWarning(); return; } // Do not allow functions to be called if not ready
    
    self.remotelog('submitScore() call');
    
    // Called when the user cancels the score submission:
    var onScoreCancelFunction = function(e) {
      self.stopEventPropagation(e);
      
      self.remotelog('-Score submission canceled');
      
      // Remove name entry overlay
      document.body.removeChild(holder);
      self.scoreOverlay = null;
    }
    
    // Called when name form is submitted
    var onNameSubmitFunction = function(e) {
      self.stopEventPropagation(e);
      
      // Get the name that was entered
      element = document.getElementById('fgl_scorenameinput');
      if(element != null) {
        playerName = element.value;
      } else {
        playerName = self.defaultName;
      }
      
      // If the player name is invalid, highlight the input box
      if (!playerName) {
        element = document.getElementById('fgl_scorenameinput');
        if(element != null) {
          element.style.border = '1px solid red';
          element.focus();
        }
        return;
      }
      self.defaultName = playerName; // Set the default name for next time
      
      self.remotelog('-Score submission name entered');
      
      // Remove name entry overlay
      document.body.removeChild(holder);
      self.scoreOverlay = null;
      
      // Get leaderboard scores so we can push score
      leaderboardID = leaderboardID || 'default';
      scores = self.loadScores(leaderboardID);
      time = new Date().getTime();
      
      // If the score object is something other than a number or string
      if(!(typeof score === 'number' || typeof score === 'string')) {
        try { // Try converting to a string
          score = score.toString();
        } catch(err) { console.log('FGL SDK: SubmitScore; could not convert score to string!'); return; }
      }
      
      // Add the score
      scores.push( {
        score: score,
        player: playerName,
        time: time
      } );

      // Sort the scores list
      scores.sort( function(a, b) {
        if (parseInt(a.score) === parseInt(b.score)) { // If the scores are the same, sort based on time
          if(a.time === b.time) {
            return 0;
          }
          
          // Store more recent scorers first
          return parseInt(a.time) < parseInt(b.time) ? 1 : -1;
        }
        return parseInt(a.score) < parseInt(b.score) ? 1 : -1;
      } );
      
      // Only keep the first instance (best score) of this player name
      var uniqueScores = [ ];
      displayTime = time;
      for(var i = 0; i < scores.length; i++) {
        if(scores[i].player != null && scores[i].player != '') {
          if(scores[i].player == playerName) {
            if(firstInstance === false) {
              continue; // Don't copy this score into the new array
            }
            displayTime = scores[i].time;
            firstInstance = false;
          }
          uniqueScores.push(scores[i]);
        }
      }

      // Save and display the newly updated leaderboard
      self.saveScores(uniqueScores, leaderboardID);
      self.displayScoreboard(leaderboardID, displayTime);
    }
    
    // Used to submit name form with 'enter' key
    var onNameKeyPress = function(e) {
      if(e.keyCode === 13) { // Enter key
        onNameSubmitFunction(e); // Submit the entered name
      }
    }
    
    // Used to allow focus on name input box
    var onNameSelect = function() {
      element = document.getElementById('fgl_scorenameinput');
      if(element != null) {
        element.focus();
      }
    }
    
    // Used to allow unfocusing of the name input box by touching elsewhere
    var checkNameSelection = function() {
      element = document.getElementById('fgl_scorenameinput');
      if(element != null) {
        element.blur();
      }
    }
    
    // Only add an overlay if there is not one already
    if(self.scoreOverlay == null)
    {
      var showScoreOverlay = function(name) {
        // Add overlay for name entry
        holder = document.createElement('div');
        holder.innerHTML = htmlStyleContainer.getScoreDiv(score, name, 'fgl_overlay_score');
        document.body.appendChild(holder);
        self.scoreOverlay = holder;
        
        element = document.getElementById('fgl_scorenameinput');
        if(element != null) {
          element.value = name || self.defaultName;
          if(!name) { element.addEventListener('keydown', function(e) { onNameKeyPress(e); } ); }
        }
        
        // Set up event listeners
        self.setupClickEvents('fgl_scoresubmitbutton', onNameSubmitFunction);
        self.setupClickEvents('fgl_overlay_score_close', onScoreCancelFunction);
        self.setupClickEvents('fgl_scorenameinput', function(e) { self.stopEventPropagation(e); onNameSelect(); } );
        self.setupClickEvents('fgl_overlay_score', function(e) { self.stopEventPropagation(e); checkNameSelection(); } );
        
        // Make sure we're vertically centered:
        self.htmlHelpers.checkVerticalCentering();
      };
      
      // If a name was provided
      if(extra && extra.name) {
        showScoreOverlay(extra.name);
        return;
      }
      
      // Test if the user is running on the Kindle Fire standard or iOS; use a name prompt on those
      if(navigator.userAgent.search('Silk') != -1 ||
        navigator.userAgent.search('iPod') != -1 ||
        navigator.userAgent.search('iPhone') != -1 ||
        navigator.userAgent.search('iPad') != -1) {
        giveNamePrompt = true;
      }
      
      // Detect native android browser; use a name prompt on that too
      /*if(navigator.userAgent.search('Mozilla/5.0') != -1 &&
        navigator.userAgent.search('Android') != -1 &&
        navigator.userAgent.search('Chrome') == -1) {
        giveNamePrompt = true;
      }*/
      
      // Special case on the Kindle Fire standard
      if(giveNamePrompt === true) {
        var providedName = prompt("Enter your name:", self.defaultName);
        
        if(providedName != null) {
          // Check that the name is valid (not all whitespace)
          if(/^\s*$/.test(providedName) === false) {
            self.defaultName = providedName;
            showScoreOverlay(providedName);
          } else {
            self.showDismissableAlert('Invalid name input!', 'Enter a valid name.');
          }
        }
      } else {
        showScoreOverlay();
        self.remotelog('-Score submission overlay created');
      }
      
    }
  };
  
  self.submitPlayerScore = function(score, playerName, leaderboardID) {
    leaderboardID = leaderboardID || 'default';
    
    self.submitScore(score, leaderboardID, { name: playerName } );
  }
  
  /**
   * Displays the scoreboard UI over your game

   * @param {string} leaderboardID Name of the leaderboard to show
   * @param {Number} highlightScore Index of score in the list to highlight (0 for none)
   */
  self.displayScoreboard = function(leaderboardID, highlightScore) {
    var scores = null;
    var html = '';
    var num = 1;
    
    if (!self.checkCanShowWindow()) return;
    if (self.ready === false) { self.showNotReadyWarning(); return; } // Do not allow functions to be called if not ready
    
    self.remotelog('displayScoreboard() call');
    
    if(self.scoreOverlay == null) {
      leaderboardID = leaderboardID || 'default';
      highlightScore = highlightScore || 0;
      
      html = '<table class="fgl-scoreboard"><tr><th>#</th><th>Name</th>' + 
        '<th>Score</th><th>Date</th></tr>';

      scores = self.loadScores(leaderboardID);
      for(var i = 0; i < scores.length; i++) {
        var score = scores[i];
        if (score) {
          if (score.time == highlightScore) {
            html += '<tr class="fgl-score-highlight">';
          }
          else {
            html += '<tr>';
          }

          html += '<td>' + (num++) + '</td><td>' + score.player + '</td><td>' +
            score.score + '</td><td>' + new Date(score.time).toLocaleDateString() +
            '</td></tr>';
        }
      }
      html += '</table></div>';
      
      self.remotelog('-Display scores overlay created');
      
      var overlay = document.createElement('div');
      overlay.innerHTML = htmlStyleContainer.createPopup("Leaderboard", html, 'fgl_overlay_leaderboard');
      document.body.appendChild(overlay);
      self.scoreOverlay = overlay;
      
      // Set up event handlers
      self.setupClickEvents('fgl_overlay_leaderboard_close', self.hideScoreboard);
      self.setupClickEvents('fgl_overlay_leaderboard', function(e) { self.stopEventPropagation(e); } );
      
      // Make sure we're vertically centered:
      self.htmlHelpers.checkVerticalCentering();
    }
  };

  /**
   * Removes the scoreboard UI from your game
   */
  self.hideScoreboard = function(e) {
    if(!self.checkCanHideWindow()) return;
    self.stopEventPropagation(e);
    if(self.scoreOverlay == null) {
      return;
    }
    self.remotelog('-Score overlay closed');
    document.body.removeChild(self.scoreOverlay);
    self.scoreOverlay = null;
  };

  /**
   * Shows a list of achievements with their locked/unlocked states
   */
  self.showAchievements = function() {
    // Placeholder
  };
  
  /**
   * Returns true if the app is running in premium (unlocked) mode:
   */
  self.isPremium = function() {
    return self.inApp && self.inApp.isUnlocked();
  };
  
  /**
   * Grants an achievement with the given name
   */
  self.grantAchievement = function(name) {
    self.remotelog('grantAchievement() call');
    if(!self.hasAchievement(name)) {
      self.remotelog('-Unlocking achievement!');
      var achievements = self.loadAchievements(); // Check if this achievement is already unlocked!
      self.showMessage("Achievement Unlocked!", "You unlocked the achievement \"" + name + "\"!", 1500);
      
      achievements.push( { name: name } ); // Add the achievement to the achievements list
      self.saveAchievements(achievements); // Save achievements to local storage!
    }
  };
  
  /**
   * Returns true if the player has been granted the named achievement before
   */
  self.hasAchievement = function(name) {
    self.remotelog('hasAchievement() call');
    var achievements = self.loadAchievements(); // Check if this achievement is already unlocked!
    for(var i = 0; i < achievements.length; i++) {
      if(achievements[i].name === name) {
        self.remotelog('-"' + name + '" is unlocked!');
        return true;
      }
    }
    self.remotelog('-"' + name + '" is NOT unlocked!');
    return false;
  };
  
  /**
   * Displays the "More Games" page
   */
  self.showMoreGames = function() {
    if (self.ready === false) { self.showNotReadyWarning(); return; } // Do not allow functions to be called if not ready
    self.remotelog('showMoreGames() call');
    
    self.showDismissableImageOverlay('https://reports.fgl.com/sandbox/ads/html5/cross_promo_cover.png', 400, 350);
  };
  
  /**
   * Gets the URI (or data URI) of the branding logo
   * @returns {string} URI or data URI of branding logo
   */
  self.getBrandingLogo = function() {
    self.remotelog('getBrandingLogo() call');
    return 'http://cors.mpstatic.com/html5/sdks/fgl-branding-placeholder.png';
  };

  /**
   * Call this method when the user clicks or taps on the branding logo
   */
  self.handleBrandingClick = function() {
    if (self.ready === false) { self.showNotReadyWarning(); return; } // Do not allow functions to be called if not ready
    
    self.remotelog('handleBrandingClick() call');
    self.showDismissableAlert('Publisher Branding Clicked', 
      'Dynamic publisher branding is now implemented in your game!' +
      '<br /><br />' +
      'Note: This message should only be displayed when you click ' +
      'the <strong>Publisher Branding</strong> placeholder.');
  }

  /**
   * Gives access to the in app purchasing functions.
   */
  self.inApp = new function() {
    var inApp_self = this;

    /**
     * Returns true if the app has been unlocked by a payment.
     */
    inApp_self.isUnlocked = function(item) {
      item = item || 'unlock';
      return inApp_self.unlocked || false;
    };

    /**
     * Begins the process of unlocking a game.
     * @param {function} successFunction Function to call on unlock success
     * @param {function} failFunction Function to call on unlock failure
     */
    inApp_self.initiateUnlockFunction = function(successFunction, failFunction) {
      var overlay = null;
      
      // Do not allow functions to be called if not ready
      if (self.ready === false) { self.showNotReadyWarning(); return; }
      
      // If we're not allowed to unlock, exit early:
      if (self.unlockEnabled === false) return;
      
      self.remotelog('initiateUnlockFunction() call');
      
      // If we're already unlocked, fire the success function and exit:
      if (inApp_self.isUnlocked()) {
        successFunction();
        return;
      }
      
      // Setup our callback functions for our overlay:
      var onInAppOKClick = function(e) {
        self.stopEventPropagation(e);
        inApp_self.unlocked = true;
        try {
          self.remotelog('-InApp success function');
          successFunction();
        }
        catch(e) { }
        self.remotelog('-InApp overlay closed');
        document.body.removeChild(overlay);
        self.inAppOverlay = null;
      }
      var onInAppCancelClick = function(e) {
        self.stopEventPropagation(e);
        inApp_self.unlocked = false;
        try {
          self.remotelog('-InApp failure function');
          failFunction();
        }
        catch(e) { }
        self.remotelog('-InApp overlay closed');
        document.body.removeChild(overlay);
        self.inAppOverlay = null;
      }
      
      // Only add an overlay if there isn't one already
      if(self.inAppOverlay == null)
      {
        self.remotelog('-InApp overlay created');
        
        // Show the unlock overlay:
        overlay = document.createElement('span');
        overlay.innerHTML = htmlStyleContainer.getIapDiv('fgl_overlay_inapp');
        document.body.appendChild(overlay);
        self.inAppOverlay = overlay;
        
        // Hook up the onNameSubmitFunction to the submit button
        self.setupClickEvents('fgl_iapunlockbutton', onInAppOKClick);
        self.setupClickEvents('fgl_iapcancelbutton', onInAppCancelClick);
        self.setupClickEvents('fgl_overlay_inapp_close', onInAppCancelClick);
        self.setupClickEvents('fgl_overlay_inapp', function(e) { self.stopEventPropagation(e); } );
        
        // Make sure we're vertically centered:
        self.htmlHelpers.checkVerticalCentering();
      }
    }
  };

  /*
   * =====================================================
   * ALL OF THE BELOW FUNCTIONS ARE FOR INTERNAL USE ONLY!
   * =====================================================
   *
   * If you use any of these functions directly your game will either fail QA
   * or break upon release. PLEASE AVOID THIS.
   */
  
  /**
   * Displays a dismissable centered image overlay - internal use only
   * @private
   */
  self.showDismissableImageOverlay = function(src, width, height) {
    if (self.ready === false) { self.showNotReadyWarning(); return; } // Do not allow functions to be called if not ready
    if (self.imageOverlay == null)
    {
      var overlay = document.createElement('div');
      overlay.innerHTML = htmlStyleContainer.getImageOverlay(src, width, height, 'fgl_overlay_image');
      document.body.appendChild(overlay);
      self.imageOverlay = overlay;
      
      var closeOverlay = function(e) {
        self.stopEventPropagation(e);
        document.body.removeChild(overlay);
        self.imageOverlay = null;
      }
      
      self.setupClickEvents('fgl_overlay_image', closeOverlay);
      
      // Make sure we're vertically centered:
      self.htmlHelpers.checkVerticalCentering();
    }
  }
  
  /**
   * Displays a dismissable centered alert - internal use only
   * @private
   */
  self.showDismissableAlert = function(title, message) {
    if (self.dismissableMessageOverlay == null)
    {
      var overlay = document.createElement('div');
      var alertHTML = 
        '<p>' + message + '</p>' +
        '<div class="fgl-popup-actions">' +
          '<a class="fgl-popup-button">Dismiss</a>' +
        '</div>';
      overlay.innerHTML = htmlStyleContainer.createPopup(title, alertHTML, 'fgl_overlay_alert');
      document.body.appendChild(overlay);
      self.dismissableMessageOverlay = overlay;
      
      var closeOverlay = function(e) {
        self.stopEventPropagation(e);
        document.body.removeChild(overlay);
        self.dismissableMessageOverlay = null;
      }
      
      self.setupClickEvents('fgl_overlay_alert', closeOverlay);
      
      // Make sure we're vertically centered:
      self.htmlHelpers.checkVerticalCentering();
    }
  }
  
  /**
   * Displays a auto-dismiss alert - internal use only
   * @private
   */
  self.showMessage = function(title, message, ms) {
    var messageId = self.randomString(12);
    var overlay = document.createElement('div');
    var alertHTML = 
    '<p>' + message + '</p>' +
    '<div class="fgl-popup-actions"">' +
    '</div>';
    overlay.innerHTML = htmlStyleContainer.createMessage(title, alertHTML, 'fgl_overlay_message_' + messageId);
    document.body.appendChild(overlay);

    var closeOverlay = function(e) {
      self.stopEventPropagation(e);
      document.body.removeChild(overlay);
    }

    // Do a nice fade in
    var fadeStartTime = (new Date).getTime();
    var fadeEndTime = fadeStartTime + 440;
    var fadeInterval = setInterval(function() {
	  var time = (new Date).getTime() - fadeStartTime;
      var opacity = 0;
      var element = document.getElementById('fgl_overlay_message_' + messageId);
      if(element) {
        opacity = time / (fadeEndTime - fadeStartTime);
        if(opacity >= 1) {
          opacity = 1.0;
          clearInterval(fadeInterval);
          fadeInterval = null;
        }
        element.style.opacity = -1 * opacity * (opacity - 2);
      } else {
        clearInterval(fadeInterval);
        fadeInterval = null;
      }
    }, 20);

    // After x milliseconds, get rid of the message popup
    setTimeout(function() {
      var fadeStartTime = (new Date).getTime();
      var fadeEndTime = fadeStartTime + 880;
      var fadeInterval = setInterval(function() {
        var time = (new Date).getTime() - fadeStartTime;
        var opacity = 0;
        var element = document.getElementById('fgl_overlay_message_' + messageId);
        if(element) {
          opacity = 1.0 - (time / (fadeEndTime - fadeStartTime));
          if(opacity <= 0) {
            opacity = 0;
            clearInterval(fadeInterval);
            fadeInterval = null;
            closeOverlay();
          }
          element.style.opacity = opacity * opacity * opacity;
        } else {
          clearInterval(fadeInterval);
          fadeInterval = null;
          closeOverlay();
        }
      }, 20);
    }, ms);
  }
  
  /**
   * INTERNAL USE ONLY
   *
   * This function is for specific plugin support. PLEASE DO NOT USE IT FOR YOUR OWN
   * PURPOSES AS THIS MAY CAUSE YOUR GAME TO BREAK UPON RELEASE!
   */
  self.isBlockingOverlay = function() {
    if(self.introOverlay == null && self.adOverlay == null &&
      self.scoreOverlay == null && self.inAppOverlay == null &&
      self.imageOverlay == null && self.dismissableMessageOverlay == null) { return false; }
      
    return true;
  };

  /**
   * Adds the boot screen and event listeners
   * @private
   */
  self.addTestBootScreen = function() {
    var holder = document.createElement('span');
    holder.innerHTML = htmlStyleContainer.getIntroDiv();
    document.body.appendChild(holder);
    
    self.introOverlay = holder;
    
    var handleStartGame = function() {
      var url = window.location.href;
      var qaSdk = false;
      try { if(qa === true) qaSdk = true; } catch(err) { }
      
      /* Magic trick, we put our settings into the URL hash then reload the page.
       * This causes the game to boot from the beginning again, but it will already
       * know the settings.
       */
      var hashObject = {
        crossPromotionEnabled: !document.getElementById('fgl_hideMoreGames').checked,
        unlockEnabled:         !document.getElementById('fgl_hideUnlocks').checked,
        unlocked:              document.getElementById('fgl_unlockGame').checked,
        brandingEnabled:       document.getElementById('fgl_sponsored').checked,
        mouseEnabled:          !self.disableMouseInput,
      };
      
      if(qaSdk === true && document.getElementById('fgl_console')) {
        if(document.getElementById('fgl_console').checked) {
          hashObject.consoleKey = document.getElementById('fgl_console').getAttribute('data-key');
        }
      }

      var encodedHashString = encodeURIComponent(JSON.stringify(hashObject));
      self.started = true;
      
      // Replace intro screen with blank to avoid it looking unresponsive when loading
      if(holder != null) {
        document.body.removeChild(holder);
        holder = document.createElement('span');
        holder.innerHTML = htmlStyleContainer.getEmptyBackgroundDiv();
        document.body.appendChild(holder);
        self.introOverlay = holder;
      }
      
      // Reload, keeping query string
      var fglqsIndex = url.indexOf('fglqs=');
      
      if(fglqsIndex != -1) { // If there's an FGL query string, remove that first
        url = url.substr(0, fglqsIndex - 1);
      }
      
      if(url.indexOf('\?') != -1) { // There is a query string
        // Add fglqs to the end of the current query string
        window.location.href = url.split('#')[0] + '&fglqs=' + self.randomString(8) + 
          '#FGLSDK=' + encodedHashString;
      } else { // No query string
        // Set query string to fglqs
        window.location.href = url.split('#')[0] + '?fglqs=' + self.randomString(8) +
          '#FGLSDK=' + encodedHashString;
      }
    };
    
    // Set up the start game button
    self.setupClickEvents('fgl_startgamebutton', handleStartGame);
    
    // Make sure we're vertically centered:
    self.htmlHelpers.checkVerticalCentering();
  };
  
  self.showNotReadyWarning = function() {}
  
  /**
   * Do we have an event listener registered yet?
   * @private
   */
  self.htmlHelpers.hasResizeListener = false;
  
  /**
   * Used to vertically center popups:
   * @private
   */
  self.htmlHelpers.verticalCenter = function(element) {
    var topMargin = (window.innerHeight - element.offsetHeight) / 2;
    
    if (topMargin < 0) topMargin = 0;
    element.style.marginTop = topMargin + 'px';
  }
  
  /**
   * Checks the vertical centering of all elements which should be v-centered
   * @private
   */
  self.htmlHelpers.checkVerticalCentering = function() {
    var elements = document.getElementsByClassName('fgl-vcenter');
    for (var i = 0; i < elements.length; i++) {
      self.htmlHelpers.verticalCenter(elements[i]);
    }
    
    // Ensure we have an event listener:
    if (!self.htmlHelpers.hasResizeListener) {
      window.addEventListener('resize',
        self.htmlHelpers.checkVerticalCentering);
        
      window.addEventListener('orientationchange', 
        self.htmlHelpers.checkVerticalCentering);
        
      self.htmlHelpers.hasResizeListener = true;
    }
  }
  
  self.stopEventPropagation = function(e) {
    var ev = e || window.event;
    if(ev == null) { return; }
    
    ev.preventDefault();
    
    if(ev.stopPropagation != null) {
      ev.stopPropagation();
    }
    if(ev.cancelBubble != null) {
      ev.cancelBubble = true;
    }
    
    return false;
  }
  
  self.setupClickEvents = function(elementId, handlerFunction) {
    var element = document.getElementById(elementId);
    if(element != null) {
      if(self.disableMouseInput === false) { // Prevent mouse input if we're using touch events
        element.addEventListener('mousedown', function(e) { handlerFunction(e); }, false);
        element.addEventListener('click', function(e) { handlerFunction(e); }, false);
      } else {
        element.addEventListener('mousedown', function(e) { self.stopEventPropagation(e); }, false);
        element.addEventListener('click', function(e) { self.stopEventPropagation(e); }, false);
      }
      
      element.addEventListener('touchstart', function(e) { self.disableMouseInput = true; handlerFunction(e); }, false);
      element.addEventListener('touchend', function(e) { self.disableMouseInput = true; handlerFunction(e); }, false);
      
      // Disable other types of input events that might 'pass through' the overlays
      /*element.addEventListener('mousemove', function(e) { self.stopEventPropagation(e); }, false);
      element.addEventListener('mouseup', function(e) { self.stopEventPropagation(e); }, false);
      element.addEventListener('touchmove', function(e) { self.stopEventPropagation(e); }, false);*/
    }
  }
  
  /**
   * Get the CSS for the overlays
   * @private
   */
  htmlStyleContainer.getCss = function() {  
    var html = '.fgl-popup {' +
      'position: relative;' +

      'max-width: 450px;' +
      'margin: auto;' +
      'border-radius: 4px;' +
      'border: 1px solid #FFF;' +
      'color: #000;' +

      'background-color: #FFF;' +
      'box-shadow: 1px 1px 50px #111111;' +
    '}' +
    
    '.fgl-popup fieldset {' +
      'padding: 5px;' +
    '}' +

    '.fgl-popup-score {' +
      'width: 350px;' +
    '}' +

    '.fgl-popup-head, .fgl-message-head {' +
      'position: absolute;' +
      'border-radius: 3px 3px 0 0;' +

      'top: 0;' +
      'left: 0;' +
      'right: 0;' +
      'height: 44px;' +
      'line-height: 44px;' +
      'padding-left: 12px;' +

      'color: #FFF;' +
      'font-family: Arial, sans-serif;' +
      'font-size: 18px;' +

      'background: #494949;' +
      'background: -moz-linear-gradient(top,  #494949 0%, #373737 100%);' +
      'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#494949), color-stop(100%,#373737));' +
      'background: -webkit-linear-gradient(top,  #494949 0%,#373737 100%);' +
      'background: -o-linear-gradient(top,  #494949 0%,#373737 100%);' +
      'background: -ms-linear-gradient(top,  #494949 0%,#373737 100%);' +
      'background: linear-gradient(to bottom,  #494949 0%,#373737 100%);' +
      'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#494949", endColorstr="#373737",GradientType=0 );' +
    '}' +
    
    '.fgl-message-head {' +
      'background: #494988;' +
      'background: -moz-linear-gradient(top,  #494988 0%, #37375A 100%);' +
      'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#494988), color-stop(100%,#37375A));' +
      'background: -webkit-linear-gradient(top,  #494988 0%,#37375A 100%);' +
      'background: -o-linear-gradient(top,  #494988 0%,#37375A 100%);' +
      'background: -ms-linear-gradient(top,  #494988 0%,#37375A 100%);' +
      'background: linear-gradient(to bottom,  #494988 0%,#37375A 100%);' +
      'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#494988", endColorstr="#37375A",GradientType=0 );' +
    '}' +

    '.fgl-popup-headspacer {' +
      'margin-top: 54px;' +
    '}' +

    '.fgl-popup-subtitle {' +
      'font-family: Arial, sans-serif;' +
      'font-size: 15px;' +
      'text-align: center;' +
      'color: #666;' +
    '}' +

    '.fgl-popup p {' +
      'font-family: Arial, sans-serif;' +
      'font-size: 15px;' +
      'margin: 18px;' +
    '}' +

    '.fgl-popup-scorebox {' +
      'font-family: Arial, sans-serif;' +
      'font-size: 45px;' +
      'text-align: center;' +
      'color: #AB4140;' +
      'font-weight: bold;' +
      'border: 1px solid #DFDFDF;' +
      'margin: 10px 25px;' +
      'overflow: auto;' +
    '}' +

    '.fgl-popup-promptlabel {' +
      'padding: 15px;' +
      'font-size: 14px;' +
      'margin-left: 10px;' +
      'font-family: Arial, sans-serif;' +
    '}' +

    '.fgl-popup-footer {' +
      'padding: 10px;' +
      'margin: 0 15px 15px 15px;' +
    '}' +

    '.fgl-popup-bigfooter {' +
      'padding: 20px;' +
      'margin: 0 15px 15px 15px;' +
      'text-align: center;' +
    '}' +

    '.fgl-popup-prompt {' +
      'font-size: 16px;' +
      'height: 34px;' +
      'line-height: 33px;' +
      'width: 200px;' +
    '}' +

    '.fgl-popup-button {' +
      'padding: 8px 12px;' +
      'margin-left: 10px;' +

      'background: #ab4140;' +
      'background: -moz-linear-gradient(top,  #ab4140 0%, #973a39 100%);' +
      'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ab4140), color-stop(100%,#973a39));' +
      'background: -webkit-linear-gradient(top,  #ab4140 0%,#973a39 100%);' +
      'background: -o-linear-gradient(top,  #ab4140 0%,#973a39 100%);' +
      'background: -ms-linear-gradient(top,  #ab4140 0%,#973a39 100%);' +
      'background: linear-gradient(to bottom,  #ab4140 0%,#973a39 100%);' +
      'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#ab4140", endColorstr="#973a39",GradientType=0 );' +

      'color: #FFF;' +
      'text-decoration: none;' +
      'font-family: Arial, sans-serif;' +
      'font-weight: bold;' +
      'border-radius: 6px;' +
      'font-size: 15px;' +
      'cursor: pointer;' +
      'white-space: nowrap;' +
    '}' +

    '.fgl-popup-bigbutton {' +
      'padding: 16px 24px;' +
      'margin: auto;' +

      'background: #ab4140;' +
      'background: -moz-linear-gradient(top,  #ab4140 0%, #973a39 100%);' +
      'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ab4140), color-stop(100%,#973a39));' +
      'background: -webkit-linear-gradient(top,  #ab4140 0%,#973a39 100%);' +
      'background: -o-linear-gradient(top,  #ab4140 0%,#973a39 100%);' +
      'background: -ms-linear-gradient(top,  #ab4140 0%,#973a39 100%);' +
      'background: linear-gradient(to bottom,  #ab4140 0%,#973a39 100%);' +
      'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#ab4140", endColorstr="#973a39",GradientType=0 );' +

      'color: #FFF;' +
      'text-decoration: none;' +
      'font-family: Arial, sans-serif;' +
      'border-radius: 4px;' +
      'font-size: 21px;' +
      'cursor: pointer;' +
      'white-space: nowrap;' +
    '}' +

    '.fgl-popup-actions {' +
      'text-align: right; ' +
      'padding: 0 16px 16px 16px;' +
      'margin-right: -6px;' +
    '}' +

    '.fgl-popup fieldset {' +
      'margin: 16px;' +
      'font-family: Arial, sans-serif;' +
    '}' +

    '.fgl-popup fieldset label {' +
      'display: block;' +
    '}' +

    '.fgl-popup-close {' +
      'float: right;' +
      'color: rgba(255,255,255,0.5);' +
      'text-decoration: none;' +
      'font-size: 30px;' +
      'padding-right: 10px;' +
    '}' +

    '.fgl-popup-close-huge {' +
      'position: fixed;' +
      'top: 10px;' +
      'right: 10px;' +
      'color: rgba(255,255,255,0.5);' +
      'text-decoration: none;' +
      'font-size: 70px;' +
      'padding-right: 20px;' +
    '}' +

    '.fgl-popup-close:hover {' +
      'color: rgba(255,255,255,1);' +
    '}' +
    
    '.fgl-scoreboard {' +
      'border-spacing: 0;' +
      'border-collapse: collapse;' +
      'font-family: Arial, sans-serif;' +
      'width: 100%;' +
      'text-align: left;' +
    '}' +
    
    '.fgl-scoreboard th, .fgl-scoreboard td {' +
      'text-align: left;' +
      'padding: 2px 13px;' +
    '}' +
    
    '.fgl-scoreboard tr {' +
      'border-bottom: 1px solid #EEE;' +
    '}' +
    
    '.fgl-score-highlight td {' +
      'background-color: #FFEE77;' +
    '}' +
    
    '.fgl-image-overlay {' +
      'margin: auto;' +
      'cursor: pointer;' +
    '}' +
    
    '* {' +
      '-webkit-tap-highlight-color: rgba(0,0,0,0);' +
    '}' +

    'body {' +
      'overflow: hidden;' +
    '}' +
    
    '::-webkit-scrollbar {' +
      'display: none; ' +
    '}';
    return html;
  };
  
  htmlStyleContainer.getEmptyBackgroundDiv = function() {
    var html = '<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #000; z-index: 10000;" id="fgl_overlay"></div>';
    return html;
  };
  
  htmlStyleContainer.getIntroDiv = function() {
    var createToggle = function(id){
        return "ontouchstart='this.touchEvent = true;'" + 
                "ontouchend='if(this.touchEvent == true) { document.getElementById(\"" + id + "\").checked = !document.getElementById(\"" + id + "\").checked; } this.touchEvent = false;' " +
                "onclick='if(this.ontouchend){ this.ontouchend = null; return this.touchEvent; } return true;'";
    };
    
    var qaSdk = false;
    try { if(qa === true) qaSdk = true; } catch(err) { }
    
    var consoleKey = self.randomString(4);
    var html = '<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #000; z-index: 10000;" id="fgl_overlay">' +
      '<div id="popup" class="fgl-popup fgl-vcenter">' +
        '<div class="fgl-popup-head">' + introTitleHtml + '</div>' +
        '<div class="fgl-popup-headspacer"></div>' +
        introHtml +
        '<fieldset>' +
        '<legend>Test Session Options:</legend>' +
        '<label ' + createToggle('fgl_hideMoreGames') + '><input type="checkbox" id="fgl_hideMoreGames"> Disable cross promotion</label>' +
        '<label ' + createToggle('fgl_hideUnlocks')   + '><input type="checkbox" id="fgl_hideUnlocks"> Disable in app upgrade</label>' +
        '<label ' + createToggle('fgl_unlockGame')    + '><input type="checkbox" id="fgl_unlockGame"> Game is premium mode</label>' +
        '<label ' + createToggle('fgl_sponsored')     + '><input type="checkbox" id="fgl_sponsored"> Show sponsor branding</label>' +
        (qaSdk === true ? '<label ' + createToggle('fgl_console') + '><input type="checkbox" id="fgl_console" data-key="' + consoleKey + 
          '"> Use jsconsole (<a href="http://jsconsole.com/?%3Alisten%20fglr-' + consoleKey + 
          '" target="_blank">fglr-' + consoleKey + '</a>) </label>' : '') +
        '</fieldset>' +
        '<div class="fgl-popup-bigfooter">' +
          '<a class="fgl-popup-bigbutton" id="fgl_startgamebutton">QA Test Game</a>' +
        '</div>' +
      '</div>' +
      '</div>';
    return html;
  };
  
  htmlStyleContainer.createPopup = function(title, html, id) {
    var overlayId = id || 'fgl_overlay';
    var wrapper = '<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.8); z-index: 10000;" id="' + overlayId + '">' +
      '<div id="popup" class="fgl-popup fgl-vcenter">' +
        '<div class="fgl-popup-head">' +
        title +
        '<a href="#" class="fgl-popup-close" id="' + overlayId + '_close">&times;</a></div>' +
        '<div class="fgl-popup-headspacer"></div>' +
        html +
      '</div>' +
      '</div>';
    return wrapper;
  };
  
  htmlStyleContainer.createMessage = function(title, html, id) {
    var overlayId = id || 'fgl_overlay';
    var wrapper = '<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; opacity: 0; background-color: rgba(0,0,0,0); z-index: 10000; pointer-events: none;" id="' + overlayId + '">' +
      '<div id="popup" class="fgl-popup">' +
        '<div class="fgl-message-head">' + title + '</div>' +
        '<div class="fgl-popup-headspacer"></div>' +
        html +
      '</div>' +
      '</div>';
    return wrapper;
  };
  
  htmlStyleContainer.getIapDiv = function(id) {
    var overlayId = id || 'fgl_overlay';
    var html = '<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.8); z-index: 10000;" id="' + overlayId + '">' +
      '<div id="popup" class="fgl-popup fgl-vcenter">' +
        '<div class="fgl-popup-head">Example In-App Purchase<a href="#" class="fgl-popup-close" id="' + overlayId + '_close">&times;</a></div>' +
        '<div class="fgl-popup-headspacer"></div>' +
        '<p>Press \'Unlock\' to simulate a successful in-app purchase, \'Cancel\' otherwise.</p>' +
        '<div class="fgl-popup-actions">' +
          '<a class="fgl-popup-button" id="fgl_iapunlockbutton">Unlock</a>' +
          '<a class="fgl-popup-button" id="fgl_iapcancelbutton">Cancel</a>' +
        '</div>' +
      '</div>' +
      '</div>';
    return html;
  };
  
  htmlStyleContainer.getScoreDiv = function(score, name, id) {
    var overlayId = id || 'fgl_overlay';
    var html = '<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.8); z-index: 10000;" id="' + overlayId + '">' +
      '<div id="popup" class="fgl-popup fgl-popup-score fgl-vcenter">' +
        '<div class="fgl-popup-head">Submit Your Score<a href="#" class="fgl-popup-close" id="' + overlayId + '_close">&times;</a></div>' +
        '<div class="fgl-popup-headspacer"></div>' +
        '<div class="fgl-popup-subtitle">Your Score</div>' +
        '<div class="fgl-popup-scorebox">' + score + '</div>';
        if(name == null) {
          html += '<label class="fgl-popup-promptlabel">Enter your name:</label>' +
          '<div class="fgl-popup-footer">' +
            '<input type="text" class="fgl-popup-prompt" id="fgl_scorenameinput" maxlength="30">' +
            '<a class="fgl-popup-button" id="fgl_scoresubmitbutton">Submit</a>' +
          '</div>';
        } else {
          html += '<div class="fgl-popup-subtitle">Your name: "' + name + '"</div>' +
          '<div class="fgl-popup-footer" style="text-align: center;">' +
            '<a class="fgl-popup-button" id="fgl_scoresubmitbutton">Submit</a>' +
          '</div><p hidden id="fgl_scorenameinput">' + name + '</p>';
        }
      html += '</div></div>';
    return html;
  };
  
  htmlStyleContainer.getImageOverlay = function(src, width, height, id) {
    var overlayId = id || 'fgl_overlay';
    var imgTagAttributes = '';
    var scalePercent = 1;
    if (width) {
      if(width > document.body.clientWidth) { scalePercent = document.body.clientWidth / width; width = document.body.clientWidth; }
      imgTagAttributes += ' width="' + width + '"';
    }
    if (height) imgTagAttributes += ' height="' + (height * scalePercent) + '"';
    var html = '<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.8); z-index: 10000;" id="' + overlayId + '">' +
      '<a href="#" class="fgl-popup-close-huge" id="' + overlayId + '_close">&times;</a>' +
      '<div id="image" class="fgl-vcenter" style="text-align: center;">' +
        '<img src="' + src + '" class="fgl-image-overlay" onload="fgl.htmlHelpers.checkVerticalCentering();"' + imgTagAttributes + ' />' +
      '</div>' +
      '</div>';
    return html;
  };
};
