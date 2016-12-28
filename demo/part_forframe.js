

scene({

    maxFrame : 10,

    opacity : 0.8,

    viewPort : {

        w : 720,
        h : 480

    },

    logo : {
        w : 128,
        h : 56,
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
    parts : [
        {
            id : 'maintext',
            w : 128,
            h : 32,
            opacity : 1,
            forFrame : function (pt) {

                pt.x = this.percentDone * 100;

            },
            skin : {

                //renderPartBox : true,
                imgIndex : 0,
                sw : 128,
                sh : 32,
                appendRender : function (ctx, skin) {}

            }

        }

    ],

    forFrame : function () {}

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
        appendRender : function (ctx) {},
        containerId : 'apparea',
        appendZ : 0,
        frameRate : 24
    };

    if (progress === 1) {
        scene.injectUI(playback);

    }

});
