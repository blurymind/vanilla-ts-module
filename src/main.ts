// main.ts
const hello = (name: string) => {
    // const app =document.getElementById("app");
    // console.log("found element", app)
    // if(app){
    //     app.innerHTML = ">> " + name
    // }

    return `Hello Todor, ${name}!`;
};

const init = (element: HTMLElement|null) => {
    if(!element) return;

    const videoPlayer = document.createElement('video')
    const source = document.createElement('source')


    const input = document.createElement('input');
    input.type = "file"
    input.accept = "video/*"

    input.addEventListener('change', e => {
        console.log("Load video", e, source, source.parentNode)
        //@ts-ignore
        source.src = URL.createObjectURL(e.target.files[0]);
        videoPlayer.load();
        videoPlayer.play();
    })

    videoPlayer.appendChild(source)
    element.appendChild(videoPlayer);
    element.appendChild(input);

    //Ps: don't forget to call URL.revokeObjectURL($source[0].src) when you don't need it anymore.
}
export { hello, init };