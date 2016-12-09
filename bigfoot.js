
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

        var sectionIndex = 0;

        var sections = [

            function () {

                var pt = this.parts['footarea'];

                pt.y = 240 - 64 + 200 * this.percentDone;
                pt.x = 320 - 32;

            },
            function () {

                var pt = this.parts['footarea'];

                pt.y = 240 - 64 + 66;
                pt.x = 320 - 32 + 200 * (this.percentDone - 0.33);

            },
            function () {

                var pt = this.parts['footarea'];

                var delta = 66 * ((this.percentDone - 0.66) / 0.33);

                pt.y = 240 - 64 + 66 - delta;
                pt.x = 320 - 32 + 66 - delta;

            },

        ];

        // the function that will be called on each update
        return function () {

            //pt.radian = 6.28 * this.percentDone;

            sectionIndex = Math.floor(this.frame / (this.maxFrame / 3));

            sections[sectionIndex].call(this)

            //console.log(section);

            //console.log(this);

        };

    }

        ())

});

// inject a canvas into the given id.
scene.injectCanvas('apparea');

// jump to a given frame
scene.setFrame(1);

scene.renderFrame();

// play the scene
scene.play();
