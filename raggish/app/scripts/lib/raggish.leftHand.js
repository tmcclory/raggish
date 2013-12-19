/*
* raggish.leftHand.js
* This module defines behavior of the left hand.
*/

/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/

/*global raggish */

raggish.leftHand = (function () {
  var initModule, leftPlayBeat,
    configMap = {
      scaleConfig : [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24,26,28,29,31,33,35,36,
                     38,40,43,45,47,48,50,52,53,55]
    },
    stateMap = {
      notes     : null,
    };

  initModule = function( notes ) {
    var i;
    
    for(i=0; i< configMap.scaleConfig.length; i++) {
      configMap.scaleConfig[i] += 24;
    }
    stateMap.notes = notes;
  };

  leftPlayBeat = function( beat ) {
    var playSample = raggish.sampler.playSample,
      scale = configMap.scaleConfig, i;

    i = stateMap.notes[Math.floor(beat/8)];

    if(beat%2 === 0) {
      playSample(scale[15-i], 0.45);
    }
    else {
      playSample(scale[15-i+4],  0.45);
      playSample(scale[15-i+7],  0.45);
      playSample(scale[15-i+9],  0.45);
      playSample(scale[15-i+13], 0.45);
    }
  };

  return {
    initModule   : initModule,
    leftPlayBeat : leftPlayBeat,
  };
})();