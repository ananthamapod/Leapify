var sys = require('sys');
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    console.log(stdout);
}
var Leap = require("leapjs");


var commands = {'screenTap': 'tell application "Spotify" to playpause',
    'up': 'tell application "Spotify" to set sound volume to (sound volume * 10)',
    'down': 'tell application "Spotify" to set sound volume to (sound volume / 10)',
    'left': 'tell application "Spotify" to previous',
    'right': 'tell application "Spotify" to next track'};


var controller = Leap.loop({enableGestures: true}, function(frame){
  if(frame.valid && frame.gestures.length > 0){
    frame.gestures.forEach(function(gesture) {
        switch (gesture.type){
          case "circle":
              //console.log("Circle Gesture");
              break;
          case "keyTap":
              //console.log("Key Tap Gesture");
              break;
          case "screenTap":
              //console.log("Screen Tap Gesture");
              leapify("screenTap");
              break;
          case "swipe":
              //console.log("Swipe Gesture");
              if(gesture.type == "swipe") {
                var gestureId;
                var newGesture = false;
                /* allows the gesture frames associated with a single gesture
                 * to be grouped together
                 */
                if(gestureId !== gesture.id) {
                    gestureId = gesture.id;
                    newGesture = true;
                }
                //Classify swipe as either horizontal or vertical
                var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                //Classify as right-left or up-down
                if(isHorizontal){
                    if(gesture.direction[0] > 0){
                        swipeDirection = "right";
                    } else {
                        swipeDirection = "left";
                    }
                } else { //vertical
                    if(gesture.direction[1] > 0){
                        swipeDirection = "up";
                    } else {
                        swipeDirection = "down";
                    }
                }
                if(newGesture) {
                    leapify(swipeDirection);
                }
              }
              break;
        }
    });
  }
});



var leapify = function(command) {
    console.log("osascript -e \'" + commands[command] + "\'");
    exec("osascript -e \'" + commands[command] + "\'", puts);
};
