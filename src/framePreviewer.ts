//@ts-ignore
import videoFrames from 'video-frames';
import noUiSlider from "nouislider"//todo change for https://www.cssscript.com/custom-range-slider-input/ ??
import "nouislider/dist/nouislider.min.css" //it can handle ext dependencies too
import {storeSetValue,storeGetValue} from "./localStorage"
import {
    createElementWithChildren,
    createElementWithLabel,
    attachStyleToSheet,
    createElementWithInnerText
} from "./htmlHelpers"

class FramePreviewer {
    startTime: number;
    endTime: number;
    frameCount: number;
    speed: number;
    canvasOutput: HTMLCanvasElement
    widthField: HTMLInputElement
    countField: HTMLInputElement
    element: HTMLElement

    constructor( frameCount: number, speed: number, video: HTMLVideoElement, source: HTMLSourceElement, input: HTMLInputElement, attachToElement: HTMLElement) {
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
            storeSetValue("startPos", startPos)
            this.setStartTime(startPos)
            //@ts-ignore
            const curPos = parseFloat(e[1])
            storeSetValue("curPos", curPos)
            //@ts-ignore
            const endPos = parseFloat(e[2])
            storeSetValue("endPos", endPos)
            this.setEndTime(endPos)
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

        this.element = document.createElement('div');
        this.canvasOutput = document.createElement('canvas');
        this.frameCount = frameCount;
        this.speed = speed ?? 10;
        this.startTime = startTime;
        this.endTime = endTime;
        this.widthField = document.createElement('input');
        this.widthField.type = 'number'
        this.widthField.title = 'Video width (height is automatic)'
        this.widthField.min = '8'
        this.widthField.max = '1080'
        this.widthField.placeholder = '0'
        const framePreviewerVideoWidth =  storeGetValue('framePreviewerVideoWidth', 200);
        video.width = framePreviewerVideoWidth ?? 1;
        //@ts-ignore
        video.style.width = `${framePreviewerVideoWidth}px`;
        // this.element.style.height = `calc(${video.offsetHeight}px + 80px)`

        this.widthField.valueAsNumber = framePreviewerVideoWidth;
        this.widthField.addEventListener('change', ()=>{
            const vidWidth = this.widthField.valueAsNumber;
            storeSetValue('framePreviewerVideoWidth', vidWidth)
            console.log(vidWidth)
            //@ts-ignore
            // video.style.width = vidWidth === 0 ? undefined : `${vidWidth}px`;
            if(vidWidth !== 0 ){
                //@ts-ignore
                video.width = vidWidth ?? 1;
                //@ts-ignore
                video.style.width = `${vidWidth}px`;
                // video.height = video.videoHeight;
            } else {
                //@ts-ignore
                // video.width = video.videoWidth;
                //@ts-ignore
                video.style.width = `${video.videoWidth}px`;
            }
            this.canvasOutput.height = video.offsetHeight;
            console.log({offsetWidht: video.offsetWidth, offsetHeight: video.offsetHeight,videoWidth: video.videoWidth, width: video.width, videoHeight: video.videoHeight, height: video.height,vidWidth})
        });

        const output = document.createElement('div');//todo change to canvas (player with fps previewing) - in another class
        output.style.overflow = 'auto';
        output.style.maxHeight = 'calc(50vh - 100px)';
        const downloadExtractedFrames = () => {
            const data= this.canvasOutput.toDataURL()
            console.log({data});
            if(!data) return;
            const link = document.createElement('a');
            //@ts-ignore
            link.download = `${input.files[0]?.name ?? ""}-download.png`;//todo change to video name
            link.href = this.canvasOutput.toDataURL();
            link.click();
            //@ts-ignore
            link.delete;
        }

        const extractFrames = () =>{
            const frameWidth = this.widthField.valueAsNumber || video.videoWidth;
            const count = this.countField.valueAsNumber;
            this.canvasOutput.width = frameWidth * count;
            this.canvasOutput.height =  video.offsetHeight;//todo wrong - should take in account video.height
            const ctx = this.canvasOutput.getContext('2d');
            console.log({canvasW: frameWidth * count, canvH: video.videoHeight})

            videoFrames({
                url: source.src,
                count,
                width: frameWidth, //height is auto
                startTime: this.startTime,
                endTime: this.endTime,
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

                            // if(i === frames.length - 1){
                            //     setTimeout(()=>{
                            //         downloadExtractedFrames()
                            //     }, 200)
                            // }
                        }, false);
                        img.src = f.image;
                    }
                })
            })
        }
        const extractButton = document.createElement('button');
        extractButton.innerText = '(Re) Extract frames';
        extractButton.addEventListener('click', extractFrames);
        const downloadButton = document.createElement('button');
        downloadButton.innerText = 'Export frame strip';
        downloadButton.addEventListener('click', downloadExtractedFrames);

        this.countField = document.createElement('input');
        this.countField.type = 'number'
        this.countField.min = '1'
        this.countField.max = '80'
        this.countField.placeholder = 'extract 10 frames'
        this.countField.valueAsNumber = storeGetValue('framePreviewerFrameCount', 10);
        this.countField.addEventListener('change', ()=>{
            storeSetValue('framePreviewerFrameCount', this.countField.valueAsNumber)
            extractFrames();
        })

        //append to elements
        this.element.appendChild(this.canvasOutput);
        this.element.appendChild(createElementWithChildren([
            createElementWithLabel("frame count:", this.countField),
            createElementWithLabel("frame width:", this.widthField),
            createElementWithInnerText(`/${video.videoWidth}`, "div", "videoWidthIndicator"),//todo update when source changes
            extractButton,
            downloadButton
        ], 'video-frame-previewer-controls'))

        video.addEventListener('loadeddata', ()=>{
            const videoWidthIndicator = document.getElementById("videoWidthIndicator")
            console.log(videoWidthIndicator, {video})
            if(videoWidthIndicator) videoWidthIndicator.innerText = `/${video.videoWidth.toString()}`;

            extractFrames();
        })
        attachToElement.appendChild(slider)

        attachToElement.appendChild(this.element)


        this.element.className = "video-frame-previewer-extractor"
        this.widthField.className = "video-frame-previewer-extractor-width"
        this.countField.className = "video-frame-previewer-extractor-count"
        this.element.className = "video-frame-previewer-extractor"
        extractButton.className = "video-frame-previewer-extractor-button"
        const styles = `
         .video-frame-previewer-extractor {
            display: flex;
            overflow: auto;
            max-width: 80vw;
         }
         .video-frame-previewer-controls {
            display:flex;
            align-items: center;
            gap: 20px;
            position: sticky;
            right: 0px;
            top: 0;
            background-color: black;
            opacity: 0.7;
            min-width: fit-content;
            padding-left: 7px;
            padding-right: 7px;
            border-radius: 12px;
            margin: 4px;
         }
         .video-frame-previewer-controls > .input-with-label {
            display: flex;
            gap: 3px;
         }

         .video-frame-previewer-extractor-width,
         .video-frame-previewer-extractor-count {
             width: 46px;
             position: sticky;
             top: 0;
         }
         .video-frame-previewer-extractor-width{
             left: 0;
         }
         .video-frame-previewer-extractor-count{
             right: 0;
         }
         .video-frame-previewer-extractor-button {
            left: 50%;
            max-height: 60px;
         }
        `
        attachStyleToSheet(styles);
    }

    setStartTime(startTime: number){
        this.startTime = startTime
    }
    setEndTime(endTime: number){
        this.endTime = endTime
    }
}

export {FramePreviewer}