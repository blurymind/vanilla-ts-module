import noUiSlider from "nouislider"
import "nouislider/dist/nouislider.min.css" //it can handle ext dependencies too

// main.ts
const hello = (name: string) => {
    // const app =document.getElementById("app");
    // console.log("found element", app)
    // if(app){
    //     app.innerHTML = ">> " + name
    // }

    return `Hello Todor, ${name}!`;
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
    var styles = `
     .noUi-handle {
        opacity: 0.7;
     }
    `
    var styleSheet = document.createElement("style")
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet);

    const video = document.createElement('video')
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

    video.addEventListener('timeupdate', e =>{
    })
    //// VIDEO update (faster than the timeupdate event
    var lastTime = -1;
    function draw() {
        var time = video.currentTime;
        if (time !== lastTime) {
            console.log('time: ' + time);
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

    video.addEventListener('loadeddata', e=>{
        console.log("LOADED VIDEO", e, rangeSlider)
        rangeSlider.updateOptions({
            range: {
                'min': 0,
                'max': video.duration
            }
        }, true);
        rangeSlider.setHandle(2, video.duration)
    })
    input.addEventListener('change', e => {
        console.log("Load video", e, source, source.parentNode)
        //@ts-ignore
        const videoFile = e.target.files[0];
        console.log({videoFile})
        source.src = URL.createObjectURL(videoFile);
        video.load();
        video.play();
    })

    const playButton = document.createElement("button");
    playButton.innerText = "play/pause"
    playButton.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);

    video.appendChild(source)
    element.appendChild(video);
    element.appendChild(input);
    element.appendChild(playButton);

}
export { hello, init };