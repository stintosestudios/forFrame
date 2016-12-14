# forframe.js

A simple tool for making animations that will end up being furnished to *.gif, a sprite sheet *.png, ect.


## Why forFrame?

I wanted a framework from which I can quickly develop static, non procedural animations that will likely be furnished to gif or a similar file container type.

The typical animations that are to be developed with forFrame will revolved around the idea of everything flowing with regard to the present frame index relative to the maximum number of frames in the animation. As such a maxFrame value can be set to just about any positive whole number, but there will likely be a certain min value depending on the complexity of your animation. A general rule of thumb is that a higher value will result in smoother, but slower animation, and a lower value will result in a choppy, but faster animation.

As of this writing there is no way of defining a frame rate in the options object. The reason for this is that I have written forFrame as a tool to help with just the creation of a static collection of frames. Although I have included a playback method (see scene.play), this is intended to just be a crude yet effective way of playback while developing an animation. The frame rate is something that you will typically define elsewhere when furnishing your GIF or video file, or working out how you will be reading from your finished sprite sheet.

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

## The Options Object

The following is my documentation of the options object that is passed to the scene main function.

### maxFrame

The maxFrame properties is used to set the number of frames that are to be used in your animation. 

    MaxFrame : 60

You can omit this from your options object, a default of 50 will be applied.

### Parts

An animation must always include at lest one or more parts. A part is just a boxed area that has certain values such as x, y, width, height, and radian (rotation). The animations that I make just involve simple 2d translations, rotations, and scaling of 2d boxed areas. These parts can then then be filled with images, but the main function of forFrame is to work out the geometry of the animation. 

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

When defining a part you must at least give an id. If desired you can also set some static values as well, but you can also do so when writing your forFrame method(s). See the Part class section to learn more about parts.

### forFrame

The forFrame method is where the expressions what define the animation will be written. For each frame the main forFrame method will be called passing the current value of the inner state object that can be accessed via the this keyword.


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

### scene.injectCanvas

### scene.renderFrame

### scene.setFrame - Set the animation to a given frame.

In some cases you might want to set the animation you are working out to a certain frame, rather then playing it back at the typical forward frame rate. That can be done by just calling scene.setFrame, however in order to see anything you will want to also use scene.injectCanvas, and scene.renderFrame

    // inject a canvas into the given id.
    scene.injectCanvas('apparea');

    // set to frame 12
    scene.setFrame(12);

    // I would like to see what that looks like
    scene.renderFrame();

### scene.step

### scene.load

### scene.play

## The state object

The state object contains properties and methods that are useful for the formation of expressions that define an animation. The forFrame methods are invoked with the call method passing the current value of the state object that can be accessed via the this keyword. You will likely want to work with at least one property such as the percentDone property, when defining the behavior of an animation.

### state.frame
### state.maxFrame
### state.percentDone

The percentDone property returns a value between 0, and 1 that reflects the current percentage to completion of the animation. It is simply just state.frame / state.maxFrame.

    var pt = this.parts[‘box’];
    pt.x = this.percentDone * 400;

The above expression in a forFrame method will move a part called box right from 0 to 400 on the x axis.

### state.sections

This is an array that will contain any sections object that is produced from an object that you may choose to give in the options object.

### state.sectionPer

Same as state.percentDone but with the current section, not the whole animation. It is to be used in forFrame methods that you define in the sections object that you give when defining the options object.

### state.forFrame

This contains for main forFrame method.

### state.img

This is an array that holds HTML Image objects that are loaded via scene.load.

### state.parts

This array contains all the parts that are used in the animation.

## state.canvas, and state.ctx

This holds references the canvas DOM element, and the 2d drawing context.

### state.currentSection.

This is the method that is to be called in the main forFrame method if sections are being used.

    forFrame : function () {

        var rad = this.currentSection(),

        pt = this.parts[‘box’];

        pt.radian = rad;



    }

state.currentSection returns whatever may be returned in the current section forFrame method. In the above example a radian value is being returned, the value of which may change based on different expressions from one section to another.

## The Parts Class.

A Part class contains values the reflect the current state of a part of an animation, such as position, and size among other things.

### Part.id
### Part.w
### Part.h
### Part.x
### Part.y
### Part.radian

### Part.skin

## The Skin Class

A Skin class instance contains values that have to do with the “skinning” of a part with an asset image loaded with scene.load.

### Skin.imgIndex
### Skin.xOffset
### Skin.yOffset
### Skin.sx
### Skin.sy
### Skin.sw
### Skin.sh
### Skin.renderPartBox

## Legal

    forFrame.js
    Copyright 2016 by stintose studios GPL v3 (see LICENSE)
