/*
* raggish.js
* This module defines the raggish namespace and 
* initializes submodules.
*/

/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/

/*global raggish */

var raggish = (function () {
  'use strict';
  var initModule, startPlay, stop,
    stateMap = {
      player         : null,
      isPlaying      : false,
      beat           : 0,
    },
    configMap = {
      tempo : 450
    };

  initModule = function( leftNotes, rightNotes ) {
    raggish.sampler.initModule();
    raggish.leftHand.initModule( leftNotes );
    raggish.rightHand.initModule( rightNotes );
  };

  function play () {
    raggish.leftHand.leftPlayBeat(stateMap.beat);
    raggish.rightHand.rightPlayBeat(stateMap.beat);
    
    stateMap.beat = (stateMap.beat+1) % 32;
    stateMap.player = setTimeout(play, configMap.tempo);
  }

  startPlay = function () {
    if( !stateMap.isPlaying) {
      stateMap.isPlaying     = true;
      stateMap.beat          = 0;
      stateMap.player        = setTimeout(play, configMap.tempo);
    }
  };

  stop = function () {
    stateMap.isPlaying = false;
    clearTimeout(stateMap.player);
    raggish.rightHand.reset();
  };

  return {
    initModule : initModule,
    startPlay  : startPlay,
    stop       : stop
  };
})();