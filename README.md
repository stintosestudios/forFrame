# forframe.js

A simple tool for making animations that will end up being furnished to *.gif, a sprite sheet *.png, ect.


## Getting started.

To start a simple box animation you would use forframe.js like this, injecting a canvas into a container HTML element with an id of "apparea".

        // start by setting up the scene
        scene({

            // define some parts
            parts : [{id:'myBox',w:32,h:32}],

            // define the forFrame movement
            forFrame : function(){

                var pt = this.parts['myBox'];

                pt.y = 10 + Math.pow(2,this.percentDone * 8.8);
                pt.x = 10 + this.percentDone * 598;

            }

        });

        // inject a canvas into the given id.
        scene.injectCanvas('apparea');

        // play the scene
        scene.play();

## Setting an animation to a given frame.

In some cases you might want to set the animation you are working out to a certain frame, rather then playing it back at the typical forward frame rate. That can be done by just calling scene.setFrame, however in order to see anything you will want to also use scene.injectCanvas, and scene.renderFrame

    // inject a canvas into the given id.
    scene.injectCanvas('apparea');

    // set to frame 12
    scene.setFrame(12);

    // I would like to see what that looks like
    scene.renderFrame();
