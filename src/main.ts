//@ts-ignore
import videoFrames from 'video-frames';
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

    //TODO move this video player and its range slider to its own class, add set start and set end buttons
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

    const framePreviewer = new FramePreviewer(
        4, 12, video, source, input, element);
    console.log(framePreviewer)


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