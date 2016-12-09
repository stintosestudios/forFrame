
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

        var sectionIndex = 0,

        sectionPer,

        findSectionPer = function () {

            sectionPer = this.percentDone - 1 / sections.length * sectionIndex;
            sectionPer = sectionPer / (1 / sections.length);

        };

        // animation sections
        var sections = [

            function () {

                var pt = this.parts['footarea'];

                pt.y = 240 - 64;
                pt.x = 320 - 32;
                pt.radian = 1.25 - 2.5 * sectionPer;

            },
            function () {

                var pt = this.parts['footarea'];

                pt.y = 240 - 64;
                pt.x = 320 - 32;

            },
            function () {

                var pt = this.parts['footarea'];

                pt.y = 240 - 64;
                pt.x = 320 - 32;
                pt.radian = (6.28 - 1.25) + 2.5 * sectionPer;

            },

        ];

        // the function that will be called on each update
        return function () {

            //pt.radian = 6.28 * this.percentDone;

            sectionIndex = Math.floor(this.frame / (this.maxFrame / 3));

            findSectionPer.call(this);

            sections[sectionIndex].call(this);

			
				
                //console.log('section per: ' + sectionPer);

				
			
            //console.log(section);

            //console.log(this);

        };

    }

        ())

});

// inject a canvas into the given id.
scene.injectCanvas('apparea');

// jump to a given frame
//scene.setFrame(21);

scene.renderFrame();

// play the scene
scene.play();
