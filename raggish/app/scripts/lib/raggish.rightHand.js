/*
* raggish.rightHand.js
* This module defines the behavior of the right hand
*/

/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/

/*global raggish */

raggish.rightHand = (function () {
  var initModule, rightPlayBeat, reset,
    configMap = {
      scaleConfig : [0,2,4,7,9,12,14,17,19,21,24,26,28,29,31,33,35]
    },
    stateMap = {
      notes  : null,
      octave : true,
      rightBeat : 0
    };

  initModule = function( notes ) {
    //initialize hands
    var i;

    for(i=0; i< configMap.scaleConfig.length ; i++) {
      configMap.scaleConfig[i] += 36;
    }
    stateMap.notes = notes;
  };

  rightPlayBeat = function( beat ) {

    var i,
      playSample = raggish.sampler.playSample,
      scale      = configMap.scaleConfig,
      octave     = stateMap.octave,
      offset     = octave ? 12 : 0;

    function longBeat( i ) {
      playSample(scale[15-i]+offset, 0.9, 0.8);
    }

    function shortBeat( i ) {
      playSample(scale[15-i]+offset, 0.45, 0.8);
    }

    switch ( beat % 3) {
    case 0:
      i = stateMap.notes[ stateMap.rightBeat ];
      if( i ) {
        longBeat(i);
        if( stateMap.rightBeat%4 === 0) {
          longBeat(i-2);
        }
      }
      stateMap.rightBeat = (stateMap.rightBeat + 1) % 21;
      break;
    case 2:
      i = stateMap.notes[ stateMap.rightBeat ];
      if( i ) { shortBeat(i); }
      stateMap.rightBeat = (stateMap.rightBeat + 1) % 21;
      break;
    }
    
    if(beat === 0) { stateMap.octave = !octave;}
  };

  reset = function() {
    stateMap.rightBeat = 0;
    stateMap.octave    = true;
  };

  return {
    initModule    : initModule,
    rightPlayBeat : rightPlayBeat,
    reset         : reset
  };
})();