import {createDomTreeFromObject} from "./htmlHelpers"
import {storeGetValue, storeSetValue} from "./localStorage";

//Todo this class plays original video, preview frames w fps and lets you crop video (talks back to framepreviewer
class FramePlayer {
    video: HTMLVideoElement
    source: HTMLSourceElement
    input: HTMLInputElement

    constructor(video: HTMLVideoElement, source: HTMLSourceElement, input: HTMLInputElement, element: HTMLElement) {
        this.video = video;
        this.source = source;
        this.input = input;
        this.input.className = "frame-player-input";

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

        const togglePlay =(e: any)=> {
            console.log(this.video)
            if (this.video.paused || this.video.ended) {
                this.video.play();
            } else {
                this.video.pause();
            }
            e.target.innerText = this.video.paused ? "Play": "Pause";
        }

        const previewMode = storeGetValue("framePlayerPreviewMode", "source")//source or reduced
        const toggleMode = (e: any) => {
            console.log("toggleM<ode", e)
            const newMode = storeGetValue("framePlayerPreviewMode", "source") === "source" ? "reduced": "source"
            storeSetValue("framePlayerPreviewMode",newMode)
            e.target.innerText = newMode;
        }

        // Draw video playback to canvas
        const canvasEl = document.createElement('canvas');
        const ctx = canvasEl?.getContext('2d');
        function updateCanvas() {
            canvasEl.width = video.offsetWidth;
            canvasEl.height = video.offsetHeight;
            ctx?.drawImage(video, 0, 0, canvasEl.width, canvasEl.height);//todo need to toggle between this and frames
            window.requestAnimationFrame(updateCanvas);
        }
        requestAnimationFrame(updateCanvas);

        createDomTreeFromObject({
            type: "div",
            className: "frame-player",
            children: [
                {type: "div", className: "frame-player-controls", children:[
                        {type: "button", innerText: "play", events: {click: togglePlay}, id: "playButton"},
                        {type: "button", innerText: previewMode, events: {click: toggleMode}, id: "modeButton"},
                    ]},
                {type: "div", className: "video-area", children:
                        [
                            {element: this.video,
                                children: [{element: this.source}],
                                style: {visibility: "hidden", position: "absolute"}
                            },
                            {element: canvasEl, events: {click: togglePlay, mousedown:console.log, mouseup:console.log}}
                        ]},
                {element: this.input}
            ]
        }, element, `
            .frame-player {
                display: flex;
                position: relative;
            }
            .frame-player-controls{
                display: flex;
                position: absolute;
                margin: 10px;
                opacity: 0.7;
                gap: 3px;
            }
            .frame-player-input {
                position: absolute;
                bottom: -25px;
            }
        `);
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