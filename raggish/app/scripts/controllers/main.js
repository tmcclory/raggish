'use strict';

angular.module('autoragApp')
  .controller('MainCtrl', function ($scope) {
    $scope.left_hand = [];
    $scope.right_hand = [];
    $scope.hands = []
    
    
    //initialize hands
    var i,j,k=0,
        numBeats = 32, numNotes = 16, player,
        isPlaying = false, beat=0, tempo = 450,
        numLeftHandBeats = 21, rightHandBeat=0, 
        songName = 'rag', leftConfig=[], rightConfig=[],
        scaleConfig, octave = false;
    
    scaleConfig = [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24,26,28,29,31,33,35];
    for(i=0;i<20;i++) {
      rightConfig.push(36+scaleConfig[i]);
      leftConfig.push(24+scaleConfig[i]);
    }
    
    //rightConfig = [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24];
       
    //set up right hand
    $scope.hands.push( [] ); 
    for(j=0; j<numLeftHandBeats; j++) {
      $scope.hands[0].push( [] )
      for(k=0; k<numNotes; k++) {
        $scope.hands[0][j][k]=false
      }
    }
    
    //set up left hand
    $scope.hands.push( [] ) 
    for(j=0; j<numBeats; j++) {
      $scope.hands[1].push( [] )
      for(k=0; k<numNotes; k++) {
        $scope.hands[1][j][k]=false
      }
    }
    
    
    $scope.switchNote = function(hand, i,j) {
      if ($scope.hands[hand][i][j] === true && hand===0) {
        $scope.hands[hand][i][j] = false;
      }
      else {
        var k = 0; 
        for(k=0;k<numNotes;k++) {
            $scope.hands[hand][i][k] = false;
        }
        $scope.hands[hand][i][j] = true;
      }
    };
      
    $scope.play = function() {
      var i=0;
      isPlaying = true;
              
      for(i=0;i<16;i+=1) {
        if((beat)%3==0 || (beat)%3==1) {
          if($scope.hands[0][rightHandBeat][i] && rightHandBeat%2==0) {
            if(octave) { 
              playSample(rightConfig[15-i]+12,.9,.8) 
              if( i<8 && rightHandBeat%4===0 ){ playSample(rightConfig[15-i-2],.9,.8); }  
            }
            else { 
              playSample(rightConfig[15-i],.9,.8);
              if( i<8 && rightHandBeat%8===0 ){ playSample(rightConfig[15-i-2],.9,.8); } 
            }
                 
          }
          else if($scope.hands[0][rightHandBeat][i] && rightHandBeat%2==1) {
            if(octave) { playSample(rightConfig[15-i]+12,.45,.8)  }
            else { playSample(rightConfig[15-i],.45,.8)  }
          }
        }
        if($scope.hands[1][beat][i]) {
          if(beat%2 === 0) {
            playSample(leftConfig[15-i],.45);
          }
          else {
            playSample(leftConfig[15-i],.45);
            //playSample(leftConfig[15-i+2],.45);
            playSample(leftConfig[15-i+7],.45); 
          }
        }        
      }
      if((beat-1)%3==0 || (beat-1)%3==2) {
        rightHandBeat=(rightHandBeat+1)%21;
      }
      beat=(beat+1)%32
      if(beat===0) {octave = !octave;}
      player = setTimeout($scope.play, tempo);
    };
    
    $scope.clickPlay = function (){
      $scope.save();
      if(!isPlaying) {
        $scope.play();
      }
      
    };
    
    $scope.stop = function() {
      isPlaying = false;
      clearTimeout(player);
      beat=0;
      rightHandBeat=0;
    };

    $scope.load = function() {
      var defaultString = "[[[false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false],[false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false],[true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false]],[[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],[false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],[false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],[false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],[false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],[false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],[false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],[false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],[false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false],[false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false],[false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false],[false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false],[false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false],[false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false],[false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false],[false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false],[false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false]]]"
      if(localStorage[songName]) {
        $scope.hands = JSON.parse(localStorage[songName]);
      }
      else{
        $scope.hands = JSON.parse(defaultString);
      }
    };
    
    $scope.load();
    
    $scope.save = function() {
      console.log($scope.hands)
      localStorage[songName] = JSON.stringify($scope.hands)
    }
  });
