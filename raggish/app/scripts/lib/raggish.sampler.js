/*
* raggish.sampler.js
* This module defines routines for loading soundfiles and 
* playing them back. 
*/

/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/

/*global raggish, webkitAudioContext */

raggish.sampler = (function () {
  var oscContext = new webkitAudioContext(),
    leftNode = oscContext.createGainNode(),
    rightNode = oscContext.createGainNode(),
    pianoSources = [],
    requests = [],
    i = 0;

  function bufferSoundOfI(i,buffers ) {
    return function bufferSound(event) {
      var request = event.target,
        source = oscContext.createBufferSource();
      source.buffer = oscContext.createBuffer(request.response, false);
      buffers[i] = source;
      buffers[i].connect(oscContext.destination);
    };
  }

  function loadPiano() {
    for(i=0; i<88; i+=1) {
      requests[i] = new XMLHttpRequest();
      requests[i].open('GET', './assets/samples/piano/'+(i)+'.mp3', true);
      requests[i].responseType = 'arraybuffer';
      requests[i].addEventListener('load', bufferSoundOfI(i, pianoSources), false);
      requests[i].send();
    }
  }

  function initModule()  {
    leftNode.connect(oscContext.destination);
    rightNode.connect(oscContext.destination);

    leftNode.gain.value = 0.6;
    rightNode.gain.value = 1.2;
    loadPiano();
  }

  function playSample(i,stopTime, gain, delay) {
    var
      start,
      source = oscContext.createBufferSource();
    source.buffer = pianoSources[i].buffer;

    if(gain) {
      source.connect(rightNode);
    }
    else {
      source.connect(leftNode);
    }
    if ( !delay ) { delay = 0; }
    else { delay = delay; }
    
    start = oscContext.currentTime + delay;
    source.start(start+delay);
    if(stopTime) {
      source.stop(start+stopTime+(delay));
    }
  }

  return {
    initModule : initModule,
    playSample : playSample
  };
})();