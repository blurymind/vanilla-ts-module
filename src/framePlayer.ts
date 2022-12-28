import {createDomTreeFromObject, swapObjectValues} from "./htmlHelpers"
import {storeGetValue, storeSetValue} from "./localStorage";

//Todo this class plays original video, preview frames w fps and lets you crop video (talks back to framepreviewer
class FramePlayer {
    video: HTMLVideoElement
    source: HTMLSourceElement
    input: HTMLInputElement
    onFrameRectChange?: (p: any) => void;
    isMouseDown: boolean
    clicks: any

    constructor(video: HTMLVideoElement, source: HTMLSourceElement, input: HTMLInputElement, element: HTMLElement, onFrameRectChange: (p: any) => void|undefined = undefined) {
        this.video = video;
        this.source = source;
        this.input = input;
        this.input.className = "frame-player-input";
        this.isMouseDown = false;
        this.clicks = storeGetValue("videoFramePlayerRect",{ 0: {x: 0, y:0}, 1: {x:0, y:0}, skip: true});
        this.onFrameRectChange = onFrameRectChange;

        console.log({video}, this.video)
        const onInputChange = (e: any) => {
            console.log("Load video", e, source, source.parentNode)
            //@ts-ignore
            const videoFile = e.target.files[0];
            console.log({videoFile})
            this.source.src = URL.createObjectURL(videoFile);
            // storeSetValue("videoSrc", URL.createObjectURL(videoFile))// todo this wont work with a blob
            this.video.load();
            this.video.play();
        }

        const togglePlay =(e: any)=> {
            console.log(this.video)
            if (this.video.paused || this.video.ended) {
                this.video.play();
            } else {
                this.video.pause();
            }
            e.target.innerText = this.video.paused ? "▶️": "⏸️";
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

        const updateCanvas =()=> {
            canvasEl.width = video.offsetWidth;
            canvasEl.height = video.offsetHeight;
            ctx?.drawImage(video, 0, 0, canvasEl.width, canvasEl.height);//todo need to toggle between this and frames
            this.drawRectangle(ctx);
            window.requestAnimationFrame(updateCanvas);
        }
        requestAnimationFrame(updateCanvas);


        const onUpdateFrameRect = () => {
            this.clicks.skip = JSON.stringify(this.clicks[0]) === JSON.stringify(this.clicks[1]);
            if(this.clicks[0].x > this.clicks[1].x){
                swapObjectValues(this.clicks, "0", "1");
            }
            storeSetValue("videoFramePlayerRect", this.clicks);
            const frameRectChanged = new CustomEvent('videoframerectchanged', {
                detail: {
                    rect: this.clicks
                }
            });
            this.video.dispatchEvent(frameRectChanged);
            if(this.onFrameRectChange) {
                this.onFrameRectChange(this.clicks)
            }
        }
        createDomTreeFromObject({
            type: "div",
            className: "frame-player",
            children: [
                {type: "div", className: "frame-player-controls", id: "framePlayerControls", children:[
                        {type: "button", innerText: "▶️", events: {click: togglePlay}, id: "playButton"},
                        {type: "button", innerText: previewMode, events: {click: toggleMode}, id: "modeButton"},
                    ]},
                {type: "div", className: "video-area", children:
                        [
                            {element: this.video,
                                children: [{element: this.source}],
                                style: {visibility: "hidden", position: "absolute"}
                            },
                            {element: canvasEl, events: {
                                    // click: togglePlay,
                                    pointerdown: (e)=> {
                                        this.clicks[0] = {
                                            x: Math.floor(e.offsetX),
                                            y: Math.floor(e.offsetY)
                                        };
                                        this.isMouseDown = true;

                                        //@ts-ignore
                                        document.getElementById("framePlayerControls").style.visibility = "hidden"
                                    },
                                    pointermove: (e) =>{
                                        if (this.isMouseDown) {
                                            this.clicks[1] = {
                                                x: Math.floor(e.offsetX),
                                                y: Math.floor(e.offsetY)
                                            };
                                        }
                                    },
                                    pointerup: (e) => {
                                        this.isMouseDown = false;
                                        this.clicks[1] = {
                                            x: Math.floor(e.offsetX),
                                            y: Math.floor(e.offsetY)
                                        };
                                        //@ts-ignore
                                        document.getElementById("framePlayerControls").style.visibility = "visible"
                                        onUpdateFrameRect()
                                    },
                            }}
                        ]},
                {element: this.input, events: {change: onInputChange}}
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

    togglePlay() {//todo dont work
        console.log(this.video)
        if (this.video.paused || this.video.ended) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }
    drawRectangle = (ctx: CanvasRenderingContext2D|null) =>{
        if(!ctx) return;
        ctx.beginPath();
        ctx.rect(this.clicks[0].x, this.clicks[0].y, this.clicks[1].x-this.clicks[0].x, this.clicks[1].y-this.clicks[0].y);
        ctx.fillStyle = 'rgba(100,100,100,0.5)';
        ctx.fill();
        ctx.strokeStyle = "#df4b26";
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

export {FramePlayer}