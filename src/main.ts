// main.ts
const hello = (name: string) => {
    const app =document.getElementById("app");
    if(app){
        app.innerHTML = "aerr TEST " + name
    }

    return `Hello Todor, ${name}!`;
};

export { hello };