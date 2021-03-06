# forframe.js 

<p align="center"">
<br>
<img src=https://raw.githubusercontent.com/stintosestudios/forFrame/master/demo/img/logo2_320.gif>
</p>

A simple tool for making animations that will end up being furnished to *.gif, a sprite sheet *.png, ect. 


## Why forFrame? 

I wanted a framework from which I can quickly develop static, non procedural animations that will likely be furnished to gif or a similar file container type. 

The typical animations that are to be developed with forFrame will revolved around the idea of everything flowing with regard to the present frame index relative to the maximum number of frames in the animation. As such a maxFrame value can be set to just about any positive whole number, but there will likely be a certain min value depending on the complexity of your animation. A general rule of thumb is that a higher value will result in smoother, but slower animation, and a lower value will result in a choppy, but faster animation. 

As of this writing there is no way of defining a frame rate in the options object. The reason for this is that I have written forFrame as a tool to help with just the creation of a static collection of frames. Although I have included a playback method (see scene.play), this is intended to just be a crude yet effective way of playback while developing an animation. The frame rate is something that you will typically define elsewhere when furnishing your GIF or video file, or working out how you will be reading from your finished sprite sheet. 

## Getting started. 

If you just want to get started right away by starting a simple box animation you would use forframe.js like this, passing an options object to the scene global, and injecting a canvas into a container HTML element with an id of "apparea". 

```js
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
```

As you can see I am following a design pattern where there is a main setup function returned to the scene global, along with a public API. 

## The Options Object 

The following is my documentation of the options object that is passed to the scene main function. 

### maxFrame 

The maxFrame property is used to set the number of frames that are to be used in your animation.  

```js
    maxFrame : 60 
```

You can omit this from your options object, a hard coded default of 50 will be applied. 

### opacity

opacity is the global level opacity, as you would exspect the hard coded default is 1.

### viewPort

The viewPort property can be used to set the native resolution of the canvas. The default is 640 x 480;

```js
    viewPort : {

        w: 320,
        h: 240
    
    }
```

### Parts 

An animation must always include at lest one or more parts. A part is just a boxed area that has certain values such as x, y, width, height, and radian (rotation). The animations that I make just involve simple 2d translations, rotations, and scaling of 2d boxed areas. These parts can then then be filled with images, but the main function of forFrame is to work out the geometry of the animation.  

```js
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
```

### logo

The logo property was introduced in 1.3.x to provide a way to display a logo on each frame without having to add an aditional part into the parts array.

```js
    logo : {
        w : 128,
        h : 56,
        x : 512,
        y : 424,
        skin : {
            imgIndex : 3,
            sx : 0,
            sy : 0,
            sw : 128,
            sh : 56
        }
    }
```

The logo is a Part class instance, and just like any other Part that values can be changed in forFrame methods if desired (this.logo in a forFrame method). 

When defining a part you must at least give an id. If desired you can also set some static values as well, but you can also do so when writing your forFrame method(s). See the Part class section to learn more about parts. 

### forFrame 

The forFrame method is where the expressions that define the animation will be written. For each frame the main forFrame method will be called passing the current value of the inner state object that can be accessed via the this keyword. 

```js
    forFrame : function () {

        var pt = this.parts['box'];

        // just a simple move of the box along the y axis from 0 to 200 pixels
        pt.y = 0 + 200 * this.percentDone;
        pt.x = 0;

    }
```

### Sections 

An animation will sometimes work out fine with a single for frame method, and will therefor not require the use of sections. However there will likely be times where you will want to use more than one for frame method at different times within the span of the animation. This is where sections come into play. It is a standard way to defined at what frame percentage a certain method is to be used, and for how long. 

Here is a quick copy and paste demo to get started with sections. 

```js
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
```

## The Playback Object.

In addition to the main scene method that accepts an options object, there are main additional methods that are attached to the scene global. Many of these methods accept a playback object that contains information about playback of the animation.

```js
    var playback = {

        appendRender : function (ctx) {

            ctx.fillStyle = '#555555';
            ctx.fillRect(0, 0, 640, 480);

        },

        appendZ : 0,

        containerId : 'apparea',

        frameRate : 40
    };

    scene.injectUI(playback);
```

## scene API 

The scene API is a collection of methods that are appended to the scene global function. They are used for injecting a canvas into your HTML, jumping to a single given frame and rendering it to the canvas, as well as playing back your animation in whole among other things.

### scene.injectCanvas

Use this method to create and inject a canvas element that will be used to render the animation. You must give it an id of a container element in your HTML

```js
    scene.injectCanvas('my-container-element');
```

### scene.injectUI

Use scene.injectUI to inject a user interface that can be used to aid in playback, and exporting of the animation. If used it can replace the need to deal with several methods dirrectly. The methods accepts a playback object, and is the only method that uses the containerId property of that object.

scene.injectCanvas('apparea');

```js
    scene.load(
        [
            'demo/img/mylogo_128.png'
        ],
        function (progress) {

        // uncomment to save as png
        if (progress === 1) {

            var playback = {
                appendRender : function (ctx) {

                    ctx.fillStyle = '#555555';
                    ctx.fillRect(0, 0, 640, 480);

                },
                appendZ : 0,

                containerId : 'apparea'
            };

            scene.injectUI(playback);

        }

    });
```

### scene.renderFrame

Render a single given frame. You must inject a canvas first in order to use this, you can also give an appendRender and z index value via a playback object that is useful for displaying additional information. Just like forFrame methods you can access the state via the this keyword.

```js
    var playback = {

        appendRender : function (ctx) {

            // render current frame index, and maxFrame
            ctx.fillStyle = '#ffffff';
            ctx.fillText('frame: ' + this.frame + '\/' + this.maxFrame, 20, 20);

        },

        appendZ : 1

    };

    // just show frame index 3
    scene.setFrame(3);
    scene.renderFrame(playback);

```

It is helpful to call scene.renderFrame dirrectly with scene.setFrame if you want to view a certain frame index.

### scene.setFrame - Set the animation to a given frame. 

In some cases you might want to set the animation you are working out to a certain frame, rather then playing it back at the typical forward frame rate. That can be done by just calling scene.setFrame, however in order to see anything you will want to also use scene.injectCanvas, and scene.renderFrame 

```js
    // inject a canvas into the given id. 
    scene.injectCanvas('apparea'); 

    // set to frame 12 
    scene.setFrame(12); 

    // I would like to see what that looks like 
    scene.renderFrame(); 
```

### scene.step

Step the animation by a single frame

### scene.load 

Use this to load images to be used in skinning of parts.

```js
    scene.load(
        [
            'demo/img/foot.png',
            'demo/img/pathead.png',
            'demo/img/background2.png'
        ],
        function () {

           scene.injectCanvas('apparea');

           scene.play();

        }

    );
```

### scene.play 

Use the play method to playback your animation after setting up a proper options object for the scene, and injecting a canvas. You can give an playback object to play that can include an appendRender method, and a z level value for it. This is useful for doing some additional on the fly rendering to the canvas. You can also set a frameRate here in the play method, the default is 30 fps. 

```js
    scene.play({ 

       appendRender : function (ctx) { 

           // render current frame index, and maxFrame 
           ctx.fillStyle = '#ffffff'; 
           ctx.fillText('frame: ' + this.frame + '\/' + this.maxFrame, 20, 20); 

       }, 

       appendZ : 1, 

       frameRate : 40 

    }); 
```

## scene.toPNGCollection

This method is for exporting all of the frames to a PNG file collection. Combined with GIMP (or any other application that calls for this kind of frame input), it is a crude yet effective way of furnishing to GIF.

It makes use of canvas.blob, and fileSaver.js to get chrome to spit out a PNG file for each frame. The collection on PNG's can then be imported to an applaction that can convert the frames to a video container format. To use it there must be a link to fileSaver.js in the HTML file, and chrome must be started with the "--allow-file-access-from-files" flag if you want to get this to work via the file:// protocol. If you do not use the flag, or host what you are working via http, you will get a tainted canvas error in chrome.

### fix via --allow-file-access-from-files flag in chrome.

To start chrome with the flag, close all chrome windows, then restart chrome from the command line like so:

In windows 10 PowerShell:

    start "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "--allow-file-access-from-files"

Linux:

    $ chromium-browser --allow-file-access-from-files

### fix via http:// using the given server.js file that should work with node.js

As of 1.3.x a server.js file is provided in the root name space. If you run this using node in the command line it will host index.html over a local http server. Just start the server by calling "node server.js" in the command line. If everything is working the way it should you can access the index.html file and get PNG exporting working by going to http://http://localhost:8888/ in chrome.

If all goes well you can just call the method in place of scene.play, but make sure that all your images are loaded first. If you are useing an appendRender method you will want to include that. In fact you can used the same object that is used for scene.play, the frameRate property is just ignored.

```js
    scene.injectCanvas('apparea');

    scene.load(
        [
            'demo/img/foot.png',
            'demo/img/pathead.png',
            'demo/img/background2.png'
        ],

        function (progress) {

            // an options object with an appendRender method that is shared
            // between 
            var playback = {

                appendRender : function (ctx) {

                    var x = 0,
                    y = 0,
                    size = 64,
                    bias = Math.abs((0.5 - this.percentDone) / 0.5);
                    space = 5 + 15 * bias;

                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, 640, 480);
                    ctx.strokeStyle = '#000000';
                    while (y < 5) {

                        x = 0;
                        while (x < 5) {

                            ctx.strokeRect(
                                x * (size + space) + (320 - size * 5 / 2) - space * 5 / 2,
                                y * (size + space) + (240 - size * 5 / 2) - space * 5 / 2,
                                size,
                                size);

                            x += 1;

                        }

                        y += 1;

                    }

                },

                appendZ : 0,

                frameRate : 24

            };

            // the same options object can be used for both play and toPNGCollection
            if (progress === 1) {

                // play the scene
                // scene.play(playback);

                // make a PNG collection
                scene.toPNGCollection(playback);

            }

        }

    );
```

If you use GIMP for image manipulation like I do, use "open as layers" to import your collection of PMG's as layers. Once gimp imports all the frames run a Filters>Animation>Optimize (for Gif). After the optimize is done just export as GIF. When doing so be sure to check "as animation", and set your delay to say 33ms.

## The state object 

The state object contains properties and methods that are useful for the formation of expressions that define an animation. The forFrame methods are invoked with the call method passing the current value of the state object that can be accessed via the this keyword. You will likely want to work with at least one property such as the percentDone property, when defining the behavior of an animation. 

### state.frame

The animation will have a range of frame index values from 0 to state.maxFrame -1 (zero relative). state.frame will store the current frame index for the animation. In the forFrame methods this value can be accessed via this.frame.

### state.maxFrame

The total number of frames in the anamation.

### state.percentDone 

The percentDone property returns a value between 0, and 1 that reflects the current percentage to completion of the animation. It is simply just state.frame / state.maxFrame. 

```js
    var pt = this.parts[box]; 
    pt.x = this.percentDone * 400; 
```

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

```js
    forFrame : function () { 

       var rad = this.currentSection(), 

       pt = this.parts[box]; 

       pt.radian = rad; 



    }
```

state.currentSection returns whatever may be returned in the current section forFrame method. In the above example a radian value is being returned, the value of which may change based on different expressions from one section to another. 

### state.opacity

The current global opacity value

### state.sectionIndex

The current index in the section timeline array, if useing sections.

## state sectionName

The name of the current forFrame section method if useing sections.

## The Parts Class. 

A Part class contains values the reflect the current state of a part of an animation, such as position, and size. 

The following should show the full range of options for static values that can be set in the parts array. These values can also be dynamically manipulated in the for frame methods.

```js
    parts : [
        {
            id : 'staticBox',
            w : 200,
            h : 100,
            x : 220,
            y : 190,
            radian : .5

        }, {

            id : 'logo',
            w : 128,
            h : 32,
            x : 50,
            y : 100,

            skin : {

                imgIndex : 0,
                sx : 20,
                sy : 10,
                sw : 20,
                sh : 5,
                renderPartBox : true,
                xOffset : -20,
                yOffset : -10

            }

        }

    ]
```

### Part.id

A part needs to at least have an id. The id should be a vaild javascript property name.

```js
    parts : [{id : 'a-moving-box'}]
```

### Part.w, Part.h, Part.x, Part.y

All parts are just simple box areas, as shuch they have the typical width, height, x, and y values. You can set static values for the part in your options object, anything that is to be changed by way of expression in the forFrame methods should be done in your forFrame methods.

### Part.radian 

The rotation of the part in radians.

### Part.opacity

The part level opacity of the part. It overrides state.opacity.

### Part.skin 

The Parts Skin Class instance if it has one.

## The Skin Class 

A Skin class instance contains values that have to do with the skinning of a part with an asset image loaded with scene.load. 

### Skin.imgIndex 

The index of the image in state.img array that is to be used for the skin of a part.

### Skin.xOffset, Skin.yOffset

sometimes you might want to offset the skin from the parts position, this can be done with Skin.xOffset, and Skin.yOffset.

### Skin.sx, Skin.sy, Skin.sw, Skin.sh

The s stands fro source, use the source values to define section in the image that is to be used for the skin.

### Skin.renderPartBox 

If true the part area will be shown as a red outline. This is useful for when tweaking a skined animation and you want to know where everything is with your parts.

### Skin.appendRender

A appendRender can be defined that will be used to render over the image, or it can also be used in place of an image if desired.

```js
    // define some parts
    parts : [

        // you can use an append render method to draw ontop of an image skin.
        {
            id : 'maintext',
            w : 128,
            h : 32,
            opacity : 1,
            skin : {

                //renderPartBox : true,
                imgIndex : 0,
                sw : 128,
                sh : 32,
                appendRender : function (ctx, skin) {

                    ctx.fillStyle = 'rgba(0,255,0,0.5)';

                    if (this.sectionName === 'open') {

                        ctx.fillStyle = 'rgba(0,0,0,0.5)';

                    }

                    ctx.fillRect(0, 0, skin.part.w, skin.part.h);

                }

            }

        },
        
        // use can use an appendRender methods in place of an image as well
        {
            id : 'box',
            w : 32,
            h : 32,
            skin : {

                appendRender : function (ctx, skin) {

                    ctx.fillStyle = '#00ff00';

                    ctx.fillRect(0, 0, skin.part.w, skin.part.h);

                }

            }
        }

    ]
```

## Legal 

   forFrame.js 
   Copyright 2016 by stintose studios GPL v3 (see LICENSE) 