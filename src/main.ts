//@ts-ignore
import videoFrames from 'video-frames';
import noUiSlider from "nouislider"

import "nouislider/dist/nouislider.min.css" //it can handle ext dependencies too


// main.ts
const hello = (name: string) => {
    return `Hello ${name}!`;
};

// todo move under a class so we can instantiate it
const init = (element: HTMLElement|null) => {
    if(!element) return;
    var slider = document.createElement('div');
    const rangeSlider = noUiSlider.create(slider, {
        start: [0,40, 100],
        connect: true,
        range: {
            'min': 0,
            'max': 100
        }
    });
    element.appendChild(slider)

    const video = document.createElement('video')
    video.style.maxHeight = "50vh";

    const widthField = document.createElement('input');
    widthField.type = 'number'
    widthField.title = 'Video width (height is automatic)'
    widthField.min = '8'
    widthField.max = '1080'
    widthField.style.width = '150px'
    widthField.placeholder = '0'
    widthField.value = '0';
    widthField.addEventListener('change', ()=>{
        const vidWidth = parseInt(widthField.value);
        console.log(vidWidth)
        //@ts-ignore
        video.style.width = vidWidth === 0 ? undefined : `${vidWidth}px`;
    })
    element.appendChild(widthField)

    const source = document.createElement('source')
    const input = document.createElement('input');
    input.type = "file"
    input.accept = "video/*"

    function togglePlay() {
        if (video.paused || video.ended) {
            video.play();
        } else {
            video.pause();
        }
    }

    // video.addEventListener('timeupdate', e =>{
    // })
    //// VIDEO update (faster than the timeupdate event
    var lastTime = -1;
    function draw() {
        var time = video.currentTime;
        if (time !== lastTime) {
            // console.log('time: ' + time);
            //todo: do your rendering here
            lastTime = time;
            rangeSlider.setHandle(1, time)
            //@ts-ignore
            const startPos = parseFloat(rangeSlider.get()[0])
            //@ts-ignore
            const endPos = parseFloat(rangeSlider.get()[2])
            if(time > endPos){
                video.currentTime = startPos;
            }
        }
        //wait approximately 16ms and run again
        requestAnimationFrame(draw);
    }
    draw();
    /////////// end time update
    rangeSlider.on('start', (e)=>{
        console.log("start", e)
        video.pause()
    })
    rangeSlider.on('end', (e)=>{
        //@ts-ignore
        const startPos = parseFloat(e[0])
        //@ts-ignore
        const curPos = parseFloat(e[1])
        //@ts-ignore
        const endPos = parseFloat(e[2])
        console.log("end", e)
        video.currentTime = curPos;
        video.play()
    })

    const output = document.createElement('div');//todo change to canvas (player with fps previewing) - in another class
    const canvasOutput = document.createElement('canvas');//todo change to canvas (player with fps previewing) - in another class
    output.style.overflow = 'auto';
    output.style.maxHeight = 'calc(50vh - 100px)';
    const extractFrames = () =>{
        //@ts-ignore
        const startTime = parseFloat(rangeSlider.get()[0])
        //@ts-ignore
        const endTime = parseFloat(rangeSlider.get()[2])

        const frameWidth = parseInt(widthField.value) || video.videoWidth;
        const count = parseInt(countField.value)
        canvasOutput.width = frameWidth * count;
        canvasOutput.height =  video.videoHeight;
        const ctx = canvasOutput.getContext('2d');
        console.log({canvasW: frameWidth * count, canvH: video.videoHeight})

        videoFrames({
            url: source.src,
            count,
            width: frameWidth, //height is auto
            startTime,
            endTime,
            type: 'image/webp',
            onLoad: () => {
                output.innerHTML = 'video loaded'
            },
            //@ts-ignore
            onProgress: (n, N) => {
                output.innerHTML = `${n} of ${N} frames extracted`
            }
            //@ts-ignore
        }).then((frames) => {
            output.innerHTML = ''
            //@ts-ignore
            frames.forEach((f,i) => {
                // output.innerHTML += `<img src="${f.image}">`
                if(ctx){
                    const img = new Image();   // Create new img element
                    img.addEventListener("load", function() {
                        ctx.drawImage(img,i * img.width,0);
                    }, false);
                    img.src = f.image;
                }
            })
        })
    }
    video.addEventListener('loadeddata', e=>{
        console.log("LOADED VIDEO", e, rangeSlider)
        rangeSlider.updateOptions({
            range: {
                'min': 0,
                'max': video.duration
            }
        }, true);
        rangeSlider.setHandle(2, video.duration);
        // extractFrames();
    })
    input.addEventListener('change', e => {
        console.log("Load video", e, source, source.parentNode)
        //@ts-ignore
        const videoFile = e.target.files[0];
        console.log({videoFile})
        source.src = URL.createObjectURL(videoFile);
        video.load();
        video.play();
        widthField.value = video.videoWidth.toString();
    })

    const playButton = document.createElement("button");
    playButton.innerText = "play/pause"
    playButton.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);

    video.appendChild(source)
    element.appendChild(video);
    element.appendChild(input);
    element.appendChild(playButton);
    const countField = document.createElement('input');
    countField.type = 'number'
    countField.min = '1'
    countField.max = '80'
    countField.style.width = '150px'
    countField.placeholder = 'extract 10 frames'
    countField.value = '10';
    element.appendChild(countField);

    const extractButton = document.createElement('button');
    extractButton.innerText = 'Extract frames';

    extractButton.addEventListener('click', extractFrames);
    canvasOutput.addEventListener('click', ()=>{ //download images
        console.log(canvasOutput.toDataURL());
        const link = document.createElement('a');
        //@ts-ignore
        link.download = `${input.files[0].name}-download.png`;//todo change to video name
        link.href = canvasOutput.toDataURL();
        link.click();
        //@ts-ignore
        link.delete;
    })
    element.appendChild(extractButton);
    // element.appendChild(output);
    element.appendChild(canvasOutput);

    var styles = `
     .noUi-handle {
        opacity: 0.7;
     }
    `
    var styleSheet = document.createElement("style")
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet);
}
export { hello, init };