// we could do the pixelisation and other effects here?

// video player toggles between original sourceVideo and dataCanvas with applied effects on it
const exportPreviewCanvas = (dataCanvas: HTMLCanvasElement|null, sourceVideo: HTMLVideoElement|null) =>{
    //maybe replace dataCanvas with input and move the framsestrip logic here
    console.log({dataCanvas, sourceVideo})//data canvas has the frames

    // todo pause source video and hide the range slider when in preview output mode
    //return a canvas with fps input, toggle source/output preview and a play button
    // https://codepen.io/besc/pen/oNbPbqa
}

export {exportPreviewCanvas}