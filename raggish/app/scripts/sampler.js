//var Context = new webkitAudioContext();//webkit browsers only
    //oscillator = oscContext.createOscillator();

var oscContext = new webkitAudioContext();
leftNode = oscContext.createGainNode();
leftNode.connect(oscContext.destination);
rightNode = oscContext.createGainNode();
rightNode.connect(oscContext.destination);

var blobURL;

drumSources = []
pianoSources = []
var requests = [];
var i = 0;
var drum;


for(i=0; i<88; i+=1) {
	requests[i] = new XMLHttpRequest();
	requests[i].open('GET', './assets/samples/piano/'+(i)+".mp3", true);
	requests[i].responseType = 'arraybuffer';
	requests[i].addEventListener('load', bufferSoundOfI(i, pianoSources), false);
	requests[i].send();
}

function bufferSoundOfI(i,buffers ) {
	return function bufferSound(event) {
	    var request = event.target;
	    var source = oscContext.createBufferSource();
	    source.buffer = oscContext.createBuffer(request.response, false);
	    buffers[i] = source;
	    buffers[i].connect(oscContext.destination);
	}
}

function stopRecording(blobURL) {
	rec.stop();
	exportRecording(blobURL);
}


function playSample(i,stopTime, gain) {

	var source = oscContext.createBufferSource();
  source.buffer = pianoSources[i].buffer;

  leftNode.gain.value = .3;
  rightNode.gain.value = .9;
	if(gain) {
	  source.connect(rightNode);
	}
	else {
	  source.connect(leftNode);
	}
	var start = oscContext.currentTime;
	source.start(0);
	if(stopTime) {
	  source.stop(start+stopTime)
	}
	
	
}

