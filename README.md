# forframe.js

A simple tool for making animations that will end up being furnished to *.gif, a sprite sheet *.png, ect.


## Getting started.

If you just want to get started right away by starting a simple box animation you would use forframe.js like this, passing an options object to the scene global, and injecting a canvas into a container HTML element with an id of "apparea".

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

As you can see I am following a design pattern where there is a main setup function returned to the scene global, along with a public API.

## scene setup function options

The following is my documentation of the options object that is passed to the scene main function.

### maxFrame

The maxFrame properties is used to set the number of frames that are to be used in your animation. 

The typical animations that are to be developed with forFrame will revolved around the idea of everything flowing with regard to the present frame index relative to the maximum number of frames in the animation. As such maxFrame can be set to just about any positive whole number, but there will likely be a certain min value depending on the complexity of your animation. A general rule of thumb is that a higher value will result in smoother, but slower animation, and a lower value will result in a choppy, but faster animation. As such use your best judgment when setting the maxFrame value.

As of this writing there is no way of defining a frame rate in the options object. The reason for this is that I have written forFrame as a tool to help with just the creation of a static collection of frames. Although I have included a playback method (see scene.play), this is intended to just be a crude yet effective way of playback while developing your animation. The frame rate is something that you will typically define elsewhere when furnishing your GIF or video file, or working out how you will be reading from your finished sprite sheet.

### parts

Your animation will always include at lest one or more parts. A part is just a boxed area that has certain values such as x, y, width, height, and radian (rotation). The animations that I make just involve simple 2d translations, rotations, and scaling of 2d boxed areas. These parts can then then be filled with images, but the main function of forFrame is to work out the geometry of the animation. 

    // define some parts
    parts : [
        {
            id : 'box',
            w: 32,
            h: 32

        }, 
        {
            id : 'sectionBox'
        }

    ]

When defining a part you must at least give an id. If desired you can also set some static values as well, but you can also do so when writing your forFrame method(s).

### forFrame

### Sections


An animation will sometimes work out fine with a single for frame method, and will therefor not require the use of sections. However there will likely be times where you will want to use more than one for frame method at different times within the span of the animation. This is where sections come into play. It is a standard way to defined at what frame percentage a certain method is to be used, and for how long.

Here is a quick demo to get started with sections.

    scene({

        maxFrame : 200,

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
                    pt.x = -64 + (384 - 64) * this.sectionPer;
                    pt.y = 180;
                    pt.radian = 0;

                },

                // hold a static state
                hold : function () {

                    var pt = this.parts['sectionBox'];
                    //pt.x = 320 - 64;
                    pt.radian = 1 * this.sectionPer;

                },

                // close animation
                close : function () {

                    var pt = this.parts['sectionBox'];
                    pt.x = (320 - 64) + 500 * this.sectionPer;
                    pt.y = 180 + 500 * this.sectionPer;
                    pt.radian = 1;

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

    // play the scene
    scene.play();


## scene API

### scene.setFrame - Set the animation to a given frame.

In some cases you might want to set the animation you are working out to a certain frame, rather then playing it back at the typical forward frame rate. That can be done by just calling scene.setFrame, however in order to see anything you will want to also use scene.injectCanvas, and scene.renderFrame

    // inject a canvas into the given id.
    scene.injectCanvas('apparea');

    // set to frame 12
    scene.setFrame(12);

    // I would like to see what that looks like
    scene.renderFrame();



