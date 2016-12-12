
// start by setting up the scene
scene({

    maxFrame : 120,

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
            h : 96,

            skin : {

                imgIndex : 1

            }

        }, {
            id : 'floor',
            w : 640,
            h : 400
        }
    ],

    sections : {

        timeline : 'back:10;hold:60;forward:100',

        forFrame : {

            back : function () {

                var pt = this.parts['footarea'],
                //radian = 1.25 - 2.5 * this.sectionPer;
                radian = 0.5 - 1.5 * this.sectionPer;

                pt.x = -32 + 320;
                pt.y = -64 + 240;
                pt.radian = radian;

                pt.skin.xOffset = -20;
                pt.skin.yOffset = -20;

                pt = this.parts['floor'];
                pt.y = 480 - (400 - 400 * this.sectionPer);

                pt = this.parts['headarea'];

                pt.radian = 0.2 + 0.4 * this.sectionPer;

                return radian;

            },

            hold : function () {

                var pt = this.parts['footarea'],
                //radian = 1.25 - 2.5;
                radian = -1;

                pt.radian = radian;

                pt = this.parts['floor'];
                pt.y = 480;

                pt = this.parts['headarea'];

                pt.radian = 0.6;

                return radian;

            },

            forward : function () {

                var pt = this.parts['footarea'],
                //radian = (6.28 - 1.25) + 2.5 * this.sectionPer;

                radian = -1 + 1.5 * this.sectionPer; ;

                pt.radian = radian;

                pt = this.parts['floor'];
                pt.y = 480 - (400 * this.sectionPer);

                pt = this.parts['headarea'];
                pt.radian = 0.4 - 0.4 * this.sectionPer + 0.2;

                return radian;

            }

        }

    },

    // define the forFrame movement
    forFrame : function () {

        var radian = this.currentSection();

        // the head always moves with the current radian from the current section method.
        pt = this.parts['headarea'];

        pt.x = (320 - 48) + Math.sin(Math.PI - radian) * 80;
        pt.y = (240 - 48) + Math.cos(Math.PI - radian) * 80;

    }

});

// inject a canvas into the given id.
scene.injectCanvas('apparea');

scene.load(['demo/img/foot.png', 'demo/img/pathead.png'], function () {

    console.log('okay looking good I think');

    // jump to a given frame
    //scene.setFrame(0);

    //scene.renderFrame();

    scene.play();

});
