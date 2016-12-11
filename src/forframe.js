
var scene = (function () {

    var state = {

        frame : 0,
        maxFrame : 50,
        percentDone : 0,
        sections : {},
        sectionPer : 0,
        forFrame : null,
        parts : [],
        canvas : null,
        ctx : null,

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

            var bias = i === 0 ? 0 : timeline[i-1][1];

            this.sectionPer = (this.percentDone - bias) / (timeline[i][1] - bias);

            // run the current section forFrame method, and return anything it returns.
            return this.sections.forFrame[timeline[i][0]].call(this);

        }

    };

    // the Part Class.
    var Part = function (values) {

        this.id = values.id;
        this.w = values.w;
        this.h = values.h;
        this.x = 0;
        this.y = 0;
        this.radian = 0;

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
    api.renderFrame = function () {

        var prop,
        pt,
        ctx = state.ctx;

        // clear canvas.
        state.ctx.fillStyle = 'black';
        state.ctx.fillRect(0, 0, state.canvas.width, state.canvas.height);

        // ALERT! a for in loop!? NO!
        for (prop in state.parts) {

            pt = state.parts[prop];

            ctx.strokeStyle = '#ffffff';

            ctx.save();

            ctx.translate(pt.x + pt.w / 2, pt.y + pt.h / 2);

            ctx.rotate(pt.radian);

            ctx.strokeRect(-pt.w / 2, -pt.h / 2, pt.w, pt.h);

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

    // play the scene
    api.play = function () {

        // ALERT! setTimeout? what?
        setTimeout(api.play, 33);

        api.renderFrame();

        api.step();

    };

    return api;

}
    ());
