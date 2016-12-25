

scene({

    maxFrame : 10,

    // define some parts
    parts : [{
            id : 'staticBox',
            w : 200,
            h : 100,
            x : 320 - 100,
            y : 240 - 50,
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

    ],

    forFrame : function () {

        var part = this.parts['logo'];

        part.radian = Math.PI * 2 * this.percentDone;

    }

});

// inject a canvas into an element with an id of 'apparea'.
scene.injectCanvas('apparea');

scene.load(
    [
        'demo/img/logo.png'
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

        // just show frame index 3
        //scene.setFrame(3);
        //scene.renderFrame(playback);


        // scene
        //scene.play(playback);

        // create a PNG file collection takes it too
        //scene.toPNGCollection(playback);

    }

});
