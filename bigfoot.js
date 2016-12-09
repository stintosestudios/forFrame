
// start by setting up the scene
scene({

    // define some parts
    parts : [{
            id : 'footarea',
            w : 64,
            h : 128
        }
    ],

    // define the forFrame movement
    forFrame : (function () {

        // the function that will be called on each update
        return function () {

            var pt = this.parts['footarea'];

            pt.y = 240 - 64;
            pt.x = 320 - 32;
            pt.radian = 6.28 * this.percentDone;

        };

    }

        ())

});

// inject a canvas into the given id.
scene.injectCanvas('apparea');

// jump to a given frame
//scene.setFrame(14);

scene.renderFrame();

// play the scene
scene.play();
