/*
 *    forFrame.js
 *    Copyright 2016 by stintose studios (GPL v3)
 *    https://github.com/stintosestudios/forFrame
 *
 */

var scene = (function () {

    var state = {

        frame : 0,
        maxFrame : 50,
        percentDone : 0,
        sections : {},
        sectionPer : 0,
        forFrame : null,
        img : [],
        parts : {},
        canvas : null,
        ctx : null,

        // run the current section forFrame method
        currentSection : function () {

            var i = 0,
            timeline = this.sections.timeline,
            len = timeline.length;
            while (i < len) {

                if (this.percentDone < timeline[i][1]) {

                    break;

                }

                i += 1;

            }

            var bias = i === 0 ? 0 : timeline[i - 1][1];

            this.sectionPer = (this.percentDone - bias) / (timeline[i][1] - bias);

            // run the current section forFrame method, and return anything it returns.
            return this.sections.forFrame[timeline[i][0]].call(this);

        }

    };

    // The Skin Class is used to skin a Part with an image
    var Skin = function (part, skinOptions) {

        var defaults = 'imgIndex:-1;xOffset:0;yOffset:0;sx:0;sy:0;sw:32;sh:32;renderPartBox:0;'.split(';'),
        i = 0,
        len = defaults.length,
        current;

        if (skinOptions === undefined) {
            skinOptions = {};
        }
        while (i < len - 1) {

            current = defaults[i].split(':');

            if (current[0]in skinOptions) {

                this[current[0]] = skinOptions[current[0]];

            } else {

                // else the default value

                this[current[0]] = current[1];

            }

            i += 1;

        }

        this.renderPartBox = this.renderPartBox === '0' ? false : true;

    };

    // the Part Class.
    var Part = function (values) {

        var defaults = 'id:none;w:32;h:32;x:0;y:0;radian:0;'.split(';'),
        i = 0,
        len = defaults.length,
        current;
        while (i < len) {

            current = defaults[i].split(':');

            if (current[0]in values) {

                this[current[0]] = values[current[0]];

            } else {

                // else the default value

                this[current[0]] = current[1];

            }

            i += 1;

        }

        // default that Parts skin to a blank Skin class instance
        this.skin = new Skin(this, values.skin);

    };

    // main scene setup method
    var api = function (options) {

        // no state?
        if (options == undefined) {

            throw new Error('you need to give a state object, see the README');

        }

        // no parts?
        if (options.parts === undefined) {

            throw new Error('you must define at least one Part for your scene, see the README');

        }

        // no forFrame?
        if (options.forFrame === undefined) {

            throw new Error('you must define a forFrame method, see the README.');

        }

        // default to 50 frames if maxFrame is not given
        state.maxFrame = options.maxFrame ? options.maxFrame : 50;

        // setup parts array.
        state.parts = {};
        options.parts.forEach(function (currentPart) {

            state.parts[currentPart.id] = new Part(currentPart);

        });

        state.forFrame = options.forFrame;

        // setup sections if given
        if (options.sections) {

            (function () {

                var secValues = options.sections.timeline.split(';');

                state.sections = {

                    timeline : [],

                    // referencing options for now.
                    forFrame : options.sections.forFrame

                };

                // build timeline array
                secValues.forEach(function (secVal) {

                    secVal = secVal.split(':');
                    secVal[1] = secVal[1] / 100;

                    state.sections.timeline.push(secVal);

                });

            }
                ());
        }

    };

    // inject a canvas into the given id
    api.injectCanvas = function (id) {

        state.canvas = document.createElement('canvas');
        state.ctx = state.canvas.getContext('2d');

        state.canvas.width = 640;
        state.canvas.height = 480;

        state.ctx.fillStyle = 'black';
        state.ctx.fillRect(0, 0, state.canvas.width, state.canvas.height);

        document.getElementById(id).appendChild(state.canvas);

    };

    // render the current frame
    api.renderFrame = function (options) {

        var prop,
        skin,
        pt,
        z = 0,
        ctx = state.ctx,
        appendZ;

        if (options === undefined) {
            options = {};
        }

        appendZ = options.appendZ === undefined ? Object.keys(state.parts).length - 1 : options.appendZ;

        // clear canvas.
        state.ctx.fillStyle = 'black';
        state.ctx.fillRect(0, 0, state.canvas.width, state.canvas.height);

        // ALERT! a for in loop!? NO!
        for (prop in state.parts) {

            // append render?
            if (options.appendRender && z === appendZ) {

                options.appendRender.call(state, ctx);

            }

            z += 1;

            pt = state.parts[prop];

            ctx.strokeStyle = '#ffffff';
            ctx.save();
            ctx.translate(pt.x + pt.w / 2, pt.y + pt.h / 2);
            ctx.rotate(pt.radian);

            skin = pt.skin;

            if (Number(skin.imgIndex) > -1) {

                // if we have a skin for the part use the skin
                ctx.strokeStyle = '#ff0000';
                ctx.drawImage(
                    state.img[skin.imgIndex],
                    skin.sx,
                    skin.sy,
                    skin.sw,
                    skin.sh,
                    -pt.w / 2 + Number(skin.xOffset),
                    -pt.h / 2 + Number(skin.yOffset),
                    pt.w,
                    pt.h);

                if (skin.renderPartBox) {

                    ctx.strokeRect(-pt.w / 2, -pt.h / 2, pt.w, pt.h);

                }

            } else {

                // if no skin just draw a box

                ctx.strokeRect(-pt.w / 2, -pt.h / 2, pt.w, pt.h);

            }

            ctx.restore();

        }

    };

    // set animation to the given frame.
    api.setFrame = function (frameNum) {

        state.frame = frameNum;

        if (state.frame === -1) {
            state.frame = state.maxFrame - 1;
        }
        if (state.frame === state.maxFrame) {
            state.frame = 0;
        }

        state.percentDone = state.frame / state.maxFrame;

        // call the forFrame method;
        state.forFrame.call(state);

    };

    // step the current frame
    api.step = function (back) {

        var rate = back ? -1 : 1;

        state.frame += rate;
        api.setFrame(state.frame);

    };

    api.load = function (urlList, done) {

        var img,
        progress = 0;

        if (done === undefined) {
            done = function () {};
        }

        state.img = [];

        urlList.forEach(function (url) {

            img = new Image();

            img.addEventListener('load', function () {

                progress += 1;

                done(progress / state.img.length);

            });

            img.src = url;

            state.img.push(img);

        });

    };

    // play the scene
    api.play = function (options) {

        // ALERT! setTimeout? what?

        options = options === undefined ? {}

         : options;

        options.frameRate = options.frameRate === undefined ? 33 : 1000 / options.frameRate;

        var loop = function () {

            setTimeout(loop, options.frameRate);

            api.renderFrame(options);

            api.step();

        };

        loop();

    };

    // convert your animation to a *.png file collection
    api.toPNGCollection = function (options) {

        var saveFrames = function () {

            api.setFrame(state.frame);
            api.renderFrame(options.appendRender, options.appendZ);

            state.canvas.toBlob(function (blob) {

                saveAs(blob, 'frame_' + state.frame + '.png');

                state.frame += 1;
                if (state.frame < state.maxFrame) {

                    saveFrames();

                }

            });

        };

        if (options === undefined) {

            options = {};

        }

        // test for "saveAs" global as this methods requiers filesaver.js
        if (saveAs) {

            // set current frame to zerro if it is not all ready
            state.frame = 0;

            // start saveFrames recursive loop
            saveFrames();

            // no saveAs
        } else {

            throw new Error('toPngCollection needs filesaver.js. See the README.');

        }

    }

    return api;

}
    ());
