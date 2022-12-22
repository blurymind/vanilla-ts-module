//@ts-ignore
import videoFrames from 'video-frames';
import {storeSetValue,storeGetValue} from "./localStorage"
import { FramePreviewer } from "./framePreviewer";
import {FramePlayer} from "./framePlayer";
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

    const framePreviewer = new FramePreviewer(
        4, 12, video, source, input, element);

    const framePlayer = new FramePlayer(video, source, input, element);

    console.log(framePreviewer, framePlayer)
}
export { hello, init };