

scene({

    maxFrame : 40,

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
            h : 56,
            x : 640 - 128,
            y : 480 - 56,

            skin : {

                imgIndex : 0,
                sx : 0,
                sy : 0,
                sw : 128,
                sh : 56

            }

        }

    ],

    forFrame : function () {

        var part = this.parts['staticBox'];

        part.radian = Math.PI * 2 * this.percentDone;

    }

});

// inject a canvas into an element with an id of 'apparea'.
scene.injectCanvas('apparea');

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

            containerId : 'apparea',

            frameRate : 40
        };

        scene.injectUI(playback);

    }

});
