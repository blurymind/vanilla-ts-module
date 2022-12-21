//@ts-ignore
import videoFrames from 'video-frames';
import noUiSlider from "nouislider"//todo change for https://www.cssscript.com/custom-range-slider-input/ ??
import "nouislider/dist/nouislider.min.css" //it can handle ext dependencies too
import {storeSetValue,storeGetValue} from "./localStorage"
import { FramePreviewer } from "./framePreviewer";
import {attachStyleToSheet} from "./htmlHelpers";

// main.ts
const hello = (name: string) => {
    return `Hello ${name}!`;
};

// todo move under a class so we can instantiate it
const init = (element: HTMLElement|null) => {
    if(!element) return;
    const slider = document.createElement('div');

    const startTime = storeGetValue("startPos", 0)
    const curTime = storeGetValue("curPos", 40)
    const endTime = storeGetValue("endPos", 100)
    const min = storeGetValue("min", 0)
    const max = storeGetValue("max", 100)
    const rangeSlider = noUiSlider.create(slider, {
        start: [startTime,curTime, endTime],
        connect: true,
        range: {
            min,
            max
        }
    });
    element.appendChild(slider)

    const videoSrc = storeGetValue("videoSrc","https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Cat_jumping_backwards.webm/Cat_jumping_backwards.webm.720p.vp9.webm") ?? ""
    const video = document.createElement('video')
    video.style.maxHeight = "50vh";
    video.muted = true;

    const source = document.createElement('source')
    source.src = videoSrc;
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

    const framePreviewer = new FramePreviewer(
        //@ts-ignore
        startTime, endTime,
        4, 12, video, source, input, element);
    console.log(framePreviewer)
    /////////// end time update
    rangeSlider.on('start', (e)=>{
        console.log("start", e)
        video.pause()
    })
    rangeSlider.on('end', (e)=>{
        //@ts-ignore
        const startPos = parseFloat(e[0])
        storeSetValue("startPos", startPos)
        framePreviewer.setStartTime(startPos)
        //@ts-ignore
        const curPos = parseFloat(e[1])
        storeSetValue("curPos", curPos)
        //@ts-ignore
        const endPos = parseFloat(e[2])
        storeSetValue("endPos", endPos)
        framePreviewer.setEndTime(endPos)
        console.log("end", e)
        video.currentTime = curPos;
        video.play()
    })

    video.addEventListener('loadeddata', e=>{
        console.log("LOADED VIDEO", e, rangeSlider)
        const min = storeGetValue("min", 0);
        const max = storeGetValue("max", video.duration);
        const endPos = storeGetValue("endPos", video.duration);
        rangeSlider.updateOptions({
            range: {
                min,
                max
            }
        }, true);
        rangeSlider.setHandle(2, endPos);
    })

    input.addEventListener('change', e => {
        console.log("Load video", e, source, source.parentNode)
        //@ts-ignore
        const videoFile = e.target.files[0];
        console.log({videoFile})
        source.src = URL.createObjectURL(videoFile);
        // storeSetValue("videoSrc", URL.createObjectURL(videoFile))// todo this wont work with a blob
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

    var styles = `
     .noUi-handle {
        opacity: 0.7;
     }
    `
    attachStyleToSheet(styles);
}
export { hello, init };