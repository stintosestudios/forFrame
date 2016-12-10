
// start by setting up the scene
scene({

    maxFrame : 100,

    // define some parts
    parts : [{
            id : 'footarea',
            w : 64,
            h : 128
        }, {
            id : 'headarea',
            w : 64,
            h : 64
        }
    ],

    sections : {

        timeline : 'back:10;hold:30;forward:100',

        forFrame : {

            back : function () {

                var pt = this.parts['footarea'];
                pt.y = 240 - 64;
                pt.x = 320 - 32;
                pt.radian = 1.25 - 2.5 * this.sectionPer;

            },

            hold : function () {

                var pt = this.parts['footarea'];
                pt.y = 240 - 64;
                pt.x = 320 - 32;
                pt.radian = 1.25 - 2.5;

            },

            forward : function () {

                var pt = this.parts['footarea'];

                pt.y = 240 - 64;
                pt.x = 320 - 32;
                pt.radian = (6.28 - 1.25) + 2.5 * this.sectionPer;

            }

        }

    },

    // define the forFrame movement
    forFrame : function(){

        this.currentSection();

    }

});

// inject a canvas into the given id.
scene.injectCanvas('apparea');

// jump to a given frame
//scene.setFrame(21);

scene.renderFrame();

// play the scene
scene.play();
