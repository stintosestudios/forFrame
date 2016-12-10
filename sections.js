

scene({

    maxFrame : 100,

    // define some parts
    parts : [{
            id : 'box',
            w : 64,
            h : 64

        }, {
            id : 'sectionBox',
            w : 128,
            h : 128
        }

    ],

    // use sections
    sections : {

        // the section timeline
        timeline : 'open:25;hold:75;close:100',

        forFrame : {

            // an opening animation method
            open : function () {

                var pt = this.parts['sectionBox'];

                pt.x = 0 + (320 - 64) * this.sectionPer;

            },

            // hold a static state
            hold : function () {

			   
                var pt = this.parts['sectionBox'];

			
                pt.x = 320 - 64;

            },

            // close animation
            close : function () {

                var pt = this.parts['sectionBox'];

                pt.x = (320 - 64) + 320 * this.sectionPer;

            }

        }
    },

    forFrame : function () {

        var pt = this.parts['box'];

        // use currentSection
        this.currentSection();

        // you can do something else that goes on for the whole animaion

        pt.y = 480 - 64;
        pt.x = -64 + 704 * this.percentDone;

    }

});

// inject a canvas into an element with an id of 'apparea'.
scene.injectCanvas('apparea');

// jump to a given frame
//scene.setFrame(99);
//scene.renderFrame();

// play the scene
 scene.play();
