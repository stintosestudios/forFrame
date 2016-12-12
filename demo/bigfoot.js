
// start by setting up the scene
scene({

    maxFrame : 100,

    // define some parts
    parts : [{
            id : 'footarea',
            w : 64,
            h : 128,

            skin : {

                imgIndex : 0

            }

        }, {
            id : 'headarea',
            w : 96,
            h : 96
        }, {
            id : 'floor',
            w : 640,
            h : 400
        }
    ],

    sections : {

        timeline : 'back:10;hold:50;forward:100',

        forFrame : {

            back : function () {

                var pt = this.parts['footarea'],
                radian = 1.25 - 2.5 * this.sectionPer;

                pt.x = -32 + 320;
                pt.y = -64 + 240;
                pt.radian = radian;

                pt.skin.xOffset = -20;
                pt.skin.yOffset = -20;

                pt = this.parts['floor'];
                pt.y = 480 - (400 - 400 * this.sectionPer);

                return radian;

            },

            hold : function () {

                var pt = this.parts['footarea'],
                radian = 1.25 - 2.5;

                pt.radian = radian;

                pt = this.parts['floor'];
                pt.y = 480;

                return radian;

            },

            forward : function () {

                var pt = this.parts['footarea'],
                radian = (6.28 - 1.25) + 2.5 * this.sectionPer;

                pt.radian = radian;

                pt = this.parts['floor'];
                pt.y = 480 - (400 * this.sectionPer);

                return radian;

            }

        }

    },

    // define the forFrame movement
    forFrame : function () {

        var radian = this.currentSection();

        // the head always moves with the current radian from the current section method.
        pt = this.parts['headarea'];
        //pt.y = (176 - 32) + Math.cos(Math.PI - radian) * 64;
        //pt.x = (288 - 32) + Math.sin(Math.PI - radian) * 128;

        pt.x = (320-48) + Math.sin(Math.PI - radian) * 80;
        pt.y = (240-48) + Math.cos(Math.PI - radian) * 80;

    }

});

// inject a canvas into the given id.
scene.injectCanvas('apparea');

scene.load(['demo/img/monty_python_foot.png'], function () {

    console.log('okay looking good I think');

    scene.play();

});

// jump to a given frame
//scene.setFrame(0);

//scene.renderFrame();

// play the scene
//scene.play();
