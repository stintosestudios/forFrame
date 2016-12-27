

scene({

    maxFrame : 50,

    opacity : 0.8,

    viewPort : {

        w : 320,
        h : 240

    },

    logo : {
        w : 128,
        h : 56,
        x : 320 - 128,
        y : 240 - 56,
        opacity : 0.3,
        skin : {
            imgIndex : 1,
            sx : 0,
            sy : 0,
            sw : 128,
            sh : 56
        }
    },

    // define some parts
    parts : [{
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

                    ctx.fillStyle = 'rgba(0,0,0,0.5)';
                    ctx.fillRect(0, 0, skin.part.w, skin.part.h);

                }

            }

        }

    ],

    forFrame : function () {

        var f = 1,
        pt,
        radian,
        dRadian = Math.PI * 2 / 3,
        bias = Math.abs((0.5 - this.percentDone) / 0.5);

        pt = this.parts['maintext'];
        pt.w = 160 + 160 * bias;
        pt.h = 32 + 64 * bias;
        pt.opacity = bias;
        pt.x = 160 - (pt.w / 2);
        pt.y = 120 - (pt.h / 2);

    }

});

// inject a canvas into an element with an id of 'apparea'.
scene.injectCanvas('apparea');

scene.load(
    [
        'demo/img/logo.png',
        'demo/img/mylogo_128.png'
    ],
    function (progress) {

    // playback object
    var playback = {
        appendRender : function (ctx) {

            ctx.fillStyle = '#ff0000';
            ctx.fillRect(0, 0, this.viewPort.w / 2, this.viewPort.h / 2);

        },
        containerId : 'apparea',
        appendZ : 0,
        frameRate : 24
    };

    if (progress === 1) {
        scene.injectUI(playback);

    }

});
