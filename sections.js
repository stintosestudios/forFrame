

scene({

    maxFrame : 100,

    // define some parts
    parts : [
        {
            id : 'box',
            w : 64,
            h : 64

        },
        {
            id : 'sectionBox',
            w : 128,
            h : 128
        }

    ],

    // use sections
    sections : {

        // the section timeline
        timeLine : 'open:25%;hold:50%;close:25%',

        forFrame : [

            // an opening animation method
            {

                id : 'open',
                forFrame : function () {}

            },

            // hold a static state
            {

                id : 'hold',
                forFrame : function () {}

            },

            // close animation
            {

                id : 'close',
                forFrame : function () {}

            }

        ]
    },

    forFrame : function () {

        var pt = this.parts['box'];

        // use currentSection
        //this.currentSection();

        // you can do something else that goes on for the whole animaion

        pt.y = 480-64;
        pt.x = -64 + 704 * this.percentDone;

    }

});

// inject a canvas into an element with an id of 'apparea'.
scene.injectCanvas('apparea');

// play the scene
scene.play();
