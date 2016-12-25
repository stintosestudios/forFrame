

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

    forFrame : function () {}

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

        scene.setFrame(0);
        scene.renderFrame();

        // play the scene
        //scene.play();

        //scene.toPNGCollection(options);

    }

});
