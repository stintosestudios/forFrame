

scene({

    maxFrame : 50,

    opacity : 0.8,

    logo : {
        w : 128,
        h : 56,
        x : 512,
        y : 424,
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
            id : 'forFrame1',
            w : 128,
            h : 32,
            skin : {

                imgIndex : 0,
                sw : 128,
                sh : 32,

                appendRender : function (ctx, skin) {

                    console.log('yes i am the appendRender');

                    ctx.fillStyle = 'rgba(255,0,0,0.5)';
                    ctx.fillRect(0, 0, skin.part.w, skin.part.h);

                }

            }
        }, {
            id : 'forFrame2',
            w : 128,
            h : 32,
            skin : {

                imgIndex : 0,
                sw : 128,
                sh : 32,

                appendRender : function (ctx, skin) {

                    console.log('yes i am the appendRender');

                    ctx.fillStyle = 'rgba(0,255,0,0.5)';
                    ctx.fillRect(0, 0, skin.part.w, skin.part.h);

                }

            }
        }, {
            id : 'forFrame3',
            w : 128,
            h : 32,
            skin : {

                imgIndex : 0,
                sw : 128,
                sh : 32,

                appendRender : function (ctx, skin) {

                    console.log('yes i am the appendRender');

                    ctx.fillStyle = 'rgba(0,0,255,0.5)';
                    ctx.fillRect(0, 0, skin.part.w, skin.part.h);

                }

            }
        }, {
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
        while (f < 4) {

            pt = this.parts['forFrame' + f];
            radian = Math.PI * 2 * this.percentDone + dRadian * f;

            pt.w = 128 + 64 * bias;
            pt.h = 32 + 128 * bias;

            pt.x = 320 - (pt.w / 2) + Math.cos(radian) * 130;
            pt.y = 240 - (pt.h / 2) + Math.sin(radian) * 130;

            pt.radian = radian;

            f += 1;

        }

        pt = this.parts['maintext'];
        pt.w = 256 + 256 * bias;
        pt.h = 32 + 128 * bias;
        pt.opacity = bias;
        pt.x = 320 - (pt.w / 2);
        pt.y = 240 - (pt.h / 2);

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

            var x = 0,
            y = 0,
            size = 64,
            bias = Math.abs((0.5 - this.percentDone) / 0.5);
            space = 5 + 15 * bias;

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, 640, 480);
            ctx.strokeStyle = '#000000';
            ctx.save();
            ctx.globalAlpha = 1 - bias;

            this.opacity = 1 - bias;
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
            ctx.restore();

        },
        containerId : 'apparea',
        appendZ : 0,
        frameRate : 24
    };

    if (progress === 1) {
        scene.injectUI(playback);

    }

});
