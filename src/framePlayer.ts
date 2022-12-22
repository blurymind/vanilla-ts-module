import {createDomTreeFromObject} from "./htmlHelpers"

//Todo this class plays original video, preview frames w fps and lets you crop video (talks back to framepreviewer
class FramePlayer {
    video: HTMLVideoElement
    source: HTMLSourceElement
    input: HTMLInputElement

    constructor(video: HTMLVideoElement, source: HTMLSourceElement, input: HTMLInputElement, element: HTMLElement) {
        this.video = video;
        this.source = source;
        this.input = input;

        console.log({video}, this.video)
        this.input.addEventListener('change', e => {
            console.log("Load video", e, source, source.parentNode)
            //@ts-ignore
            const videoFile = e.target.files[0];
            console.log({videoFile})
            this.source.src = URL.createObjectURL(videoFile);
            // storeSetValue("videoSrc", URL.createObjectURL(videoFile))// todo this wont work with a blob
            this.video.load();
            this.video.play();
        })

        const togglePlay =()=> {
            console.log(this.video)
            if (this.video.paused || this.video.ended) {
                this.video.play();
            } else {
                this.video.pause();
            }
        }

        createDomTreeFromObject({
            type: "div",
            className: "frame-player-controls",
            children: [
                {type: "button", innerText:"play/pause", events: {click: togglePlay}},
                {element: this.video, events: {click: togglePlay}, children: [{element: this.source}]},
                {element: this.input}
            ]
        }, element);
    }

    public togglePlay() {//todo dont work
        console.log(this.video)
        if (this.video.paused || this.video.ended) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }
}

export {FramePlayer}