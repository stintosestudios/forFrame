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


## Sections


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

