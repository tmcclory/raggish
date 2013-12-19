/*
* main.js
* This contoller initializes the sampler and coordinates
* playback. 
*/

/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/

/*global raggish */

'use strict';

angular.module('autoragApp')
  .controller('MainCtrl', function ($scope) {
    var songName = 'rag';

    
    $scope.isLeftOn = function( i, j ) {
      var isOn = $scope.leftNotes[i] === j;
      return isOn;
    };

    $scope.isRightOn = function( i, j ) {
      return $scope.rightNotes[i] === j;
    };
    
    $scope.switchNote = function(hand, i,j) {
      switch ( hand ) {
      case 0:
        if ( $scope.rightNotes[i] === j) {
          $scope.rightNotes[i] = null;
        }
        else {
          $scope.rightNotes[i] = j;
        }
        break;
      case 1:
        $scope.leftNotes[i] = j;
        break;
      }
    };
  
    $scope.clickPlay = function (){
      $scope.save();
      raggish.startPlay();
    };
    
    $scope.stop = function() {
      raggish.stop();
    };

    $scope.load = function() {
      var hands;
      if( typeof localStorage[songName] === 'undefined' ) {
        $scope.rightNotes = [15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,2,3,4,5,14,1];
        $scope.leftNotes  = [15,12,14,9];
      }
      else{
        hands = JSON.parse(localStorage[songName]);
        $scope.rightNotes = hands.rightNotes;
        $scope.leftNotes  = hands.leftNotes;
      }
    };
    
    $scope.load();
    raggish.initModule( $scope.leftNotes, $scope.rightNotes, $scope.updateHighlight);
    
    $scope.save = function() {
      var hands = {
        'leftNotes'  : $scope.leftNotes,
        'rightNotes' : $scope.rightNotes
      };
      localStorage[songName] = JSON.stringify(hands);
    };
  });
